---
title: NVARCHAR(MAX) is not for everything  
category: SQL Server  
date: 2013-04-25  

---

Thinking of using NVARCHAR(MAX) for every character string field in your database, or already doing it? 

We're going to cover why you don't want to do that, and show you some real performance impacts of this anti-pattern.


## First Some Background

Microsoft's SQL Server has an interesting data length for VARCHAR and NVARCHAR data types, called MAX. You can think of it as "maximum amount of memory" or "unlimited." Now obviously it *can't really be unlimited*, but in the practical sense that's what its there for - big strings of text.

[N]VARCHAR(MAX) is the preferred replacement of [N]Text. Microsoft says so themselves (link to the article). They also mention something about how the data is stored differently depending on its size, and other details.

The reason this post exists is because I've witnessed several times the practice of using MAX for every [N]VARCHAR data type in the database. Anywhere from names, descriptions, to small blocks of text usually less than 2000 characters... I've seen MAX used for it.

Using MAX indiscriminately will impact your performance more than one would realize, and we're going to dive into why that is.


## Prepping our test data

To showcase some of the pain-points MAX-for-everything introduces, let's build a phone book table. Our phone book is going to be for a big metropolitan area, covering several cities. Phone number will be the primary key. We'll add other indexes after the data is loaded.

```
CREATE TABLE phonebook_max (
	PhoneNumber INT NOT NULL,
	CityId INT NOT NULL,
	LastName NVARCHAR(MAX) NOT NULL,
	FirstName NVARCHAR(MAX) NOT NULL,
	Address1 NVARCHAR(MAX) NOT NULL,
	Address2 NVARCHAR(MAX) NULL,
	CONSTRAINT [PK_phonebook_max] PRIMARY KEY CLUSTERED ([PhoneNumber])
)
```

And because we want to compare how a MAX-for-everything table does against a sensibly-sized columns, we're going to create a second phone book as well, using more sane data size limits.

```
CREATE TABLE phonebook (
	PhoneNumber INT NOT NULL,
	CityId INT NOT NULL,
	LastName NVARCHAR(50) NOT NULL,
	FirstName NVARCHAR(50) NOT NULL,
	Address1 NVARCHAR(200) NOT NULL,
	Address2 NVARCHAR(200) NULL,
	CONSTRAINT [PK_phonebook] PRIMARY KEY CLUSTERED ([PhoneNumber])
);
```

Now that we have our tables in place, we'll fill them with some fake data. 

Our tables will create 40,000 "phone numbers" in 9 "cities." I'm not bothering with a fancy data generator here, so our names are numbers, and the phone numbers aren't actual numbers, but it still works for what we want it to do.

```

SET NOCOUNT ON;
DECLARE @CityId INT;
DECLARE @PhoneNumberPart INT;

-- Populate the phonebook_max with some data
SET @CityId = 1;
WHILE (@CityId < 10)
BEGIN 
	SET @PhoneNumberPart = 10001;
	WHILE (@PhoneNumberPart < 50000)
	BEGIN 
		INSERT INTO phonebook_max (PhoneNumber, CityId, LastName, FirstName, Address1)
			VALUES (
				CAST(CAST(@CityId AS CHAR(1)) + CAST(@PhoneNumberPart AS CHAR(5)) AS INT),
				@CityId,
				CAST(@PhoneNumberPart AS CHAR(5)) + ' LastName',
				CAST(@PhoneNumberPart AS CHAR(5)) + ' FirstName',
				CAST(@PhoneNumberPart AS CHAR(5)) + ' Address1')
		SET @PhoneNumberPart = @PhoneNumberPart + 1;
	END
	SET @CityId = @CityId + 1;  
END 

-- Do it again, but for regular phonebook
SET @CityId = 1;
WHILE (@CityId < 10)
BEGIN 
	SET @PhoneNumberPart = 10001;
	WHILE (@PhoneNumberPart < 50000)
	BEGIN 
		INSERT INTO phonebook (PhoneNumber, CityId, LastName, FirstName, Address1)
			VALUES (
				CAST(CAST(@CityId AS CHAR(1)) + CAST(@PhoneNumberPart AS CHAR(5)) AS INT),
				@CityId,
				CAST(@PhoneNumberPart AS CHAR(5)) + ' LastName',
				CAST(@PhoneNumberPart AS CHAR(5)) + ' FirstName',
				CAST(@PhoneNumberPart AS CHAR(5)) + ' Address1')
		SET @PhoneNumberPart = @PhoneNumberPart + 1;
	END
	SET @CityId = @CityId + 1;  
END 
```


## Memory estimations get really big

Something to be aware of when using MAX for everything is inflated estimated data sizes for records. Since SQL Server's MAX length could store something really big, SQL Server figures it should plan for that to maybe happen. 

Let's run the following queries with Include Actual Estimation Plan turned on. 

```
SELECT TOP 1 * FROM phonebook;

SELECT TOP 1 * FROM phonebook_max;
```

Hover over the line from the clustered index scan of PK_Phonebook and you'll see an estimated row size of 525 B. That number comes from the data lengths specified from our table. 200 + 200 + 50 + 50 + 4 + 4 + additional overhead = 525.

![Top 1 non max](http://rickbergfalk.com/images/2013-04-25-nvarchar-max-top-1-non-max.png)

Alternatively, hover over the line from the clustered index scan of PK_Phonebook_max and you'll see an estimation of 16 KB!

![Top 1 non max](http://rickbergfalk.com/images/2013-04-25-nvarchar-max-top-1-max.png)

Since the MAX data length was meant to store large amounts of data, SQL Server goes big on the estimate to ensure it has enough memory available to comfortably handle it all. Little does it know that it could actually get away with a fraction of that.

You might be thinking, "Big deal, 16 KB is small", but as we're about to find out it starts to add up quick.



## MAX can't be indexed

Another one of the main issues with using MAX for everything is the inability to index MAX columns. They can be added as an index INCLUDE column, but that won't help any searches or joins on that particular column. 

A common use for a phone book would be to look people up by last name within a certain city. For our non-MAX table, the following index would be a nice fit, since it allows range queries by city, but also allows for a quick lookup for city and last name pair.

```
CREATE NONCLUSTERED INDEX IX_phonebook_CityId_LastName 
	ON phonebook (CityId, LastName);
```

We can't create that same index on the MAX table - the closest we could come is to add an index on CityId:

```
CREATE NONCLUSTERED INDEX IX_phonebook_max_CityId 
	ON phonebook_max (CityId);
```

If you look back at our data creation script, last name is the combination of the @PhoneNumberPart and " LastName". With the execution plan on, let's get a record from the middle of our table from city 5:

```
SELECT * 
FROM dbo.phonebook 
WHERE CityId = 5 AND LastName = N'10123 LastName'
```

Exploring the execution plan, we see a nice efficient plan: and index seek with a key lookup, resulting in 1 record back with a small size.

![Select 1 by city and last name non max](http://rickbergfalk.com/images/2013-04-25-nvarchar-max-by-city-lastname-non-max.png)

The story is a bit different though for our MAX table...

```
SELECT * 
FROM dbo.phonebook_max
WHERE CityId = 5 AND LastName = N'10123 LastName'
```

Oddly enough, SQL Server decides to completely ignore the index we put on CityId, and proceeds to scan the entire table instead. 

TODO: Look into why SQL Server completely ignores the index. It might be because of the estimated row size. Make the same index on the non-max table as well, see how it behaves there. 


## Index scan + big memory estimates = even bigger memory estimates


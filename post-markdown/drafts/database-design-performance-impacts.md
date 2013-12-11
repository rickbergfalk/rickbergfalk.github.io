# Database Design Performance Impacts


## Non-sequential GUIDs

GUIDs / UniqueIdentifiers are random. If they are going to be the clustered index then they should be at least sequential GUIDs. 

## Triggers

Generally not a good  practice. They are not performant.

## Dynamic SQL 

Sometimes its necessary, but a lot of times it's a sign that your data model is not optimal.

## Entity-Attribute-Value

Do you *really* need this? Is a lot of your data EAV data? Consider a different data store, something NoSQL related.

## NVARCHAR(MAX) (use the right data types)

Is not for everything. It should only be used for really big text. Choosing larger-than-necessary data types causes SQL to plan and estimate for larger data than it actually is working with. NVarchar(MAX) also isn't indexable. 

## Storing Session data in your relational database

This sort of stuff is temporary data, frequently updated and read. It'll beat your RDBMS log up. Check out Redis or something similar.

## Not caching frequently accessed data

Brent Ozar explains it well - even though the data is cached in memory, its still a lot of work for SQL Server to pull it out. The data may be in memory, but all those joins are going to take CPU and reading from RAM.

## Indexing should be the right amount. Not too much. Not too little.

Too much indexing means that updates will take longer. Too little and your reads won't be as fast as they should be. There's a happy medium to be had, but it takes some investigative work.

## Data structures should have meaning

There's something about normalization in regards to this.
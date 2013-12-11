# Big Buzzwords: A Guide to the Data Industry

**Who this is for**

Management, decision makers, analysts.

**TL;DR**

Before you jump in and implement a solution using a fancy data buzzword, take some time to figure out if it actually is the right answer to your problem. In the past database options were limited, and most databases handled most use cases no problem because of the limited data size. 

Now that we store more data, its important that we pick the right tool for the job.



## Why This Document Exists

These are some crazy times when it comes to the data industry. So crazy in fact that I don't even know how to label what I'm trying to talk about, because it spans so many different terms and buzzwords. You may have heard some of them before: 

- Decision Support Systems (AKA DSS)
- Business Intelligence (AKA BI)
- Data Warehouse
- Data Mining
- Analytics
- Predictive Analytics
- NoSQL 
- The Cloud
- Big Data
- Sentiment Analysis
- Data Scientist

Now some of these terms overlap. Some of the terms are things you do via the use of another term, but they are all usually uttered when talking to either management, a sales rep, or a consultant, or reading the news or tech blog.

The thing is, these terms probably started out as an innocent way to label something. To gain a common understanding of either a way of handling large amounts of data, how to use data, an activity you do to data, where you put data, etc.

Unfortunately for us though, the terminology started to be abused and hyped by various people and industries.

And its sort of a vicious cycle. Tech media and vendors hype things up, so they can sell stories, software and solutions. Companies buy into this hype, not because they are stupid but because these buzzwords usually go along side a promise that <insert-technology-here> will fix some sort of pain point.

Before you know it, a company has gone all in and is going with one of these technology terms, whether they actually understand it or not. 

##  Table of Contents

This document is to serve as a crash course to better understanding the data industry as a whole. Before we get in to trying to define terms, we're going to start with data in general, and how it's used. Trying to define the buzzwords is hard, especially when there are so many different understandings of what each of these words mean. And sometimes those different meanings are legitimate: It is possible that the buzzword has different meanings based on what someone is talking about.

1. Let's Talk About Data

2. Databases: How Data is Stored and Queried
    - Database Characteristics
        - Durability
        - In Memory vs. Not In Memory
        - Distributed vs Centralized 
        - CAP Theorem
    - SQL & Relational Databases
	- NoSQL: The other stuff
		- Document Databases
		- Key Value Stores
        - Graph Databases
    - NewSQL
    	- ColumnStore Databases
        - Google's Dremel?

3. Industry Buzzwords
	- Analytics
	- Ad-hoc Reporting
	- Standard Reporting
	- Self-Service Business Intelligence
	- Predictive Analytics
	- Sentiment Analysis 

4. Data Uses
	- Application/Website needs lightning fast response time
    - Our Data is growing faster than our server hardware
    - My Semi-technical Business Analysts need to query the database
    
5. Real World Examples

6. The Hype You Didn't Hear
	- Obama's Harper: Big Data is BS
    - Nate Silver
	

## Let's Talk About Data

The Business Intelligence industry likes to define what data is, and make a distinction. Data consists of little pieces of information. By themselves, they aren't very meaningful. My height, weight, and gender are all pieces of data. 

At its most raw form, data isn't that useful. The lowest level of data is nothing but little factoids that don't really give much meaning. 

Once you have more data though, you can mix it together, compare and contrast values, average values, aggregate, and summarize. Suddenly your data is more meaningful because you've derived information out of it. 

This activity of using data varies depending on what data is being used for. 

Consider the different uses for data:

- An application displaying data to an end user
- An application summarizing data for an end user
- An application predicting new future data based on current data
- Management wanting to know if their business is growing
- Accounting performing audits
- A Product Analyst trying to figure out what products are usually purchased together

These uses all involve consuming data, but they all have different needs in the following areas:

- How fast can we access the data? 
	- Applications might need millisecond response time. 
	- Ad-hoc querying seconds. 
	- Deep analysis minutes/hours or even days.
- How old is the data? Is slightly old data okay?
- Can I query the data by myself?
- Can we aggregate this data and summarize it? 
- How easy is it to get at this data?
- How long will it take to process the data
- How valid is the data 



---
title: Database Design Performance Impacts
category: SQL Server  
date: 2014-02-25  

---

This is going to be a living document where I jot down some database design antipatterns that can end up hurting database performance.

## Non-sequential GUIDs as Clustered Index

GUIDs / UniqueIdentifiers are random. If they are going to be the clustered index then they should be at least sequential GUIDs. 

Why? The clustering index of a SQL Server table determines the physical ordering of the table on disc. Non-sequential GUIDs will cause a lot of table fragmentation. It will also cause data to be scattered around the table for a given time period. (let's say you want the last months of records, if using a random guid, those last month's records are now dispersed throughout entire table!)

## Triggers

Generally not a good practice. Generally not performant. Could be misused or abused out of laziness or bad culture around a database. 

For example: Modified dates. Set the modified date via the application code. Using a trigger to do it means doubling the number of updates on a table. 

## Dynamic SQL 

Sometimes Dynamic SQL is necessary and even helpful, but a lot of times it's a sign that your data model is not optimal. 

## Entity-Attribute-Value Tables

Is a lot of your data EAV data? Consider a different data store, something NoSQL related. Sometimes EAV tables begin to smell of building a database within a database. Be careful that you aren't creating more work for yourself than needed. 

Querying an EAV table is also a pain - it often involves pivoting the data to make it less vertical and more horizontal. These kinds of queries are also more expensive to do as time goes on. Not just because of the increased data size (entity/attribute column values repeated across rows), but the increased row count as well (higher CPU usage during joins). 

## NVARCHAR(MAX) (use the right data types)

NVARCHAR(MAX) is not for everything. It should only be used for really big text. Choosing larger-than-necessary data types causes SQL to plan and estimate for larger data than it actually is working with. NVarchar(MAX) also isn't indexable. It can be INCLUDED in an index, but it can't be part of an index key, which means the best you'll ever get when searching on an NVARCHAR(MAX) field is an index scan.

## Storing Session data in your relational database

This sort of stuff is temporary data, frequently updated and read. It'll beat your RDBMS log up. Check out a key-value store such as Redis or something similar.

## Not caching frequently accessed data

Even though SQL Server (and other DBMSs) can cache data in memory, it's still a lot of work for SQL Server to pull it out. The data may be in memory, but all those joins are going to take CPU and a bit of additional time.

## Indexing should be the right amount. Not too much. Not too little.

Too much indexing means that updates will take longer. Too little and your reads won't be as fast as they should be. There's a happy medium to be had, but it takes some investigative work.

## Data structures should have meaning

There's something about normalization in regards to this. (expand on later)
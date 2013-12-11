---
title: Difficulties with a real-time Data Warehouse  
category: Business Intelligence  
date: 2013-05-02

---

When building a Data Warehouse, at some point you must discuss how often the data must be refreshed. When you ask the business this question, they'll usually say something along the lines of, "How often? We want it real-time!"

There's been a lot of discussion in the Business Intelligence industry about "real-time" data warehousing. For a while it was all the rage, but it has since been quietly dismissed. BI people have even invented a new term like they always do - your data warehouse doesn't need to be "real-time"... it needs to be "right-time."

## It will get complicated. fast.

Real-time data warehousing is a lot more challenging to build and maintain than one that is bulk loaded. It's fragile. There are more moving parts that could break to keep it running. If something does break, then you have to make sure you properly load the missing data. 

It's a lot more complicated. Running a real-time data warehouse usually involves shipping database log files, or setting up some form of change-data-capture. And to do that you can no longer use simple SQL scripts and stored procedure - you'll need to start utilizing specialized tools.

Compare this to the opposite - a bulk-loaded data warehouse that is fully rebuilt every month, week, or day. Bulk-loading databases and allowing them to fully be rebuilt is easy, cheap, and contains very little risk. Something goes wrong with today's data warehouse rebuild? Just load up yesterday's snapshot in a pinch.

## Today doesn't matter when looking at the last 5 years

One of the main reasons to build a data warehouse is to create an environment where you have access to large amounts of data. You can run queries that analyze *years* of data, and they will finish in a reasonable time.

Think about this for a moment - If you are analyzing data from the last several years, what difference does it make if you have today's data or not? 

Chances are it won't make a difference. If it doesn't matter if you run a report this morning vs. this afternoon vs. tomorrow then it doesn't matter if you have a real-time data warehouse. 


---
title: Stored Procedure Abuse  
category: SQL Server  
date: 2012-12-17

---

Let’s say you need to add some feature or functionality to your system, such as an import or batch processing job. Do you implement it solely within the database via a stored procedure, or do you add it to your application somewhere and code it in something along the lines of C#?

If it were up to me I’d go for the latter, building what made sense in some sort of utility/application layer, and then passing the responsibility on to the database when it comes time to persist the data. Oddly enough though I often see the first route taken, building as much as possible within a stored procedure or two, with even perhaps a .bat file to handle some things that SQL Server doesn’t do all that gracefully.

And it’s bewildering. Especially when the database is the bottleneck in these systems.

I’m not really sure where this aversion to leaving the database stems from, but my guess is that it partially is based on the skills of the team. If the common denominator of  your team is SQL Server, anything implemented as a SQL Server stored procedure could be maintained by any developer. And that could be really appealing.

But at the same time, it will come at a cost. Do you really want your application to be slow and unresponsive because the database is busy chugging along trying to parse and clean a recent FTP import?

If the task doesn’t involve the validation and persistence of data, it probably doesn’t need to be in the database. And if it’s easier and cleaner to implement outside the database, by all means please do not write yet another stored procedure.
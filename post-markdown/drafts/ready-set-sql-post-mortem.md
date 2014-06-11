---
title: Ready Set SQL Post Mortem 
category: SQL Server  
date: 2014-04-29  

---

Ready Set SQL is mostly finished. Or at least it's as finished as it'll ever be. Here are my own thoughts on how things went, and what I'd do differently if I restarted the project for a fourth time.

## I should have written the lessons before I wrote the tool.

In all the lessons I've written in the lesson editor, I've only used about half the features. 
Little did I know that I would stick to a certain format for the lessons, and not actually need half the stuff I was building.

Basically, _You Ain't Gonna Need It_. Figure out what you need first. Then build it. And only build what you need.

## The Lesson viewer might not have been the best approach

Writing the lessons, I discovered I wanted to be more visual with certain things. 
I wanted to have SQL queries out on the page, with hand written notes pointing things out.
Maybe a .gif of how a join works. Maybe more narrative, who knows. 

What I know now though is that the lesson viewer setup demanded lessons be a certain kind of way. Otherwise it feels awkward. The lesson viewer is set up in a way that expects the user to always be writing SQL. This works I guess if they were always going to write SQL, but sometimes I wish I had a better way to show and tell them.

The lesson content pane was also too small. Some queries get pretty wide, and end up wrapping. Even if the page was divided in half, and half the screen was for the lesson content, and the other half for the editor/results pane, some of the SQL might have still wrapped. 

The little lesson content pane on the side wasn't quite enough for what I wanted to do with it.

A full-width page, where you scroll down and came across visualizations, pictures, 
and an interactive editor might have been a better approach.

## I enjoy building the system more than creating the lessons

This was a big one. When the application side of things was mostly finished, I wanted to move on. All I had to do is create the lessons, but I couldn't bring myself to do it. I kept procrastinating and putting it off.

I realized through this process that teaching is hard. It gave me a new kind of respect towards teachers, as well as other developers who write to teach what they know. 

I also realized that teaching was something I didn't want to do without an audience. I built this tool knowing it'd be valuable to some people, but I don't know any of those people. Not having a direct audience for feedback kind of killed any motivation I had to continue working on it.

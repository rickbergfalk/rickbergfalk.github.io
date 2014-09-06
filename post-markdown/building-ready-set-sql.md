---
title: What I Learned Building Ready Set SQL  
category: dev-log  
date: 2014-06-12  
 
---


[Ready Set SQL](http://www.readysetsql.com/) is a side project I started in the Fall of 2011. At the time I was teaching myself as I went, and also using it as a platform for learning all the fancy HTML/JS/CSS technologies I had been reading about but never actually done anything with.

It's now Summer 2014, and Ready Set SQL is mostly finished. Or at least it's as finished as it'll ever be. Here are my own thoughts on how things went and what I'd do differently if I restarted the project for a fourth time.


## Regarding frameworks and libraries 

When I started this side project, I sought out a bunch of libraries and frameworks to use. At the time I had been reading a lot about various web trends, so I used Ready Set SQL as a platform to experiment with a lot of things. I started with a traditional Express.js app, with a mix of server-side rendering with jQuery/javascript running the interactive front end stuff. 
Then I got the bug to make it a purely client-side app, and tried a little Knockout. And then Backbone.

Shortly after doing that, I read posts about people migrating away from client-side web apps for various reasons. I could relate to some of them and realized it wasn't a good fit for what I was building, so began rewriting things again. 

The next round was a combo static-html thing with some server side stuff. It was cool but the work flow got kind of clunky. Especially since I decided to split the repos (one for the static html content and generators, the other for the web-service and database).

In the end I went back to what I knew and what I had started with: a traditional Express.js app with jQuery and my own javascript objects.



## I should have finished the first iteration before starting the second

One of the reasons it took so long to get Ready Set SQL to where it is now was because of the time I spent reworking things. In total, I probably rewrote the application 4 times. 

In hindsight I wish I would have completed the first iteration before starting the second. Each time I reworked the first half of the project, I delayed learning about the challenges that would appear during the second half.



## I should have written the lessons before I wrote the tool

In all the lessons I've written in the lesson editor I built, I've only used about half the features. Little did I know that I would stick to a certain format for the lessons, and not actually need half the stuff I was building.

Basically, _You Ain't Gonna Need It_. Figure out what you need first. Then build it. And only build what you need.

Another saying that applies is _form follows function_. It was challenging to build a tool to build lessons when I wasn't quite sure what the lessons would be like in the first place. 



## The lesson viewer might not have been the best approach

Writing the lessons, I discovered I wanted to be more visual with certain things. I wanted to have SQL queries out on the page, with hand written notes pointing things out. Maybe a .gif of how a join works. Maybe more narrative, who knows. 

What I know now though is that the lesson viewer setup demands lessons be a certain kind of way. Otherwise it feels awkward. The lesson viewer is set up in a way that expects the user to always be writing SQL. This works I guess if they were always going to write SQL, but sometimes I wish I had a better way to show and tell what the lesson is trying to teach.

The lesson content pane was also too small. It wasn't quite enough space for what I wanted to do with it. A full-width page, where you scroll down and came across visualizations, pictures, and an interactive editor might have been a better approach.



## I enjoy building the system more than creating the lessons

This was a big realization. When the application side of things was mostly finished, I wanted to move on. All I had to do is create the lessons, but I couldn't bring myself to do it. I kept procrastinating and putting it off.

I realized through this process that teaching is hard. It gave me a new kind of respect towards teachers, as well as other developers who write to teach what they know. 

I also realized that teaching was something I didn't want to do without an audience. I built this tool knowing it'd be valuable to some people, but I don't know any of those people. Not having a direct audience for feedback kind of killed any motivation I had to continue working on it.



## I work on side projects in seasons

Fall 2011 to Spring 2014 is a long time. In an age of people cranking out simple web-apps in a month or weekend, why did it take me 2.5 years!?

In some ways looking at the time I spent on this project is depressing. However, looking at the activity over the course of 4 rewites and 2 git repos, I realized that I work on my side-projects in seasons. I'll have spans of a few days to a few weeks where I work on my projects a bunch, only to abruptly stop and not touch them for months.
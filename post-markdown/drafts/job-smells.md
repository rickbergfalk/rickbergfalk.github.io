# Job Smells

What to look out for when searching for that next thing.

## Deployment Process & Frequency

Ask to describe the deployment process. Is it automated? Can it be done with assurance that nothing will go wrong? Is it so easy almost anyone can do it?  If they say "we ftp this over there, then log in over here..." they might not be a good candidate.

Of course this kind of goes hand-in-hand with the deployment frequency. Frequent deployments are probably set up to be low-risk, easy, and automated out of necessity. If the deployments are few and far between, a manual mess is likely tolerated.

## Who drives software development? Clients or Company?

Clients don't always know what they want. Their needs should be considered, but ultimately addressed indirectly by the company building the software. The client can express a need, but that need should not be met with client specific code.

## How much customization is in the software?

Somewhat in line with who drives development. A standard software usable for a wide audience, vs. a super flexible software that's  hard to use.

## There needs to be an update to the database schema. Who designs that update? 

Is it the developer working on the application? A dedicated data architect? DBA? A programmer's world doesn't always mesh with the database world.

## Triggers - do you use them?

Triggers are terrible. 
# Home task for RapidAPI

By Ido Zilberberg

## Instructions
* Clone
* Run `npm install`
* Run `ng serve`

Alternatively, browse to TBD

## Design

## Scale considerations
### Low volume
For small scale, it is enough to have a single Node.js app that:
* Serves the front-end code (Angular 5) as static files ("web app")
* Accepts API calls from the front-end using Express.js ("server")
* Connects to Heroku File Stack add-on for file storage
* Connects to Google Firebase to store file metadata
* Deploys on a single Heroku dyno

### High volume
* Separate the web app and server components so higher traffic on one of them does not affect performance of the other, and so they can scale and be maintained separately.
* Replace Heroku File Stack with Amazon S3 of other infinitely scalable storage solution
* Replace Google Firebase with a scalable DB solution (e.g. relational: [Amazon RDS](https://aws.amazon.com/rds/); document-based: [mLab MongoDB](https://mlab.com/home))

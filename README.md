# Home task for RapidAPI - WEB part

(c) 2018 Ido Zilberberg

The other part is the [SERVER](https://github.com/IdoZilberberg/rapid-storage-server).
For scale considerations, see README.md on the [SERVER](https://github.com/IdoZilberberg/rapid-storage-server) repo. 

## Setup
* Install [Node/npm](https://nodejs.org/en/) 
* Install Angular: `npm install -g @angular/cli@latest` (may need `sudo`)
* Clone repo: `git clone https://github.com/IdoZilberberg/rapid-storage-web.git`
* Run `npm install`
* Run `ng serve`
* Open <b>Chrome</b> and browse to [http://localhost:4200](http://localhost:4200)
* Make sure the [Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) Chrome extension installed and enlabed, or Chrome won't let you access the server (I didn't set up the server to support localhost)

Note: you might need to also install Typescript: `npm install -g typescript`

## Design
The web client was written using Angular 5, Bootstrap 4, using ES6 + Typescript.
The user interface could be better, but this is quite a time-consuming task so I chose not to dwell on it for too long. 

Note: this client sends requests to localhost on port 5000. The server is configured to listen on that port so both processes can communicate when they run on the local machine.

## UI
* A File Chooser lets you upload a file from the local file system. Duplicate filenames are allowed as each file has its own unique ID.
* A dropdown allows you to select which user is currently "logged in".
* The file list shows all public files and also private files that belong to the selected user.

* To download a private file, enter the user token into `Enter user token` input (see the tokens in the user dropdown, e.g. 'usr1tok') and the File ID into `Enter private file token` (it is the hex string to the left of each file in the Files List)
* Clicking `Download` will download the file
* Clicking `Public` will toggle the Public/Private flag (and updatr the UI accordingly)
* Clicking `Delete` will "delete" the file (add deletionDate) - I added an Undelete too (uses the same `/PUT` call as the Public/Private toggle)
* Error messages - will show up in red on the right side. An immediate error when the client loads means it cannot communicate with the server. 

## Stuff I didn't do
* Handle server errors in a centralized manner - presently too many "catch" clauses in code
* Error sometimes won't disappear and you'll need to refresh the page
* Better error notifications to user


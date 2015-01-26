# nodejs-drink-counter
Mobile application that helps you tracking your drink consumption while you are at a pub. It might be helpful before paying the bill, if you have no idea about the number of beers you had in the past couple of hours.

This is an experimental project
- using Node.js backend
- persisting into MongoDB
- with jQuery Mobile frontent

# Install

Install MongoDB if you do not have it yet.
```
# apt-get install mongodb
```

Create mongo account (I am using the username / password that is hardcoded in the sources)
```
$ mongo
> use mydb
> db.addUser("akoss", "dreher")
```

Install packages
```
nodejs-drink-counter$ npm install
```

Start server
```
nodejs-drink-counter$ node server.js
```

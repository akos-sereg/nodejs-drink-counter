# nodejs-drink-counter
Mobile application that helps you tracking your drink consumption while you are at a pub. It might be helpful before paying the bill, if you have no idea about the number of beers you had in the past couple of hours.

This is an experimental project to explore Node.js, MongoDB and jQuery Mobile.

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

After that, your application should be available at http://127.0.0.1:3000/mobile

Run tests
```
nodejs-drink-counter$ npm install jasmine-node -g
nodejs-drink-counter$ npm install frisby -g
nodejs-drink-counter$ npm link frisby
nodejs-drink-counter$ npm install request
nodejs-drink-counter$ npm install async
nodejs-drink-counter$ jasmine-node spec/
```

# Screenshots

Main screen

![Main Screen](https://raw.githubusercontent.com/akos-sereg/nodejs-drink-counter/master/docs/screenshot-0.png "Screenshot")

After pub selection, track your consumption ...

![Main Screen](https://raw.githubusercontent.com/akos-sereg/nodejs-drink-counter/master/docs/screenshot-1.png "Screenshot")

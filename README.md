# Reader

Feed reader built with the MERN (Mongo, Express, React and Node) stack

## Quick Start

Add your MONGO_URI and JWTSecret to the default.json file in the config folder.

For development or testing purposes the defaults are set to:
"mongoURI": "mongodb://admin:admin123@localhost:27017/reader",
"jwtSecret": "jwtSecret"

For production change these or set an env var for those on deployment

```bash
Install dependencies for server
npm install

Install dependencies for client
npm run client-install

Run mongoDB server
mongod

Run the client & server with concurrently
npm run dev

Run the Express server only
npm run server

Run the React client only
npm run client

Server runs on http://localhost:5000 and client on http://localhost:3000
```

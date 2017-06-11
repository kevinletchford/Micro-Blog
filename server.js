const express = require('express');
const fs = require('fs');
const sqlite = require('sql.js');

const filebuffer = fs.readFileSync('db/micro-blog.sqlite3');
const db = new sqlite.Database(filebuffer);
const app = express();

app.set('port', (process.env.API_PORT || 3001));
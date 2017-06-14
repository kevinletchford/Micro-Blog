const express = require('express');
const fs = require('fs');
const sqlite = require('sql.js');
import Promise from 'bluebird';
const filebuffer = fs.readFileSync('db/micro-blog.sqlite3');

import db from 'sqlite';      

const app = express();

export default app;

app.set('port', (process.env.API_PORT || 3001));


app.get('/posts', async (req, res, next) => {
  try {
    const posts = await db.all('SELECT * FROM BlogPosts LIMIT 10'); // <=
    res.send(posts);
  } catch (err) {
    next(err);
  }
});


Promise.resolve()
  // First, try to open the database
  .then(() => db.open('db/micro-blog.sqlite3', { Promise }))      // <=
  // Update db schema to the latest version using SQL-based migrations
  .then(() => db.migrate({ force: 'last' }))                  // <=
  // Display error message if something went wrong
  .catch((err) => console.error(err.stack))
  // Finally, launch the Node.js app
  .finally(() => app.listen(port));


/* https://medium.com/@tarkus/node-js-and-sqlite-for-rapid-prototyping-bc9cf1f26f10 */

/*

const COLUMNS = [
  'PostId',
  'PostName',
  'Archived',
  'PublishDate',
  'DateDisplayed',
  'PostContent',
  'Published',
  'Category',
]

app.get('/api/posts', (req, res) => {
  const param = req.query.q;

  if (!param) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  }

  const r = db.exec(`
    select ${COLUMNS.join(', ')} from BlogPosts
    where description like '%${param}%'
    limit 100
  `);

 if (r[0]) {
    res.json(
      r[0].values.map((entry) => {
        const e = {};
        COLUMNS.forEach((c, idx) => {
          // combine fat columns
          if (c.match(/^fa_/)) {
            e.fat_g = e.fat_g || 0.0;
            e.fat_g = parseFloat((
              parseFloat(e.fat_g, 10) + parseFloat(entry[idx], 10)
            ).toFixed(2), 10);
          } else {
            e[c] = entry[idx];
          }
        });
        return e;
      }),
    );
  } else {
    res.json([]);
  }
})

/*
const COLUMNS = [
  'carbohydrate_g',
  'protein_g',
  'fa_sat_g',
  'fa_mono_g',
  'fa_poly_g',
  'kcal',
  'description',
];

app.get('/api/food', (req, res) => {
  const param = req.query.q;

  if (!param) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  }

  // WARNING: Not for production use! The following statement
  // is not protected against SQL injections.
  const r = db.exec(`
    select ${COLUMNS.join(', ')} from entries
    where description like '%${param}%'
    limit 100
  `);

  if (r[0]) {
    res.json(
      r[0].values.map((entry) => {
        const e = {};
        COLUMNS.forEach((c, idx) => {
          // combine fat columns
          if (c.match(/^fa_/)) {
            e.fat_g = e.fat_g || 0.0;
            e.fat_g = parseFloat((
              parseFloat(e.fat_g, 10) + parseFloat(entry[idx], 10)
            ).toFixed(2), 10);
          } else {
            e[c] = entry[idx];
          }
        });
        return e;
      }),
    );
  } else {
    res.json([]);
  }
});*/
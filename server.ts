/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import 'zone.js/dist/zone-node';
// Refrence Error localStorage Not found  solution
import 'localstorage-polyfill';
import {enableProdMode} from '@angular/core';

import {ngExpressEngine} from '@nguniversal/express-engine';
import * as express from 'express';
import {join} from 'path';

import {AppServerModule} from './src/main.server';
import {APP_BASE_HREF} from '@angular/common';
import {existsSync} from 'fs';
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import {environment} from 'src/environments/environment';

// Refrence Error Event Not Found Solution
global['Event'] = null;

// Refrence Error Window Not found  solution
const httpRequest = require('request');
const domino = require('domino');
const fs = require('fs');
const path = require('path');
const template = fs
  .readFileSync(path.join(__dirname, '../', '', 'browser/index.html'))
  .toString();
const win = domino.createWindow(template);
global['window'] = win;
global['document'] = win.document;
global['navigator'] = win.navigator;

global['localStorage'] = localStorage;

const cors = require('cors');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  server.use(cors());
  const distFolder = join(process.cwd(), 'dist/multikart/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';
  const LAZY_MODULE_MAP = require('./src/main.server');
  const { SitemapStream, streamToPromise } = require('sitemap');
  const { createGzip } = require('zlib');
  const fetch = require('node-fetch');
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
      providers: [provideModuleMap(LAZY_MODULE_MAP)],
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  let sitemap;

  server.get('/sitemap.xml', function (req, res) {
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');
    // if we have a cached entry send it
    if (sitemap) {
      res.send(sitemap);
      return;
    }

    try {
      const smStream = new SitemapStream({
        hostname: environment.hostUrl,
      });
      const pipeline = smStream.pipe(createGzip());

      // pipe your entries or directly write them.
      smStream.write({ url: '/', changefreq: 'daily', priority: 0.8 });
      smStream.write({ url: '/whats-new', changefreq: 'daily', priority: 0.7 });
      smStream.write({
        url: '/about-to-drop',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/whats-new/available',
        changefreq: 'daily',
        priority: 0.6,
      });
      smStream.write({
        url: '/whats-new/on-sale',
        changefreq: 'daily',
        priority: 0.6,
      });
      smStream.write({
        url: '/whats-new/restock',
        changefreq: 'daily',
        priority: 0.6,
      });
      smStream.write({
        url: '/whats-new/sold-out',
        changefreq: 'daily',
        priority: 0.6,
      });
      smStream.write({
        url: '/whats-new/coming-soon',
        changefreq: 'daily',
        priority: 0.6,
      });
      smStream.write({
        url: '/about-to-drop/coming-soon',
        changefreq: 'daily',
        priority: 0.6,
      });
      smStream.write({
        url: '/about-to-drop/just-dropped',
        changefreq: 'daily',
        priority: 0.6,
      });
      smStream.write({
        url: '/about-to-drop/raffles',
        changefreq: 'daily',
        priority: 0.6,
      });
      smStream.write({
        url: '/release-calendar',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({ url: '/releases', changefreq: 'daily', priority: 0.9 });
      smStream.write({
            url: '/releases/in-stock',
            changefreq: 'daily',
            priority: 0.6,
        });
       smStream.write({
            url: '/releases/coming-soon',
            changefreq: 'daily',
            priority: 0.6,
        });
       smStream.write({
            url: '/releases/resell-only',
            changefreq: 'daily',
            priority: 0.6,
        });

      smStream.write({
        url: '/brands/nike',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/brands/jordan',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/brands/adidas',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/brands/converse',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/categories/basketball',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/categories/classic',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/categories/golf',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/categories/lifestyle',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/categories/luxury',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/categories/running',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/categories/skateboard',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/categories/slide',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/categories/soccer',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/categories/tennis',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/categories/training-&-gym',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/styles',
        changefreq: 'daily',
        priority: 0.7,
      });
      smStream.write({
        url: '/deals',
        changefreq: 'daily',
        priority: 0.7,
      });

      smStream.write({ url: '/blog', changefreq: 'daily', priority: 0.7 });
      smStream.write({ url: '/contact', changefreq: 'daily', priority: 0.3 });

      /* or use
                Readable.from([{url: '/page-1'}...]).pipe(smStream)
                if you are looking to avoid writing your own loop.
                */

      // cache the response
      streamToPromise(pipeline).then(sm => (sitemap = sm));
      // make sure to attach a write stream such as streamToPromise before ending
      smStream.end();
      // stream write the response
      pipeline.pipe(res).on('error', e => {
        throw e;
      });
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  // TODO: This work, I need to change for metadata
  server.get('*', (req, res) => {
    res.render(
      indexHtml,
      {
        req,
        providers: [
          {
            provide: APP_BASE_HREF,
            useValue: req.baseUrl,
          },
        ],
      },
      (err, html) => {
        if (html) {
          //console.log(html);
          // This is where you get hold of HTML which "is about to be rendered"

          // after some conditional checks make a HTTP call
          let url = environment.apiUrl;
          httpRequest.get(url, (error, response, body) => {
            if (error) {
              return console.log(error);
            }
            const respBody = JSON.parse(body);
            if (respBody) {
              html = html.replace(/\$TITLE/g, respBody.title);
              html = html.replace(/\$DESCRIPTION/g, respBody.description);
              html = html.replace(/\$OG_META_KEYWORDS/g, respBody.metaKeywords);
              html = html.replace(
                /\$OG_META_DESCRIPTION/g,
                respBody.metaDescription
              );
              html = html.replace(/\$OG_DESCRIPTION/g, respBody.ogDescription);
              html = html.replace(/\$OG_TITLE/g, respBody.ogTitle);
              html = html.replace(/\$OG_IMAGE/g, respBody.img);
              html = html.replace(/\$OG_SITE/g, respBody.ogSite);
            }
            res.send(html);
          });
        }
      }
    );
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4001;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
export { renderModule, renderModuleFactory } from '@angular/platform-server';

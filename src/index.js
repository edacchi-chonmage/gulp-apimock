import _ from 'lodash-node';
import fs from 'fs';
import through from 'through2';
import path from 'path';
import protagonist from 'protagonist';
import express from 'express';
import compile from './compile.js';
import inheritHeaders from './inheritHeaders.js';
import inheritParameters from './inheritParameters.js';
import exampleToHttpPayloadPair from './exampleToHttpPayloadPair.js';

let app;
let server;

function mocks () {
  return through.obj((file, enc, cb) => {
    let text = file.contents.toString();
    app = express();

    let sendResponse = (responses) => {
      return (req, res) => {
        let response = responses[Object.keys(responses)[0]];

        if ('prefer' in req.headers) {
          if (req.headers.prefer in responses) {
            response = responses[req.headers.prefer];
          }
        }

        _.forEach(response.headers, (value, header) => {
          let headerName = value.name;
          let headerValue = value.value;

          res.setHeader(headerName, headerValue);
        });

        res.setHeader('Content-Length', Buffer.byteLength(response.body));
        res.send(response.status, compile(JSON.parse(response.body)));
      };
    };

    protagonist.parse(text, { type: 'ast' }, (err, res) => {
      let responses = [];

      _.forEach(res.ast.resourceGroups, (group) => {
        let path;

        _.forEach(group.resources, (resource) => {
          if (resource.uriTemplate) {
            path = resource.uriTemplate.split('{?')[0].replace(new RegExp("}","g"), "").replace(new RegExp("{","g"), ":");
          }

          _.forEach(resource.actions, (action) => {
            action.headers = inheritHeaders(action.headers, resource.headers);
            action.parameters = inheritParameters(action.parameters, resource.parameters);

            _.forEach(action.examples, (example) => {
              let payload = exampleToHttpPayloadPair(example, action.headers);

              _.forEach(example.responses, (response, i) => {
                responses.push({
                  method: action.method,
                  path: path,
                  responses: payload.pair.responses
                });
              });
            });
          });
        });
      });

      responses.sort((a, b) => {
        if (a.path > b.path) {
           return -1
        } else if (a.path < b.path) {
          return 1
        } else {
          return 0;
        }
      });

      _.forEach(responses, (response) => {
        switch (response.method) {
          case 'GET':
            app.get(response.path, sendResponse(response.responses));
            break;
          case 'POST':
            app.post(response.path, sendResponse(response.responses));
            break;
          case 'PUT':
            app.put(response.path, sendResponse(response.responses));
            break;
          case 'DELETE':
            app.delete(response.path, sendResponse(response.responses));
            break;
          case 'PATCH':
            app.patch(response.path, sendResponse(response.responses));
            break;
          default:
            break;
        } 
      });

      server = app.listen(3000);
    });
  });
}

mocks.rerun = function () {
  server.close();
  server.listen(3000);
};

module.exports = mocks;

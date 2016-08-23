'use strict';

var _lodashNode = require('lodash-node');

var _lodashNode2 = _interopRequireDefault(_lodashNode);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _protagonist = require('protagonist');

var _protagonist2 = _interopRequireDefault(_protagonist);

var _corser = require('corser');

var _corser2 = _interopRequireDefault(_corser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _compile = require('./compile.js');

var _compile2 = _interopRequireDefault(_compile);

var _inheritHeaders = require('./inheritHeaders.js');

var _inheritHeaders2 = _interopRequireDefault(_inheritHeaders);

var _inheritParameters = require('./inheritParameters.js');

var _inheritParameters2 = _interopRequireDefault(_inheritParameters);

var _exampleToHttpPayloadPair = require('./exampleToHttpPayloadPair.js');

var _exampleToHttpPayloadPair2 = _interopRequireDefault(_exampleToHttpPayloadPair);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = void 0;
var server = void 0;

function mocks() {
  return _through2.default.obj(function (file, enc, cb) {
    var text = file.contents.toString();
    app = (0, _express2.default)();
    app.use(_corser2.default.create());

    var sendResponse = function sendResponse(responses) {
      return function (req, res) {
        var response = responses[Object.keys(responses)[0]];

        if ('prefer' in req.headers) {
          if (req.headers.prefer in responses) {
            response = responses[req.headers.prefer];
          }
        }

        _lodashNode2.default.forEach(response.headers, function (value, header) {
          var headerName = value.name;
          var headerValue = value.value;

          res.setHeader(headerName, headerValue);
        });

        res.setHeader('Content-Length', Buffer.byteLength(response.body));
        res.send(response.status, (0, _compile2.default)(JSON.parse(response.body)));
      };
    };

    _protagonist2.default.parse(text, { type: 'ast' }, function (err, res) {
      var responses = [];

      _lodashNode2.default.forEach(res.ast.resourceGroups, function (group) {
        var path = void 0;

        _lodashNode2.default.forEach(group.resources, function (resource) {
          if (resource.uriTemplate) {
            path = resource.uriTemplate.split('{?')[0].replace(new RegExp("}", "g"), "").replace(new RegExp("{", "g"), ":");
          }

          _lodashNode2.default.forEach(resource.actions, function (action) {
            action.headers = (0, _inheritHeaders2.default)(action.headers, resource.headers);
            action.parameters = (0, _inheritParameters2.default)(action.parameters, resource.parameters);

            _lodashNode2.default.forEach(action.examples, function (example) {
              var payload = (0, _exampleToHttpPayloadPair2.default)(example, action.headers);

              _lodashNode2.default.forEach(example.responses, function (response, i) {
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

      responses.sort(function (a, b) {
        if (a.path > b.path) {
          return -1;
        } else if (a.path < b.path) {
          return 1;
        } else {
          return 0;
        }
      });

      _lodashNode2.default.forEach(responses, function (response) {
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
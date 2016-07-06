'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (example) {
  var inheritingHeaders = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var result = {
    warnings: [],
    errors: [],
    pair: {}
  };
  var request = {};
  var responses = {};

  if (example.requests.length > 1) {
    resulti.warnings.push('Multiple requests, using first.');
  }

  if (example.responses.length == 0) {
    result.warnings.push("No response available. Can't create HTTP transaction.");
  } else {
    var selectedRequest = example.requests[0];

    if (example.requests.length == 0) {
      selectedRequest = {
        body: '',
        headers: {}
      };
    }

    request.body = selectedRequest.body;
    request.headers = (0, _inheritHeaders2.default)(selectedRequest.headers, inheritingHeaders);

    _lodashNode2.default.each(example.responses, function (selectedResponse) {
      var response = {};

      response.body = selectedResponse.body;
      response.headers = (0, _inheritHeaders2.default)(selectedResponse.headers, inheritingHeaders);
      response.status = selectedResponse.name;

      if (selectedResponse.schema != '') {
        response.schema = selectedResponse.schema;
      }

      responses[response.status] = response;
    });
  }

  result.pair.request = request;
  result.pair.responses = responses;

  return result;
};

var _lodashNode = require('lodash-node');

var _lodashNode2 = _interopRequireDefault(_lodashNode);

var _inheritHeaders = require('./inheritHeaders.js');

var _inheritHeaders2 = _interopRequireDefault(_inheritHeaders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
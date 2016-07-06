'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (actualHeaders, inheritingHeaders) {
  _lodashNode2.default.map(inheritingHeaders, function (value, key) {
    if (actualHeaders[key] == undefined) {
      actualHeaders[key] = value;
    }
  });

  return actualHeaders;
};

var _lodashNode = require('lodash-node');

var _lodashNode2 = _interopRequireDefault(_lodashNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (actualParameters, inheritingParameters) {
  _lodashNode2.default.forEach(inheritingParameters, function (value, key) {
    if (actualParameters[key] == undefined) {
      actualParameters[key] = value;
    }
  });

  return actualParameters;
};

var _lodashNode = require('lodash-node');

var _lodashNode2 = _interopRequireDefault(_lodashNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
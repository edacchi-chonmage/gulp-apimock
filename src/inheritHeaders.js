import _ from 'lodash-node';

export default function (actualHeaders, inheritingHeaders) {
  _.map(inheritingHeaders, (value, key) => {
    if (actualHeaders[key] == undefined) {
      actualHeaders[key] = value;
    }
  });

  return actualHeaders;
}

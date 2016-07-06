import _ from 'lodash-node';

export default function (actualParameters, inheritingParameters) {
  _.forEach(inheritingParameters, (value, key) => {
    if (actualParameters[key] == undefined) {
      actualParameters[key] = value;
    }
  });

  return actualParameters;
}

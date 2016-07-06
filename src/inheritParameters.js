import _ from 'lodash-node';

export default function (actualParameters, inheritingParameters) {
  _.forEach(inheritingParameters, (value, key) => {
    if (actualParameters[name] == undefined) {
      actualParameters[name] = params;
    }
  });

  return actualParameters;
}

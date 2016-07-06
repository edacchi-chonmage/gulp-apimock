import _ from 'lodash-node';
import inheritHeaders from './inheritHeaders.js';

export default function (example, inheritingHeaders = {}) {
  let result = {
    warnings: [],
    errors: [],
    pair: {}
  };
  let request = {};
  let responses = {};

  if (example.requests.length > 1) {
    resulti.warnings.push('Multiple requests, using first.');
  }

  if (example.responses.length == 0) {
    result.warnings.push("No response available. Can't create HTTP transaction.");
  } else {
    let selectedRequest = example.requests[0]

    if (example.requests.length == 0) {
      selectedRequest = {
        body: '',
        headers: {}
      }
    }

    request.body = selectedRequest.body;
    request.headers = inheritHeaders(selectedRequest.headers, inheritingHeaders);

    _.each(example.responses, (selectedResponse) => {
      let response = {};

      response.body = selectedResponse.body;
      response.headers = inheritHeaders(selectedResponse.headers, inheritingHeaders);
      response.status = selectedResponse.name;

      if (selectedResponse.schema != '') {
        response.schema = selectedResponse.schema;
      }

      responses[response.status] = response;
    });
  }

  result.pair.request = request;
  result.pair.responses = responses;

  return result
}

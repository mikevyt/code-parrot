"use strict"

const os = require("os");
const request = require("request");
const querystring = require("querystring");
const CognitiveServicesCredentials = require("ms-rest-azure").CognitiveServicesCredentials;
const LUISRuntimeClient = require("azure-cognitiveservices-luis-runtime");

const apiKey = "236159b07b44416ea84ebe66bc973f1d";
const credentials = new CognitiveServicesCredentials(apiKey);
const client = new LUISRuntimeClient(credentials, "https://westus.api.cognitive.microsoft.com/luis/api/v2.0");

class CodeConverter {

  constructor() { }

  async parseKeywordsFromString(query) {
    const appId = "17491c7c-1e2f-4837-bef4-963de4295a18";
    // object = {
    //   intent,
    //   name,
    //   value,
    //   x,
    //   iterations,
    //   ...
    // }

    const queryParams = {
      "verbose": true,
      "q": query,
      "subscription-key": apiKey
    };
    const luisRequest = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/" + appId + "?" + querystring.stringify(queryParams);

    request(luisRequest, (err,response, body) => {
        if (err) {
          console.log(err);
        } else {
          const data = JSON.parse(body);
        }
      });
  }
}

module.exports = CodeConverter;

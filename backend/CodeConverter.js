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

  constructor() {}

  extractData(data) {
    const result = {};
    result.intent = data.topScoringIntent.intent;
    switch (result.intent) {
      case "InitializeVariable":
        data.entities.forEach(entityObj => {
          switch (entityObj.type) {
            case "variable":
              result.name = entityObj.entity ? entityObj.entity.replace(" ", "") : "";
              break;
            case "builtin.number":
              result.value = entityObj.entity ? entityObj.entity : "0";
              break;
          }
        });
        break;
      case "ForLoop":
        result.iterations = data.entities[0] ? data.entities[0].entity : "0";
        break;
      case "IfStatement":
        data.entities.forEach(entityObj => {
          switch (entityObj.type) {
            case "comparison":
              if (entityObj.entity) {
                if (entityObj.entity.includes("less than or equal")) {
                  result.condition = "<=";
                } else if (entityObj.entity.includes("less than")) {
                  result.condition = "<";
                } else if (entityObj.entity.includes("greater than or equal")) {
                  result.condition = ">=";
                } else if (entityObj.entity.includes("greater than")) {
                  result.condition = ">";
                } else if (entityObj.entity.includes("not equal") || entityObj.entity.includes("not same")) {
                  result.condition = "!=";
                } else if (entityObj.entity.includes("equal") || entityObj.entity.includes("same")) {
                  result.condition = "==";
                }
              }
              break;
            case "firstVar":
              result.x = entityObj.entity ? entityObj.entity.replace(" ", "") : "";
              break;
            case "secondVar":
              result.y = entityObj.entity ? entityObj.entity.replace(" ", "") : "";
              break;
          }
        });
        break;
      case "MakeFunction":
        let i = 0;
        data.entities.forEach(entityObj => {
          switch (entityObj.type) {
            case "functionName":
              result.name = entityObj.entity ? entityObj.entity.replace(" ", "") : "";
              break;
            case "parameter":
              if (i == 0) {
                result.param1 = entityObj.entity ? entityObj.entity.replace(" ", "") : "";
              } else {
                result.param2 = entityObj.entity ? entityObj.entity.replace(" ", "") : "";
              }
              i++;
          }
        });
        break;
      case "PrintText":
        result.sentence = data.entities[0] ? data.entities[0].entity : "";
        break;
      case "CallFunction":
        let x = 0;
        data.entities.forEach(entityObj => {
          switch (entityObj.type) {
            case "functionName":
              result.funcName = entityObj.entity ? entityObj.entity.replace(" ", "") : "";
              break;
            case "parameter":
              if (x == 0) {
                result.arg1 = entityObj.entity ? entityObj.entity.replace(" ", "") : "";
              } else {
                result.arg2 = entityObj.entity ? entityObj.entity.replace(" ", "") : "";
              }
              x++;
              break;
          }
        });
        break;
    }

    return result;
  }

  async parseKeywordsFromString(query, cb) {
    const appId = "17491c7c-1e2f-4837-bef4-963de4295a18";

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
          const result = this.extractData(data);
          cb(result);
        }
      });
  }
}

module.exports = CodeConverter;

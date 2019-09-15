"use strict"

const os = require("os");
const TextAnalyticsAPIClient = require("azure-cognitiveservices-textanalytics");
const CognitiveServicesCredentials = require("ms-rest-azure").CognitiveServicesCredentials;

const apiKey = "ab7cf44c79ba4dfa9dc74bc82d7d2456";
const credentials = new CognitiveServicesCredentials(apiKey);
const client = new TextAnalyticsAPIClient(credentials, "https://westcentralus.api.cognitive.microsoft.com/")

class CodeConverter {

  constructor() {}

  async getKeywords() {
    const keyPhrasesInput = {
      documents: [
        {
          language: "en",
          id: "1",
          text: "loop 25 times"
        }
      ]
    };

    const keyPhraseResult = await client.keyPhrases({
      multiLanguageBatchInput: keyPhrasesInput
    });
    const entitiesResult = await client.entities({
      multiLanguageBatchInput: keyPhrasesInput
    });

    console.log(keyPhraseResult.documents);
    console.log(entitiesResult.documents[0].entities);
    console.log(os.EOL);
  }
}

module.exports = CodeConverter;

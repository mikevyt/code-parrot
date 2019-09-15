const express = require('express');
const fs = require('fs');
const app = express();
var cors = require('cors');
const SpeechToText = require('./APIManager');
const multer = require('multer'); //use multer to upload blob data
const upload = multer(); // set multer to be the upload variable (just like express, see above ( include it, then use it/set it up))
const CodeConverter = require("./CodeConverter");

app.use(cors());

app.post('/upload', upload.single('file'), async (req, res) => {
    let uploadLocation = __dirname + '/wavs/' + req.file.originalname; // where to save the file to. make sure the incoming name has a .wav extension
    await fs.writeFileSync(
        uploadLocation,
        Buffer.from(new Uint8Array(req.file.buffer))
    ); // write the blob to the server as a file
    console.log('file wrote');

    apiManager = new SpeechToText();
    const text = apiManager.uploadFile(req.file.originalname, text => {
        res.send(text);
    });
});

const codeConverter = new CodeConverter();
  result = codeConverter.parseKeywordsFromString();

  if (result.intent == "End") {
    let sentence = "\n";

  } else if (result.intent == "MakeFunction") {
    let sentence = createFunction(result.name, result.param1, result.param2);

  } else if (result.intent == "ForLoop") {
    let sentence = initializeForLoop(result.interations);

  } else if (result.intent == "IfStatement") {
    let sentence = createIfStatement(result.x, result.condition, result.y);

  } else if (result.intent == "CallFunction") {
    let sentence = callFunction(result.funcName, result.arg1, result.arg2);

  } else if (result.intent == "InitializeVariable") {
    let sentence = initializeVariable(result.name, result.value);

  } else {  //intent == PrintText
    let sentence = printSomething(result.sentence);
  }
});

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});

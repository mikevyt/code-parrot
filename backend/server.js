const express = require('express');
const fs = require('fs');
const app = express();
var cors = require('cors');
const SpeechToText = require('./APIManager');
const multer = require('multer'); //use multer to upload blob data
const upload = multer(); // set multer to be the upload variable (just like express, see above ( include it, then use it/set it up))
const CodeConverter = require("./CodeConverter");
const translations = require("./translations/translations");

app.use(cors());

app.post('/upload', upload.single('file'), async (req, res) => {
    let uploadLocation = __dirname + '/wavs/' + req.file.originalname; // where to save the file to. make sure the incoming name has a .wav extension
    await fs.writeFileSync(
        uploadLocation,
        Buffer.from(new Uint8Array(req.file.buffer))
    ); // write the blob to the server as a file
    var interpretedString;

    apiManager = new SpeechToText();
    const text = apiManager.uploadFile(req.file.originalname, text => {
        interpretedString = text;
    });

    const codeConverter = new CodeConverter();
    result = codeConverter.parseKeywordsFromString(interpretedString);

    let sentence;
    if (result.intent == "End") {
        sentence = "\n";

    } else if (result.intent == "MakeFunction") {
        sentence = translations.createFunction(result.name, result.param1, result.param2);

    } else if (result.intent == "ForLoop") {
        sentence = translations.initializeForLoop(result.interations);

    } else if (result.intent == "IfStatement") {
        sentence = translations.createIfStatement(result.x, result.condition, result.y);

    } else if (result.intent == "CallFunction") {
        sentence = translations.callFunction(result.funcName, result.arg1, result.arg2);

    } else if (result.intent == "InitializeVariable") {
        sentence = translations.initializeVariable(result.name, result.value);

    } else {  //intent == PrintText
        sentence = translations.printSomething(result.sentence);
    }

    res.send(sentence);


});

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});

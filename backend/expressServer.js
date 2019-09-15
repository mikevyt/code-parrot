const express = require('express');
const fs = require('fs');
const app = express();
var cors = require('cors');
const SpeechToText = require('./APIManager');
const multer = require('multer'); //use multer to upload blob data
const upload = multer(); // set multer to be the upload variable (just like express, see above ( include it, then use it/set it up))

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

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});

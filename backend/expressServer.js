const express = require('express')
const app = express();
var cors = require('cors');
const SpeechToText = require('./APIManager')

app.use(cors());

app.post('/upload', (req, res) => {
  const text = SpeechToText.uploadFile("bitchass2.wav", (text) => {
    res.send(text);
  });
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});

const express = require('express')
const app = express();
const SpeechToText = require('./APIManager')

app.get('/', (req, res) => {
  SpeechToText.uploadFile("bitchass2.wav")
  res.send('Hello World!')
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});


// pull in the required packages.
var sdk = require("microsoft-cognitiveservices-speech-sdk");
var fs = require("fs");


class SpeechToText {
    uploadFile(fileName, cb) {
        var subscriptionKey = "46225144992d4fb38ef5237945711ab9";
        var serviceRegion = "westus"; // e.g., "westus"
        var location = 'wavs/' + fileName; // 16000 Hz, Mono

        var pushStream = new sdk.AudioInputStream.createPushStream();

        fs.createReadStream(location).on('data', async function (arrayBuffer) {
            await pushStream.write(arrayBuffer.buffer);
        }).on('end', async function () {
            await pushStream.close();
        });

        var audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
        var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

        speechConfig.speechRecognitionLanguage = "en-US";

        var recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync(
            function (result) {
                console.log(result);
                cb(result.privText);
                recognizer.close();
                pushStream.close();
                pushStream = undefined;
                recognizer = undefined;
            },
            function (err) {
                console.trace("err - " + err);

                pushStream.close();
                pushStream = undefined;
                recognizer.close();
                recognizer = undefined;
            }
        );
    }   
}

module.exports = SpeechToText;

// pull in the required packages.
var sdk = require("microsoft-cognitiveservices-speech-sdk");
var fs = require("fs");


class SpeechToText {
    uploadFile(fileName, cb) {
        // replace with your own subscription key,
        // service region (e.g., "westus"), and
        // the name of the file you want to run
        // through the speech recognizer.
        var subscriptionKey = "46225144992d4fb38ef5237945711ab9";
        var serviceRegion = "westus"; // e.g., "westus"
        var filename = 'wavs/' + fileName; // 16000 Hz, Mono
        console.log('in uploadFile');
        // create the push stream we need for the speech sdk.
        var pushStream = sdk.AudioInputStream.createPushStream();
        console.log('pushStream defined');
        // open the file and push it to the push stream.
        fs.createReadStream(filename).on('data', async function (arrayBuffer) {
            await pushStream.write(arrayBuffer.buffer);
        }).on('end', async function () {
            await pushStream.close();
        });

        console.log('readStream created');

        // we are done with the setup
        console.log("Now recognizing from: " + filename);

        // now create the audio-config pointing to our stream and
        // the speech config specifying the language.
        var audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
        var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

        // setting the recognition language to English.
        speechConfig.speechRecognitionLanguage = "en-US";

        // create the speech recognizer.
        var recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

        // start the recognizer and wait for a result.
        recognizer.recognizeOnceAsync(
            function (result) {
                console.log(result);
                cb(result.privText);
                recognizer.close();
                recognizer = undefined;
            },
            function (err) {
                console.trace("err - " + err);

                recognizer.close();
                recognizer = undefined;
            }
        );
    }   
}

module.exports = SpeechToText;
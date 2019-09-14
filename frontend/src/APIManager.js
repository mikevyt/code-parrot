
// pull in the required packages.
var sdk = require("microsoft-cognitiveservices-speech-sdk");
var fs = require("fs");


const SpeechToText = {

    uploadFile2(fileName) {
        // status fields and start button in UI
        var phraseDiv;
        var startRecognizeOnceAsyncButton;

        // subscription key and region for speech services.
        var subscriptionKey, serviceRegion;
        var authorizationToken;
        var SpeechSDK;
        var recognizer;

        document.addEventListener("DOMContentLoaded", function () {
            startRecognizeOnceAsyncButton = document.getElementById("startRecognizeOnceAsyncButton");
            subscriptionKey = document.getElementById("subscriptionKey");
            serviceRegion = document.getElementById("serviceRegion");
            phraseDiv = document.getElementById("phraseDiv");

            startRecognizeOnceAsyncButton.addEventListener("click", function () {
                startRecognizeOnceAsyncButton.disabled = true;
                phraseDiv.innerHTML = "";

                // if we got an authorization token, use the token. Otherwise use the provided subscription key
                var speechConfig;
                if (authorizationToken) {
                    speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authorizationToken, serviceRegion.value);
                } else {
                    if (subscriptionKey.value === "" || subscriptionKey.value === "subscription") {
                        alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
                        return;
                    }
                    speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey.value, serviceRegion.value);
                }

                speechConfig.speechRecognitionLanguage = "en-US";
                var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
                recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

                recognizer.recognizeOnceAsync(
                    function (result) {
                        startRecognizeOnceAsyncButton.disabled = false;
                        phraseDiv.innerHTML += result.text;
                        window.console.log(result);

                        recognizer.close();
                        recognizer = undefined;
                    },
                    function (err) {
                        startRecognizeOnceAsyncButton.disabled = false;
                        phraseDiv.innerHTML += err;
                        window.console.log(err);

                        recognizer.close();
                        recognizer = undefined;
                    });
            });

            if (!!window.SpeechSDK) {
                SpeechSDK = window.SpeechSDK;
                startRecognizeOnceAsyncButton.disabled = false;

                document.getElementById('content').style.display = 'block';
                document.getElementById('warning').style.display = 'none';

                // in case we have a function for getting an authorization token, call it.
                if (typeof RequestAuthorizationToken === "function") {
                    RequestAuthorizationToken();
                }
            }

        })
    }
    // },

    // uploadFile(fileName) {
    //             // replace with your own subscription key,
    //             // service region (e.g., "westus"), and
    //             // the name of the file you want to run
    //             // through the speech recognizer.
    //             var subscriptionKey = "46225144992d4fb38ef5237945711ab9";
    //             var serviceRegion = "westus"; // e.g., "westus"
    //             var filename = fileName; // 16000 Hz, Mono

    //             // create the push stream we need for the speech sdk.
    //             var pushStream = sdk.AudioInputStream.createPushStream();

    //             // open the file and push it to the push stream.
    //             fs.createReadStream(filename).on('data', function (arrayBuffer) {
    //                 pushStream.write(arrayBuffer.buffer);
    //             }).on('end', function () {
    //                 pushStream.close();
    //             });

    //             // we are done with the setup
    //             console.log("Now recognizing from: " + filename);

    //             // now create the audio-config pointing to our stream and
    //             // the speech config specifying the language.
    //             var audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
    //             var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

    //             // setting the recognition language to English.
    //             speechConfig.speechRecognitionLanguage = "en-US";

    //             // create the speech recognizer.
    //             var recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    //             // start the recognizer and wait for a result.
    //             recognizer.recognizeOnceAsync(
    //                 function (result) {
    //                     console.log(result);

    //                     recognizer.close();
    //                     recognizer = undefined;
    //                 },
    //                 function (err) {
    //                     console.trace("err - " + err);

    //                     recognizer.close();
    //                     recognizer = undefined;
    //                 });
    //         }   
}

export default { SpeechToText } ;
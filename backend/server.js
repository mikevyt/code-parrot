//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;
const CodeConverter = require("./CodeConverter");


//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
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

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

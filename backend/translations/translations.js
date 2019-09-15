module.exports = {

  initializeVariable: function (name, value) {
    if (typeof value == "string") {
      return (name + " = " + value + "\n");
    } else {
      return (name + " = " + value + "\n");
    }
  },

  initializeForLoop: function (iterations) {
      return ("for i in range (" + (iterations) + "): \n");
  },

  createIfStatement: function (x, condition, y) {
    if (typeof y == "string") {
      return ("if " + x + " " + condition + " " + y + ":\n");
    } else {
      return ("if " + x + " " + condition + " " + y + ":\n");
    }
  },

  createFunction: function (name, param1, param2) {
    return ("def " + name + "(" + param1 + ", " + param2 + "):\n");
  },

  printSomething: function (sentence) {
    return ("print(\"" + sentence + "\")\n");
  },

  callFunction: function (funcName, arg1, arg2) {
    return (funcName + "(" + arg1 + ", " + arg2 + ")\n");
  }
}


function initializeVariable(name, value){

    if (typeof value == 'string'){
        return ("'" + name + " = '" + value + "'\n'");

    }else{
        return ("'" + name + " = " +  value + "\n'");
    }
}

function initializeForLoop(x, iterations){

    if (typeof iterations == 'string'){
        return ("'for " + x + " in " + (iterations-1) + "'\n");
    }else{
        return ("'for " + x + " in range (" + (iterations-1) + "): \n'");
    }
}

function createIfStatement(x, condition, y){

    if (typeof y == 'string'){
             return("'if " + x + " " + condition + " '" + y + "':\n'");

    }else{
            return("'if " + x + " " + condition + " " + y + ":\n'");
    }
}

function createFunction(name, param1, param2){
    return ("'def " + name + "(" + param1 + ", " + param2 + ")\n'");

}

function printSomething(sentence){
    return ("'print(\"" + sentence + "\")\n'");

}

function callFunction(funcName, arg1, arg2){
    return ("'" + funcName + "(" + arg1 + ", " + arg2 + ")\n'");

}




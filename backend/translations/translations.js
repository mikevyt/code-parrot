function initializeVariable(name, value){

    if (typeof value == 'string'){
        return ("'" + name + " = '" + value + "''");

    }else{
        return ("'" + name + " = " +  value + "'");
    }
}

function initializeForLoop(x, iterations){

    if (typeof iterations == 'string'){
        return ("'for " + x + " in " + (iterations-1) + "'");
    }else{
        return ("'for " + x + " in range (" + (iterations-1) + "): '");
    }
}

function createIfStatement(x, condition, y){

    if (typeof y == 'string'){
             return("'if " + x + " " + condition + " '" + y + "':'");

    }else{
            return("'if " + x + " " + condition + " " + y + ":'");
    }
}

function createFunction(name, param1, param2){
    return ("'def " + name + "(" + param1 + ", " + param2 + ")'");

}

function printSomething(sentence){
    return ("'print(\"" + sentence + "\")'");

}

function callFunction(funcName, arg1, arg2){
    return ("'" + funcName + "(" + arg1 + ", " + arg2 + ")'");

}

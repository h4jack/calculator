//in this js program i will convert infix expression to postfix then i will evoluate it.
const expin = document.getElementById("expin");
const result = document.getElementById("result");

const user_input = document.getElementById("user-input");
user_input.addEventListener('keypress', enterPressed);

const history = document.getElementById("last-command");
let historyarr = ["This Array Stores History User Inputs."];

const helpobj = document.getElementById("help");
const helpmsg = `This is a Calculator Web Application with some basic operation like +,-,*,/,%,^. <br>
you can add '(' and ')' in the input field below history. <br>
if you found any bug or result error you can <a href="mailto:susantamandi.user@gmail.com">Email Us.</a>
`;
console.log(helpmsg);

let calvalue = 0;
let count = 0;

let help = false;

function outputToInput(){
    if(typeof(Number(result.value)) == 'number' && !(result.value == "NaN" || result.value == "undefined")){
        submit();
        user_input.value = result.value;
        result.value = "";
        expin.value = user_input.value;
    }
}

function submit() {
    if(user_input.value == ""){
        showhelp("Can't Calculate No Input");
        return;
    }
    if(user_input.value != "" && result.value != "" && user_input.value != historyarr[count] && typeof(Number(result.value)) == 'number' && !(result.value == "NaN" || result.value == "undefined")){
        history.style.visibility = "visible";
        count = count + 1;
        historyarr[count] = user_input.value;
        history.innerHTML = "<p onclick=\"clickHistory('" + user_input.value + "')\">" + count + ":</br>" + "    User: " + user_input.value + "</br>" + "    JAGU: " + calvalue + "</p>" + history.innerHTML;
    }
}

function inputChanged() {
    user_input.value = user_input.value.replaceAll(/ /g,"");
    helpobj.style.visibility = "hidden";
    expin.value = user_input.value;
    expin.scrollLeft = expin.scrollWidth; // scroll to the right
    calvalue = evaluatePostfix(infixToPostfix(charToList(user_input.value)));
    result.value = calvalue;
    result.scrollLeft = result.scrollWidth; // scroll to the right
    if(user_input.value == ""){
        result.value = "";
        expin.value = ""
    }
}

function appendChar(c) {
    user_input.value += c;
    inputChanged();
}

function clearInput(c) {
    if (c == "AC") {
        user_input.value = "";
        result.value = "";
        expin.value = "";
    }else {
        let str = user_input.value;
        str = str.substring(0, str.length - 1);
        user_input.value = str;
        inputChanged();
        if (str == "") {
            result.value = "";
            expin.value = "";
        }
    }
}

function showhelp(c){
    if(c == 1){
        helpobj.innerHTML = helpmsg;
        if(help == false){
            help = true;
            helpobj.style.visibility = "visible";
        }else{
            help = false;
            helpobj.style.visibility = "hidden";
        }
    }else{
        helpobj.style.visibility = "visible";
        helpobj.innerHTML = "<p  style=\"color: red;\">" + c + "</p>";
    }
}

function clickHistory(c){
    user_input.value = c;
    inputChanged();
}

function enterPressed(event) {
    // Check if the key is 'Enter'
    if (event.key === 'Enter') {
      // Do something
      submit();
    }
}

function doOperation(x, c, y) {
    switch (c) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '/':
            return x / y;
        case '%':
            return x % y;
        case '^':
            return Math.pow(x, y);
        default:
            showhelp("Wrong Operation Symbol Ocured");
    }
}

function isNum(c) {
    return (c == '.' || c == '0' || c == '1' || c == '2' || c == '3' || c == '4' || c == '5' || c == '6' || c == '7' || c == '8' || c == '9');
}

function isBrace(c) {
    if (c == '(' || c == ')')
        return true;
    return false;
}

function isOp(c) {
    return (c == '+' || c == '-' || c == '*' || c == '/' || c == '^' || c == '%')
}

function opPref(c) {
    switch (c) {
        case '^':
            return 6;
        case '/':
            return 4;
        case '%':
        case '*':
            return 3;
        case '+':
        case '-':
            return 1;
        case '(':
        case ')':
            return 0;
        default:
            showhelp("Wrong Operator Encountered.");
    }
}

function charToList(st) {
    let num = '';
    let infixList = [];
    let prev = null;
    let isNeg = 0;
    let c;
    for (let i = 0; i < st.length; i++) {
        c = st[i];
        if (isNum(c)) {
            num = num + c;
        } else if (isOp(c) || isBrace(c)) {
            if (num != "") {
                infixList.push(Number(num));
                num = "";
            }
            if (c == '-') {
                if (prev == null || isOp(prev) || prev == '(') {
                    num = num + c;
                } else {
                    infixList.push(c);
                }
            } else {
                infixList.push(c);
            }
        } else {
            showhelp("Wrong Character Encountered.");
            return null;
        }
        prev = c;
    }
    if (num != "") {
        infixList.push(Number(num));
        num = "";
    }
    return infixList;
}


function infixToPostfix(l) {
    let l1 = l;
    let postlist = [];
    let oplist = [];
    let len = l1.length;
    let i = 0;
    while (i < len) {
        let value = l1[i];
        if (typeof (value) == 'number') {
            postlist.push(value);
        } else {
            if (oplist.length == 0 || value == '(' || opPref(value) > opPref(oplist[oplist.length - 1])) {
                oplist.push(value);
            } else {
                if (value == ')') {
                    while (oplist.length != 0 && oplist[oplist.length - 1] != '(') {
                        postlist.push(oplist.pop());
                    }
                    if (oplist.length != 0 && oplist[oplist.length - 1] == '(') {
                        oplist.pop();
                    }
                } else {
                    while (oplist.length != 0 && opPref(value) <= opPref(oplist[oplist.length - 1])) {
                        postlist.push(oplist.pop());
                    }
                    oplist.push(value);
                }
            }
        }
        i = i + 1;
    }
    while (oplist.length != 0) {
        postlist.push(oplist.pop());
    }
    return postlist;
}


function evaluatePostfix(postfix) {
    const stack = [];

    for (let i = 0; i < postfix.length; i++) {
        const elem = postfix[i];

        if (typeof elem === 'number') {
            stack.push(elem);
        } else {
            const num2 = stack.pop();
            const num1 = stack.pop();
            stack.push(doOperation(num1, elem, num2));
        }
    }
    return stack[stack.length - 1];
}
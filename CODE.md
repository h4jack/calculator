# Infix to Postfix Expression Converter
This JavaScript code converts an infix expression to a postfix expression, which is useful for evaluating mathematical expressions in computer programs. This README aims to explain how the code works and how you can use it.
## How It Works
The conversion from infix to postfix expression is achieved using a stack data structure. Here's a step-by-step explanation of the process:
1. **Tokenization:** The input infix expression is split into individual tokens, which can be operands, operators, or parentheses.
2. **Conversion Algorithm:** The conversion algorithm iterates over each token in the infix expression and performs the following actions:
    - If the token is an operand, it is immediately added to the output postfix expression.
    - If the token is an operator:
        - If the stack is empty or the token has higher precedence than the top operator on the stack, the token is pushed onto the stack.
        - Otherwise, operators with equal or higher precedence are popped from the stack and added to the output until a lower precedence operator is encountered or the stack is empty. Then, the token is pushed onto the stack.
    - If the token is a left parenthesis, it is pushed onto the stack.
    - If the token is a right parenthesis, operators are popped from the stack and added to the output until a left parenthesis is encountered. The left parenthesis is then discarded.

3. **Finalization:** After processing all tokens, any remaining operators on the stack are popped and added to the output.
4. **Output:** The resulting postfix expression is obtained by concatenating all tokens in the output.
## Code Explanation
The JavaScript code provided consists of functions to perform infix to postfix conversion. Here's a brief overview of each function:

- **`charToList`:** Converts the input infix expression from a string to a list of individual characters and numbers.

- **`infixToPostfix`:** Converts the input infix expression to a postfix expression using the stack-based algorithm described above.

- **`evaluatePostfix`:** Evaluates the postfix expression and returns the result using a stack-based approach.

- **`doOperation`:** Performs arithmetic operations based on the given operator and operands.

- **`isNum`, `isBrace`, `isOp`, `opPref`:** Helper functions to identify whether a character is a number, parenthesis, operator, or its precedence.
## Usage
To use the code, follow these steps:

- Define your infix expression as a string.
- Call the infixToPostfix function with your infix expression as an argument.
- The function will return the corresponding postfix expression.
- If you want to evaluate the expression, pass the postfix expression to the evaluatePostfix function.

```javascript
const infixExpression = "(3 + 4) * 5 / (2 - 1)";
const postfixExpression = infixToPostfix(charToList(infixExpression));
console.log("Postfix Expression:", postfixExpression);
const result = evaluatePostfix(postfixExpression);
console.log("Result:", result);
```
## Authors

- [@h4jack](https://www.github.com/h4jack)


## Feedback

If you have any feedback, please reach out to us at [Not Available](#)
## Function Explanation
we are going to see every function that helps us to calculate the infix expressioin entered by user.
* `doOperation(x, c, y):` it takes three argument x, c, y c is the operator, like addition, sub, mult.., etc. and x and y are the two operand.
```javascript
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
```
* `isNum(c):` it takes a single char and checks if it is number or not that also include the `.` if not a single char and not a number it return false.
```javascript
function isNum(c) {
    return (c == '.' || c == '0' || c == '1' || c == '2' || c == '3' || c == '4' || c == '5' || c == '6' || c == '7' || c == '8' || c == '9');
}
```

* `isBrace(c):` it return false if charactor is not a paranthesis.
```javascript
function isBrace(c) {
    if (c == '(' || c == ')')
        return true;
    return false;
}
```

* `isOp(c):` it checks if char is not any type of operator then it return false, otherwise true.
```javascript
function isOp(c) {
    return (c == '+' || c == '-' || c == '*' || c == '/' || c == '^' || c == '%')
}
```

* `opPref(c):`it return the preferance of the operator as given in this function which is going to be used for stacking the expressioins.
```javascript
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
```

* `charToList(st):` it converts the chars/string to list which contain the operator and operator in different structure(e.g: box/bucket).
e.g: `st = "12*11+19/(2-3)` then `charToList(st) = [12, '*', 11, '+', 19, '/', '(', 2, '-', 3, ')']`
```javascript
function charToList(st) {
    let num = '';
    let infixList = [];
    let prev = null;
    // let isNeg = 0;
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
```

* `infixToPostfix(l):` it converts the infix expressioin to postfix. postfix is the form of expressioin which is calculated by computer, it is easy for preferance wise calculation. e.g: 

Our Infix Expression is:
12 * 11 + 19 / ( 2 - 3 )

The Postfix Version of the Expression is:
12 11 * 19 2 3 - / +

```javascript
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
```

* `evaluatePostfix(postfix):` it is going to evaluatePostfix the postfix version of infix which we just converted. e.g:

The Postfix Version of the Expression is: 12 11 * 19 2 3 - / +

After Evaluating the Value we get is :-> 12*11+19/(2-3) : 113.000
```javascript
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
```
function isOperator(arg) {
    return ['+', '-', '*', '/'].indexOf(arg) > -1;
};

function isDot(arg) {
    return '.' == arg;
};

function calculate(left, right, op) {
    switch (op) {
        case '+':
            return left + right;
        case '-':
            return left - right;
        case '*':
            return left * right;
        case '/':
            return right !== 0 ? left / right : Infinity;
    }
};

function leftSide(arr, index) {
    var value = "";
    for (; !isOperator(arr[index]); index++)
        value += arr[index];

    return { left: parseFloat(value), index };
};

function rightSide(arr, index) {
    var value = "";
    for (; index <= arr.length - 1; index++)
        value += arr[index];

    return { right: parseFloat(value), index };
};

var Calculator = {
    arr: ["0"],
    hasOperator: false
};

var { arr, hasOperator } = Calculator;

window.onload = () => {
    var buttons = document.getElementsByTagName('button');
    var screen = document.getElementById('screen');

    // init screen
    screen.value = arr.join("");

    // add styling
    // listener
    [...buttons].forEach((button) => {
        button.addEventListener('click', (event) => {
            const { target } = event;
            console.log("LISTENER");
            if (target.classList.contains('operator')) {
                console.log('OPERATOR: ' + target.value);

                if (target.value === '=' && !hasOperator){
                    screen.value = arr.join("");
                    hasOperator = false;
                    return;
                }

                if (!hasOperator) {
                    arr.push(target.value);
                    screen.value = arr.join("");
                    hasOperator = true;
                    return;
                } else {

                    var { left, index } = leftSide(arr, 0);
                    var operator = arr[index++];
                    var { right, index } = rightSide(arr, index);

                    if (isNaN(left) || isNaN(right)) return;

                    var result = calculate(left, right, operator);

                    console.log(`${left}${operator}${right} = ${result}`);

                    arr = [];
                    arr.push(result);
                    screen.value = arr.join("");
                    hasOperator = false;
                }
            }

            if (target.classList.contains('number')) {
                console.log('NUMBER: ' + target.value);
                if (arr.length == 1 && arr[0] == 0) {
                    arr.pop();
                }
                arr.push(target.value);
                screen.value = arr.join("");
            }

            if (target.classList.contains('dot')) {
                // if number or dot
                for (var i = arr.length; i >= 0; i--)
                    if (isDot(arr[i])) {
                        console.log('DOT NOT ADDED');
                        return;
                    } else if (isOperator(arr[i])) {
                        if (isNaN(arr[i + 1])) {
                            console.log('ZERO ADDED');
                            arr.push(0);
                        }

                        break;
                    }
                //arr.forEach(e => console.log(`num: ${e} isnan: ${isNaN(e)}`));
                arr.push('.');
                console.log('DOT ADDED');
                screen.value = arr.join("");
                return;
            }

            if (target.classList.contains('cancel-one')) {
                var last = arr[arr.length - 1];
                if (!isOperator(last)) {
                    arr.pop();
                    console.log("CLEAR NUM/DOT");
                } else {
                    arr.pop();
                    hasOperator = false;
                    console.log("CLEAR LAST OPERATOR");
                }

                if (typeof arr !== 'undefined' && arr.length == 0) {
                    arr.push(0);
                }

                screen.value = arr.join("");
            }

            if (target.classList.contains('cancel-all')) {
                console.clear();
                console.log("CLEAR ALL");
                arr = [];
                arr.push(0);
                hasOperator = false;
                screen.value = arr.join("");
            }

            console.log("******");
        })
    });
}
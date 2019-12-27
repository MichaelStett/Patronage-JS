var Calculator = {
    arr: ["0"],
    hasOperator: false
};

var { arr, hasOperator } = Calculator;

function isOperator(arg = '') {
    return ['+', '-', '*', '/', '='].indexOf(arg) > -1;
};

function isDot(arg = '') {
    return '.' == arg;
};

function isNumber(arg = 0) {
    return [...Array(10).keys()].indexOf(arg) > -1;
};

function calculate(left = 0, right = 0, op = '') {
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

function leftSide(arr = [""], index = 0) {
    let value = "";
    for (; !isOperator(arr[index]); index++)
        value += arr[index];

    return { left: parseFloat(value), index };
};

function rightSide(arr = [""], index = arr.length - 1) {
    let value = "";
    for (; index <= arr.length - 1; index++)
        value += arr[index];

    return { right: parseFloat(value), index };
};

function operatorEvent(screen, value) {
    if (value === '=' && !hasOperator) {
        screen.value = arr.join("");
        hasOperator = false;
        return;
    }

    if (!hasOperator) {
        arr.push(value);
        screen.value = arr.join("");
        hasOperator = true;
        return;
    }

    var { left, index } = leftSide(arr);
    var operator = arr[index++];
    var { right, index } = rightSide(arr, index);

    if (isNaN(left) || isNaN(right)) return;

    var result = calculate(left, right, operator);

    arr = [];
    arr.push(result);
    screen.value = arr.join("");
    hasOperator = false;
}

function dotEvent(screen) {
    for (var i = arr.length; i >= 0; i--) {
        if (isDot(arr[i])) {
            return;
        }

        if (isOperator(arr[i])) {
            if (isNaN(arr[i + 1]))
                arr.push(0);
            break;
        }
    }
    arr.push('.');
    screen.value = arr.join("");
    return;
}

function numberEvent(screen, value) {
    if (arr.length == 1 && arr[0] == 0) {
        arr.pop();
    }
    arr.push(value);
    screen.value = arr.join("");
}


function cancelOneEvent(screen) {
    let last = arr[arr.length - 1];
    if (!isOperator(last)) {
        for (var index = arr.length - 1; !isOperator(arr[index]) && index >= 0; index--) {
            arr.pop();
        }
    } else {
        arr.pop();
        hasOperator = false;
    }

    if (typeof arr !== 'undefined' && arr.length == 0) {
        arr.push(0);
    }

    screen.value = arr.join("");
}

function cancelAllEvent(screen) {
    console.clear();
    arr = [];
    arr.push(0);
    hasOperator = false;
    screen.value = arr.join("");
}


window.onload = () => {
    var screen = document.getElementById('screen');

    document.getElementById('calculator')
            .addEventListener('click', (event) => {
            let { target } = event;
            let { value } = target;
            if (target && target.id !== 'screen') {
                console.log("clicked: " + value);
                if (isOperator(value)) {
                    operatorEvent(screen, value);
                    return;
                }

                if (isDot(value)) {
                    dotEvent(screen);
                    return;
                }

                if (isNumber(Number(value))) {
                    numberEvent(screen, value);
                    return;
                }

                if (value === 'CE') {
                    cancelOneEvent(screen);
                    return;
                }

                if (value === 'C') {
                    cancelAllEvent(screen);
                    return;
                }
            }
        });

    screen.value = arr.join("");
}
function isOperator(arg) {
    switch (arg) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            return true;
        default:
            return false;
    }
};

function isDot(arg) {
    switch (arg) {
        case '.':
            return true;
        default:
            return false;
    }
};

function Calculate(left, right, op) {
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

function LeftSide(arr, index) {
    var value = "";
    for (; !isOperator(arr[index]); index++)
        value += arr[index];

    return { left: parseFloat(value), index };
};

function RightSide(arr, index) {
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

    // styles
    var groupClassList = ["", "col-sm"];
    var defaultClassList = ["", "mx-1", "mt-1", "btn", "btn-sm", "btn-block", "btn-outline", "active"];
    var operatorClassList = ["", "btn-info"];
    var numberClassList = ["", "btn-secondary"];
    var cancelClassList = ["", "btn-danger"];
    var inputClassList = ["", "ml-1", "mr-1", "col-sm", "text-right", "text-white", "bg-dark"];

    var calculatorClassList = ["", "container", "container-fluid"];
    var titleClassList = ["", "display-4"];

    // init screen
    screen.value = arr.join("");

    // add styling
    var calculator = document.getElementById('calculator');
    var title = document.getElementById('title');
    var buttonGroup = document.getElementsByClassName("btn-group");

    calculator.className += calculatorClassList.join(" ");
    title.className += titleClassList.join(" ");
    screen.className += inputClassList.join(" ");

    [...buttonGroup].forEach((group) => {
        group.className += groupClassList.join(" ");
    });

    [...buttons].forEach((button) => {
        button.className += defaultClassList.join(" ");
        button.value = button.textContent;

        if (button.classList.contains("number")) {
            button.className += numberClassList.join(" ");
        }

        if (button.classList.contains("dot")) {
            button.className += numberClassList.join(" ");
        }

        if (button.classList.contains("operator")) {
            button.className += operatorClassList.join(" ");
        }

        if (button.classList.contains("cancel")) {
            button.className += cancelClassList.join(" ");
        }
    });

    // listener
    [...buttons].forEach((button) => {
        button.addEventListener('click', (event) => {
            const { target } = event;
            console.log("LISTENER");
            if (target.classList.contains('operator')) {
                console.log('OPERATOR: ' + target.value);

                if (!hasOperator) {
                    arr.push(target.value);
                    screen.value = arr.join("");
                    hasOperator = true;
                    return;
                }

                arr.forEach(elem => {
                    if (isOperator(elem)) {
                        var { left, index } = LeftSide(arr, 0);
                        console.log(`Left: ` + left);
                        console.log(`Index: ` + index);

                        var operator = arr[index++];
                        console.log(`Operator: ` + operator);

                        var { right, index } = RightSide(arr, index);
                        console.log(`Right: ` + right);
                        console.log(`Index: ` + index);

                        var result = Calculate(left, right, operator);

                        console.log(`${left}${operator}${right} = ${result}`);

                        arr = [];
                        arr.push(result);
                        screen.value = arr.join(" ");
                        hasOperator = false;
                    }
                });
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

                screen.value = arr.join("");
            }

            arr.forEach(e => console.log("elem:" + e));

            console.log("******");
        })
    });
}
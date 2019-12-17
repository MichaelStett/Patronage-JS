window.onload = () => {
    class Buttons {
        constructor() {
            Buttons.style();
            Buttons.listen();
        }

        static handleOperator(op) {
            if (Calculator.hasOperator === false) {
                Calculator.operator = op;
                Calculator.hasOperator = true;
            } else {
                var result = Calculator.calculate();
                Calculator.hasOperator = false;
                Calculator.operator = null;
                Calculator.left = result;
                Calculator.right = 0;
                TextField.newState(result);
            }
        }

        static handleNumber(num) {
            if(TextField.state.includes(".")){
                TextField.state += num.toString();
            }
            else {
                if (Calculator.hasOperator === false) {
                    Calculator.left = parseFloat(Calculator.left.toString() + num.toString());
                    TextField.newState(Calculator.left);
                } else {
                    // if(Calculator.operator === "/" && num === 0 ){
                    //     console.error("MONKAS");
                    // }
                    Calculator.right = parseFloat(Calculator.right.toString() + num.toString());
                    TextField.newState(Calculator.right);
                }
            }
        }



        static handleDot() {
            if(!TextField.state.includes(".")){
                TextField.state += ".";
            }
        }

        static listen() {
            var buttons = document.getElementsByTagName('button');
            [...buttons].forEach((button) => {
                button.addEventListener('click', (event) => {
                    const { target } = event;

                    if (target.classList.contains('operator')) {
                        Buttons.handleOperator(target.value)
                    }

                    if (target.classList.contains('number')) {
                        Buttons.handleNumber(target.value);
                    }

                    if (target.classList.contains('dot')) {
                        Buttons.handleDot();
                    }

                    if (target.classList.contains('cancel-one')) {
                        TextField.clear();
                    }

                    if (target.classList.contains('cancel-all')) {
                        Calculator.reset(); // DONE
                    }

                    TextField.update();
                })
            });
        }

        static style() {
            var buttons = document.getElementsByTagName('button');
            var groupClassList = ["", "col-sm"];
            var defaultClassList = ["", "mx-1", "mt-1", "btn", "btn-sm", "btn-block", "btn-outline", "active"];
            var operatorClassList = ["", "btn-info"];
            var numberClassList = ["", "btn-secondary"];
            var cancelClassList = ["", "btn-danger"];

            var buttonGroup = document.getElementsByClassName("btn-group");

            [...buttonGroup].forEach((group) => {
                group.className += groupClassList.join(" ");
            });

            [...buttons].forEach((button) => {
                button.className += defaultClassList.join(" ");
                button.value = button.textContent;

                var buttonClassList = button.classList;

                if (buttonClassList.contains("number") || buttonClassList.contains("dot")) {
                    button.className += numberClassList.join(" ");
                }

                if (buttonClassList.contains("operator")) {
                    button.className += operatorClassList.join(" ");
                }

                if (buttonClassList.contains("cancel")) {
                    button.className += cancelClassList.join(" ");
                }
            });
        }
    }

    class TextField {
        static screen = document.getElementById('screen');
        static state = "0";
        static previousState = null;

        constructor() {
            TextField.style();
            TextField.reset();
        }


        static newState(value) {
            try {
                if (value > Math.pow(10, 12))
                    throw { "message": "Out Of Range" };

                TextField.previousState = TextField.state;
                TextField.state = value.toString();
            } catch (e) {
                console.error(e.message);
                Calculator.reset();
            }
        }

        static update() {
            TextField.screen.value = TextField.state;
            console.log("Now: " + TextField.state);
            console.log("Prev: " + TextField.previousState);
            console.log("Left: " + Calculator.left);
            console.log("Right: " + Calculator.right);
        }

        static style() {
            var classList = ["", "col-sm", "text-right", "text-white", "bg-dark"];
            TextField.screen.className += classList.join(" ");
        }

        static clear() {
            TextField.state = TextField.previousState;
            TextField.previousState = null;
        }

        static reset() {
            TextField.state = "0";
            TextField.previousState = null;
            TextField.update();
        }
    }


    class Calculator {
        static left = 0;
        static right = 0;
        static operator = null;
        static hasOperator = false;
        static lastInput = null;

        constructor() {
            Calculator.style();
            Calculator.reset();
        }

        static style() {
            var calculatorClassList = ["", "container", "container-fluid"];
            var titleClassList = ["", "display-4"];
            var calculator = document.getElementById('calculator');

            calculator.className += calculatorClassList.join(" ");

            var title = document.getElementById('title');
            title.className += titleClassList.join(" ");
        }

        static reset() {
            Calculator.left = 0;
            Calculator.right = 0;
            Calculator.operator = null;
            Calculator.hasOperator = false;
            Calculator.lastInput = null;
            TextField.reset();
        }

        static calculate = () => {
            switch (Calculator.operator) {
                case '+':
                    return Calculator.left + Calculator.right;
                case '-':
                    return Calculator.left - Calculator.right;
                case '*':
                    return Calculator.left * Calculator.right;
                case '/':
                    return Calculator.left / Calculator.right;
                case '=':
                    return Calculator.right;
            }
        }
    }

    new Calculator();
    new Buttons();
    new TextField();
}
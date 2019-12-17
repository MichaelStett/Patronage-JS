window.onload = () => {
    class Buttons {
        constructor() {
            var buttonGroup = document.getElementsByClassName("btn-group");

            var groupClassList = ["", "col-sm"];

            [...buttonGroup].forEach((group) => {
                group.className += groupClassList.join(" ");
            })

            var buttons = document.getElementsByTagName('button');

            var defaultClassList = ["", "mt-0", "btn-outline", "btn", "btn-sm", "btn-block"];
            var operatorClassList = ["", "btn-primary"];
            var numberClassList = ["", "btn-secondary"];
            var cancelClassList = ["", "btn-danger"];

            [...buttons].forEach((button) => {
                button.className += defaultClassList.join(" ");
                button.value = button.textContent;

                var buttonClassList = button.classList;
                if (buttonClassList.contains("number", "dot")) {
                    button.className += numberClassList.join(" ");
                }

                if (buttonClassList.contains("operator")) {
                    button.className += operatorClassList.join(" ");
                }

                if (buttonClassList.contains("cancel")) {
                    button.className += cancelClassList.join(" ");
                }
            })
        }
    }

    class Calculator {
        constructor() {
            this.name = "Calculator App";
            new Buttons();
        }

    }

    new Calculator();
}
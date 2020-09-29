window.onload = function() {
    var resultField = document.getElementsByClassName("result")[0];

    var deleteBtn = document.getElementsByClassName("delete-all")[0];
    var resultBtn = document.getElementsByClassName("get-result")[0];
    var digitBtns = document.getElementsByClassName("digit");
    var operationBtns = document.getElementsByClassName("operation");

    var result = 0;
    var firstNumber = 0;
    var secondNumber = 0;
    var operator = '';
    var expression = "";

    function updateExpression() {
        if (operator == '') {
            expression = firstNumber;
        } else {
            expression = firstNumber + " " + operator + " " + secondNumber;
        }
    }

    function updateResultField() {
        resultField.innerText = expression;
    }

    deleteBtn.addEventListener("click", () => {
        result = 0;
        firstNumber = 0;
        secondNumber = 0;
        operator = '';
        expression = "";
        updateResultField();
    })

    resultBtn.addEventListener("click", () => {
        if (operator == '')
            return 0;
        switch (operator) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case '*':
                result = firstNumber * secondNumber;
                break;
            case '/':
                if (secondNumber == 0)
                    alert("Маму свою на ноль подели");
                else
                    result = firstNumber / secondNumber;
                break;
        }
        operator = '';
        firstNumber = result;
        secondNumber = 0;
        updateExpression();
        updateResultField();
    })
    
    for (let btn of digitBtns) {
        btn.addEventListener("click", () => {
            if (operator == '') {
                firstNumber *= 10;
                firstNumber += parseInt(btn.innerText);
            } else {
                secondNumber *= 10;
                secondNumber += parseInt(btn.innerText);
            }
            updateExpression();
            updateResultField();
        })
    }

    for (let btn of operationBtns) {
        btn.addEventListener("click", () => {
            operator = btn.innerText;
            updateExpression();
            updateResultField();
        })
    }
}


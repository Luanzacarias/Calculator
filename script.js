const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const toggleSignalButton = document.querySelector('[data-toggle-signal]');
const percentageButoon = document.querySelector('[data-percentage]');
const previusOperandTextElement = document.querySelector('[data-previus]');
const currentOperandTextElement = document.querySelector('[data-current]');

class Calculator {
    constructor(previusOperandTextElement, currentOperandTextElement){
        this.previusOperandTextElement = previusOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }
    clear() {
        this.currentOperand = '';
        this.previusOperand = '';
        this.operation = undefined;
    }

    formatDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;
        if (isNaN(integerDigits)){
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                // não está forçando usar parte decinal já que já foi separada anteriormente
                maximumFractionDigits: 0,
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }else{
            return integerDisplay;

        }
    }

    updateDisplay() {
        this.previusOperandTextElement.innerText = `${this.formatDisplayNumber(this.previusOperand)} ${this.operation || ''}`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
    }

    appendNumber(number){
        if (this.currentOperand.includes('.') && number === '.') return
        if (this.currentOperand.length === 12) return
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previusOperand !== ''){
            this.calculate()
        }

        this.operation = operation;

        this.previusOperand = this.currentOperand;
        this.currentOperand = '';
    }

    toggleSinal(){
        if(this.currentOperand == 0) return;
        this.currentOperand = this.currentOperand * (-1)
    }

    percentage(){
        if(this.previusOperand == 0 || this.currentOperand == 0) return;
        let result;
        result = (this.previusOperand * this.currentOperand)/100;
        this.currentOperand = result;
    }

    calculate() {
        let result;

        const previusOperandFloat = parseFloat(this.previusOperand);
        const currentOperandFloat = parseFloat(this.currentOperand);
 
        if (isNaN(currentOperandFloat) || isNaN(previusOperandFloat)) return

        switch (this.operation) {
            case '+':
                result = previusOperandFloat + currentOperandFloat;
                break;
            case '-':
                result = previusOperandFloat - currentOperandFloat;
                break;
            case 'x':
                result = previusOperandFloat * currentOperandFloat;
                break;
            case '÷':
                result = previusOperandFloat / currentOperandFloat;
                break;
            default:
                return;
        }
        result = Math.floor(result * 1000) / 1000;

        this.currentOperand = result;
        this.operation = undefined;
        this.previusOperand = '';

    }

}

const calculator = new Calculator(previusOperandTextElement, currentOperandTextElement);

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

for (const numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerHTML);
        calculator.updateDisplay();
    })
}

for (const operationButton of operationButtons) {
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    })
}
equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})
toggleSignalButton.addEventListener('click', () => {
    calculator.toggleSinal();
    calculator.updateDisplay();
})
percentageButoon.addEventListener('click', () => {
    calculator.percentage();
    calculator.updateDisplay();
})
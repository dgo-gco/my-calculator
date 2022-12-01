class Calculator {
  constructor(previousDisplayedNumber, currentDisplayedNumber){
    //the this element will represent the ibject created by our constructor function
    this.previousDisplayedNumber = previousDisplayedNumber;
    this.currentDisplayedNumber = currentDisplayedNumber;
    //The previouDisp... parameter will pass the value to the = previouDisp..., 
    //and assign it as a value because the way we assign a value to an object is with this.parameter/name 
    this.clear();//we want to clear it once we open it *starts cleared
  }

  clear() {
    //everything is empty as soon as we click AC to clear everything
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    //.toSlice to get te very last digit
  }

  appendNumber(number){
    //if we type . and we already have one, we return and prevents from add another
    if (number === '.' && this.currentOperand.includes('.')) return
    //we stringify this.currentOperand and number otherwise JS will add them not append them
    this.currentOperand = this.currentOperand.toString() + number.toString();
    //currentOperand equals the NUMBER CLICKED as our forEach button appends our variable number
  }

  chooseOperator(operation){
    if (this.currentOperand === '') return //prevent from adding more operators if we're waiting for the new operand

    if (this.previousOperand !== ''){
      this.compute()
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand; //When we click an operator means we've finished the current number
    //and we start again
    this.currentOperand = '';
  }

  compute() {
    let computation; //result of this function
    const previous = parseFloat(this.previousOperand);//with parse we conver our string to NUMBER
    const current = parseFloat(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) return //if user doesnt add a value we dont want the equals to run
    switch (this.operation) {
      case '+': 
      computation = previous + current;
      break;
      case '-': 
      computation = previous - current;
      break;
      case 'x': 
      computation = previous * current;
      break;
      case '÷': 
      computation = previous / current;
      break;
      default:
        return
    }
    this.currentOperand = computation; //to showcase the result
    this.operation = undefined;
    this.previousOperand = ''; //so we can restart
  }

  getDisplayNumber(number){
    const stringNumber = number.toString();//stringify the number
    const integerDigits = parseFloat(stringNumber.split('.')[0]);//take our string, convert it into an array.
    //We define this as the first part with the[0] = integer Number
    const decimalDigits = stringNumber.split('.')[1];//after [1] the point, we got decimlas
    let integerDisplay;
    if (isNaN(integerDigits)){//if it's not a number
      integerDisplay = '';//it's empty
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {//our INTEGER follow English rules (1,000,000 = COMMAS)
        maximumFractionDigits: 0});//there can never be any decimal places after IntegerDigits-There cannot be "fractions of decimals"
    }
    if (decimalDigits != null){//if the user actualle entered a . we'll return the following:
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;//if user doesn't click . we show INTEGERS
    }
  }

  updateDisplay(){
    //this will show the number in the 'screen'
    this.currentDisplayedNumber.innerText = 
    this.getDisplayNumber(this.currentOperand); 
    if(this.operation != null){
      this.previousDisplayedNumber.innerText = 
      `${this.previousOperand} ${this.operation}`; 
    } else {
      this.previousDisplayedNumber.innerText = '';
    }
    
  }
}

const number = document.querySelectorAll('.number');

const operationsBtns = document.querySelectorAll('[data-operator]');
const acBtn = document.querySelector('#ac-btn');
const delBtn = document.querySelector('#del-btn');
const equalsBtn = document.querySelector('#equals-btn');

const previousDisplayedNumber = document.querySelector('.prev-operand');
const currentDisplayedNumber = document.querySelector('.current-operand');

const calculator = new Calculator(previousDisplayedNumber, currentDisplayedNumber);

number.forEach(button =>{
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationsBtns.forEach(button =>{
  button.addEventListener('click', () => {
    calculator.chooseOperator(button.innerText);
    calculator.updateDisplay();
  })
})

equalsBtn.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

acBtn.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

delBtn.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})

//recongnize im clicking a number 
//if an operation button is clicked, clear the number so we can use another one.


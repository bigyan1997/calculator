const displayBox = document.querySelector(".display-box");
const calculatorBtns = document.querySelectorAll("button");

// Variale to store display value
let displayValue = "";
let lastOperator = "";
console.log("calculatorBtns", calculatorBtns);

// Onclick  event listeners
calculatorBtns.forEach((btn) => {
  const buttonValue = btn.innerText;

  btn.onclick = () => {
    handleButtonAction(buttonValue);
  };
});

// onkeypress event listener | to make calc work with keyvboard as well
document.addEventListener("keypress", (event) => {
  console.log("event", event.key);

  if (event.code.includes("Key")) {
    return;
  }

  handleButtonAction(event.key);
});

// Function to display
const display = () => {
  displayBox.innerText = displayValue || "0.0";
};

const handleButtonAction = (buttonValue) => {
  // Handle action for = button i.e calculate instead of displaying it
  if (buttonValue === "=" || buttonValue === "Enter") {
    const result = eval(displayValue);
    displayValue = String(result);

    // update the last operator in the expression
    lastOperator = "";

    display();

    return;
  }

  // Handle action for AC [all clear] button
  if (buttonValue === "AC") {
    displayValue = "";
    display();

    return;
  }

  // Handle action for C [clear] button
  if (buttonValue === "C") {
    // goal is to remove last character from displayValue string
    displayValue = displayValue.slice(0, -1);
    display();

    return;
  }

  // Making sure we have only valid expression for eval
  // 1. Same operators are not allowed in the beginning of numbers
  if (["%", "/", "*", "+"].includes(buttonValue)) {
    if (!displayValue || displayValue === "-") {
      return;
    }
  }

  // 2. Don't allow 2 consecutive operators
  if (["%", "/", "*", "+", "-"].includes(buttonValue)) {
    const lastCharacter = displayValue.slice(-1);

    // update the last operator in the expression
    lastOperator = buttonValue;

    if (["%", "/", "*", "+", "-"].includes(lastCharacter)) {
      // removing last character from display value | expression
      displayValue = displayValue.slice(0, -1);
    }
  }

  // Making sure decimal expressions are correct
  if (buttonValue === ".") {
    // find the current number set, i.e number after the operator
    const lastOperatorIndex = displayValue.lastIndexOf(lastOperator);
    const currentNumberSet =
      displayValue.slice(lastOperatorIndex) || displayValue;
    console.log("currentNumberSet", currentNumberSet);

    if (currentNumberSet.includes(".")) {
      return;
    }
  }

  // Displaying the operation
  displayValue = displayValue + buttonValue;
  display();
};

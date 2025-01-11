// Step 1 - Display all the button text (required in display box)
const displayBox = document.querySelector(".display-box");
const calculatorBtns = document.querySelectorAll("button");

// Audio file
const prankAudio = new Audio("./aa.wav");

// Variable to store display value
let displayValue = "";
let lastOperator = "";

// Attach click event to each button
calculatorBtns.forEach((btn) => {
  const buttonValue = btn.innerText;
  btn.onclick = () => {
    handleButtonAction(buttonValue);
  };
});

//onKeypress event listeners | to mak ecalc work with keyboard as well
document.addEventListener("keypress", (event) => {
  console.log("event", event.key);

  if (event.code.includes("key")) {
    return;
  }
  handleButtonAction(event.key);
});

// Function to update the display
const display = (value) => {
  displayBox.innerText = value || 0.0;
};

// Function to handle button actions
const handleButtonAction = (buttonValue) => {
  displayBox.classList.remove("prank");

  // Handle "=" button for calculation
  if (buttonValue === "=") {
    try {
      const result = eval(displayValue); // Evaluate the expression
      displayValue = String(result);
      lastOperator = ""; // Reset last operator

      // Prank logic
      const prankValue = generateRandomNumber();
      if (prankValue) {
        displayBox.classList.add("prank");
        prankAudio.play();
      }

      display(displayValue); // Display the result
    } catch (e) {
      display("Error");
      displayValue = "";
    }
    return;
  }

  // Clear all when "AC" is clicked
  if (buttonValue === "AC") {
    displayValue = "";
    display();
    return;
  }

  // Remove last character when "C" is clicked
  if (buttonValue === "C") {
    displayValue = displayValue.slice(0, -1);
    display(displayValue);
    return;
  }

  // Prevent invalid operators at the beginning
  if (["%", "*", "/"].includes(buttonValue) && !displayValue) {
    return;
  }

  // Prevent consecutive operators (e.g., "+*" or "--")
  if (["+", "-", "*", "/", "%"].includes(buttonValue)) {
    const lastChar = displayValue.slice(-1);
    lastOperator = buttonValue; // Update the last operator
    if (["+", "-", "*", "/", "%"].includes(lastChar)) {
      displayValue = displayValue.slice(0, -1); // Remove the last operator
    }
  }

  // Ensure proper decimal handling
  if (buttonValue === ".") {
    const lastOperatorIndex = displayValue.lastIndexOf(lastOperator);
    const currentNumberSet = displayValue.slice(lastOperatorIndex + 1);

    // Prevent multiple decimals in the current number
    if (currentNumberSet.includes(".")) {
      return;
    }
  }

  // Update the display value and show it
  displayValue += buttonValue;
  display(displayValue);
};

// Function to generate random number for prank
const generateRandomNumber = () => {
  const randomNumber = Math.round(Math.random() * 10);
  return randomNumber <= 3 ? randomNumber : 0;
};

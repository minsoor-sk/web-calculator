# user-interaction Specification

## Purpose
TBD - created by archiving change build-web-calculator. Update Purpose after archive.
## Requirements
### Requirement: Number Input
The calculator MUST allow users to input numbers by clicking numeric buttons.

#### Scenario: Enter single digit number
**Given** the calculator displays "0"
**When** the user clicks the "5" button
**Then** the display shows "5"

#### Scenario: Enter multi-digit number
**Given** the calculator displays "0"
**When** the user clicks "1", "2", "3" in sequence
**Then** the display shows "123"

#### Scenario: Leading zeros are handled
**Given** the calculator displays "0"
**When** the user clicks "0", "0", "5"
**Then** the display shows "5"
**And** leading zeros are not shown

#### Scenario: Zero can be entered
**Given** the calculator displays "0"
**When** the user clicks "5", "0"
**Then** the display shows "50"

---

### Requirement: Decimal Point Input
The calculator MUST allow users to enter decimal numbers using the decimal point button.

#### Scenario: Enter decimal number
**Given** the calculator displays "0"
**When** the user clicks "3", ".", "1", "4"
**Then** the display shows "3.14"

#### Scenario: Start number with decimal point
**Given** the calculator displays "0"
**When** the user clicks ".", "5"
**Then** the display shows "0.5"

#### Scenario: Multiple decimal points are prevented
**Given** the calculator displays "3.14"
**When** the user clicks the "." button again
**Then** the display remains "3.14"
**And** the second decimal point is ignored

#### Scenario: Decimal point resets after operation
**Given** the user has entered "3.14"
**And** completed a calculation
**When** the user clicks ".", "5"
**Then** the display shows "0.5"
**And** a new number entry has started

---

### Requirement: Operator Selection
The calculator MUST allow users to select an arithmetic operator by clicking operator buttons.

#### Scenario: Select operator after entering number
**Given** the user has entered "5"
**When** the user clicks the "+" button
**Then** the operator is stored
**And** the calculator is ready for the second number
**And** the display still shows "5"

#### Scenario: Operator button provides visual feedback
**Given** the calculator is ready for operator input
**When** the user clicks an operator button
**Then** the button shows visual feedback (hover/active state)

#### Scenario: Change operator before entering second number
**Given** the user has entered "5" and clicked "+"
**When** the user clicks "×" before entering any number
**Then** the operator is changed from "+" to "×"
**And** no calculation is performed yet

---

### Requirement: Equals Button
The calculator MUST perform the calculation and show results when the equals button is clicked.

#### Scenario: Equals calculates and displays result
**Given** the user has entered "7 + 3"
**When** the user clicks the "=" button
**Then** the display shows "10"
**And** the calculator is ready for a new calculation

#### Scenario: Equals with no operator does nothing
**Given** the user has only entered "5"
**When** the user clicks the "=" button
**Then** the display still shows "5"
**And** no error occurs

#### Scenario: Result can be used in next calculation
**Given** the user has calculated "5 + 3 = 8"
**When** the user clicks "×"
**And** the user enters "2"
**And** the user clicks "="
**Then** the display shows "16"

---

### Requirement: Clear Functionality
The calculator MUST provide a clear button that resets the calculator to its initial state.

#### Scenario: Clear button resets display
**Given** the user has entered "123"
**When** the user clicks the "C" button
**Then** the display shows "0"

#### Scenario: Clear button resets stored operation
**Given** the user has entered "5 + 3"
**When** the user clicks the "C" button
**Then** the display shows "0"
**And** all stored operands and operators are cleared
**And** the calculator is in the initial state

#### Scenario: Clear after error resets calculator
**Given** the calculator displays "Error" (from division by zero)
**When** the user clicks the "C" button
**Then** the display shows "0"
**And** the calculator is ready for new input

#### Scenario: Clear is always accessible
**Given** the calculator is in any state
**When** the user clicks the "C" button
**Then** the calculator resets to initial state
**And** no errors occur

---

### Requirement: Button Click Feedback
All calculator buttons MUST provide clear visual feedback when interacted with.

#### Scenario: Button shows hover state
**Given** the calculator is rendered
**When** the user moves the mouse over any button
**Then** the button shows a hover state (color or brightness change)

#### Scenario: Button shows active state on click
**Given** the calculator is rendered
**When** the user clicks any button
**Then** the button briefly shows an active/pressed state
**And** returns to normal state after release

#### Scenario: Button feedback is immediate
**Given** the calculator is rendered
**When** the user clicks any button
**Then** the visual feedback appears within 100ms
**And** the corresponding action is executed

---

### Requirement: Input State Management
The calculator MUST properly manage input state to provide intuitive user experience.

#### Scenario: New number after equals clears previous result
**Given** the user has calculated "5 + 3 = 8"
**When** the user clicks any number button (e.g., "2")
**Then** the display shows "2"
**And** a new calculation has started

#### Scenario: Operator after equals uses previous result
**Given** the user has calculated "5 + 3 = 8"
**When** the user clicks an operator (e.g., "×")
**And** the user enters "2"
**And** the user clicks "="
**Then** the display shows "16"
**And** the previous result (8) was used as the first operand

#### Scenario: Consecutive equals repeats last operation
**Given** the user has calculated "10 - 2 = 8"
**When** the user clicks "=" again
**Then** the display shows "6" (8 - 2)
**When** the user clicks "=" again
**Then** the display shows "4" (6 - 2)


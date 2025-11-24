# arithmetic-operations Specification

## Purpose
TBD - created by archiving change build-web-calculator. Update Purpose after archive.
## Requirements
### Requirement: Addition Operation
The calculator MUST correctly perform addition of two numbers.

#### Scenario: Add two positive integers
**Given** the user has entered "5"
**When** the user clicks the "+" operator
**And** the user enters "3"
**And** the user clicks "="
**Then** the display shows "8"

#### Scenario: Add decimal numbers
**Given** the user has entered "2.5"
**When** the user clicks the "+" operator
**And** the user enters "1.7"
**And** the user clicks "="
**Then** the display shows "4.2"

#### Scenario: Add negative result numbers
**Given** the user has calculated "-5" (through a previous operation)
**When** the user clicks the "+" operator
**And** the user enters "3"
**And** the user clicks "="
**Then** the display shows "-2"

---

### Requirement: Subtraction Operation
The calculator MUST correctly perform subtraction of two numbers.

#### Scenario: Subtract two positive integers
**Given** the user has entered "10"
**When** the user clicks the "-" operator
**And** the user enters "3"
**And** the user clicks "="
**Then** the display shows "7"

#### Scenario: Subtract resulting in negative number
**Given** the user has entered "3"
**When** the user clicks the "-" operator
**And** the user enters "10"
**And** the user clicks "="
**Then** the display shows "-7"

#### Scenario: Subtract decimal numbers
**Given** the user has entered "5.5"
**When** the user clicks the "-" operator
**And** the user enters "2.3"
**And** the user clicks "="
**Then** the display shows "3.2"

---

### Requirement: Multiplication Operation
The calculator MUST correctly perform multiplication of two numbers.

#### Scenario: Multiply two positive integers
**Given** the user has entered "6"
**When** the user clicks the "×" operator
**And** the user enters "7"
**And** the user clicks "="
**Then** the display shows "42"

#### Scenario: Multiply by zero
**Given** the user has entered "15"
**When** the user clicks the "×" operator
**And** the user enters "0"
**And** the user clicks "="
**Then** the display shows "0"

#### Scenario: Multiply decimal numbers
**Given** the user has entered "2.5"
**When** the user clicks the "×" operator
**And** the user enters "4"
**And** the user clicks "="
**Then** the display shows "10"

#### Scenario: Multiply negative numbers
**Given** the user has a result of "-3"
**When** the user clicks the "×" operator
**And** the user enters "4"
**And** the user clicks "="
**Then** the display shows "-12"

---

### Requirement: Division Operation
The calculator MUST correctly perform division of two numbers.

#### Scenario: Divide two positive integers with whole result
**Given** the user has entered "20"
**When** the user clicks the "÷" operator
**And** the user enters "5"
**And** the user clicks "="
**Then** the display shows "4"

#### Scenario: Divide resulting in decimal
**Given** the user has entered "10"
**When** the user clicks the "÷" operator
**And** the user enters "4"
**And** the user clicks "="
**Then** the display shows "2.5"

#### Scenario: Divide by zero shows error
**Given** the user has entered "10"
**When** the user clicks the "÷" operator
**And** the user enters "0"
**And** the user clicks "="
**Then** the display shows "Error"
**And** the calculator resets to initial state on next number input

#### Scenario: Divide decimal numbers
**Given** the user has entered "7.5"
**When** the user clicks the "÷" operator
**And** the user enters "2.5"
**And** the user clicks "="
**Then** the display shows "3"

---

### Requirement: Operation Chaining
The calculator MUST support chaining multiple operations without explicitly pressing equals between them.

#### Scenario: Chain addition operations
**Given** the user has entered "2"
**When** the user clicks "+"
**And** the user enters "3"
**And** the user clicks "+"
**Then** the display shows "5" (intermediate result)
**When** the user enters "4"
**And** the user clicks "="
**Then** the display shows "9"

#### Scenario: Chain mixed operations
**Given** the user has entered "10"
**When** the user clicks "+"
**And** the user enters "5"
**And** the user clicks "-"
**Then** the display shows "15" (intermediate result)
**When** the user enters "3"
**And** the user clicks "="
**Then** the display shows "12"

#### Scenario: Change operator before entering second operand
**Given** the user has entered "5"
**When** the user clicks "+"
**And** the user immediately clicks "×"
**And** the user enters "3"
**And** the user clicks "="
**Then** the display shows "15"
**And** the addition operation is replaced by multiplication

---

### Requirement: Floating Point Precision
The calculator MUST handle floating-point arithmetic with reasonable precision for typical use cases.

#### Scenario: Display rounds long decimal results
**Given** the user performs a calculation that results in a long decimal
**When** the result is displayed
**Then** the result is rounded to a maximum of 8 decimal places
**And** trailing zeros are removed where appropriate

#### Scenario: Handle common precision issues
**Given** the user calculates "0.1 + 0.2"
**When** the result is displayed
**Then** the display shows "0.3" (not "0.30000000000000004")


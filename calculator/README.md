# Web Calculator

A simple, elegant web-based calculator with a dark mode interface built with pure HTML, CSS, and JavaScript.

## Features

- **Basic Arithmetic Operations**: Addition (+), Subtraction (-), Multiplication (×), Division (÷)
- **Decimal Support**: Full support for decimal numbers
- **Operation Chaining**: Perform multiple calculations in sequence (e.g., 2 + 3 + 4)
- **Error Handling**: Gracefully handles division by zero
- **Dark Mode UI**: Eye-friendly dark theme with modern design
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **No Dependencies**: Pure vanilla JavaScript - no frameworks required

## Architecture

The calculator follows a simple three-layer architecture with clear separation of concerns:

```mermaid
graph TD
    User([User]) -->|Clicks buttons| HTML[HTML Structure<br/>index.html]
    HTML -->|DOM Events| JS[JavaScript Logic<br/>calculator.js]
    JS -->|Updates display| HTML
    CSS[CSS Styles<br/>styles.css] -.->|Styles| HTML

    style HTML fill:#9370DB
    style CSS fill:#9370DB
    style JS fill:#9370DB
    style User fill:#87CEEB
```

**Component Roles**:
- **HTML**: Defines the calculator structure and layout
- **CSS**: Provides dark mode styling using CSS Grid
- **JavaScript**: Handles all calculation logic and state management

## Usage

### Getting Started

1. Open `index.html` in any modern web browser
2. The calculator will load instantly - no installation or build process required

### Basic Operations

1. **Enter numbers**: Click numeric buttons (0-9)
2. **Decimal numbers**: Click the "." button to add a decimal point
3. **Perform calculations**:
   - Click a number
   - Click an operator (+, -, ×, ÷)
   - Click another number
   - Click "=" to see the result
4. **Clear**: Click "C" to reset the calculator

### Advanced Features

**Operation Chaining**:
- After clicking an operator following a calculation, the result is used as the first operand
- Example: `5 + 3 [+]` → displays `8`, then continue with `8 + 2 [=]` → `10`

**Repeat Operations**:
- Press "=" multiple times to repeat the last operation
- Example: `10 - 2 [=]` → `8`, press `[=]` again → `6` (subtracts 2 again)

### User Interaction Flow

The following flowchart illustrates how user interactions are processed:

```mermaid
flowchart TD
    Start([User Opens Calculator]) --> Display[Display shows '0']
    Display --> Input{User Input Type?}

    Input -->|Number| CheckWaiting{Waiting for<br/>second operand?}
    CheckWaiting -->|Yes| NewNumber[Start new number]
    CheckWaiting -->|No| AppendNumber[Append to display]
    NewNumber --> UpdateDisplay[Update Display]
    AppendNumber --> UpdateDisplay

    Input -->|Decimal| CheckDecimal{Display has<br/>decimal?}
    CheckDecimal -->|No| AddDecimal[Add decimal point]
    CheckDecimal -->|Yes| Ignore[Ignore input]
    AddDecimal --> UpdateDisplay
    Ignore --> Input

    Input -->|Operator| CheckFirst{First operand<br/>exists?}
    CheckFirst -->|No| StoreFirst[Store as first operand]
    CheckFirst -->|Yes| Calculate1[Calculate intermediate result]
    Calculate1 --> ShowResult1[Display result]
    ShowResult1 --> StoreFirst
    StoreFirst --> WaitSecond[Wait for second operand]
    WaitSecond --> Input

    Input -->|Equals| CheckOperator{Has operator?}
    CheckOperator -->|Yes| Calculate2[Perform calculation]
    CheckOperator -->|No| Input
    Calculate2 --> CheckZero{Division<br/>by zero?}
    CheckZero -->|Yes| ShowError[Display 'Error']
    CheckZero -->|No| ShowResult2[Display result]
    ShowError --> Input
    ShowResult2 --> Input

    Input -->|Clear| Reset[Reset all state]
    Reset --> Display

    style Start fill:#87CEEB
    style Display fill:#90EE90
    style ShowError fill:#FFB6C6
    style ShowResult1 fill:#90EE90
    style ShowResult2 fill:#90EE90
    style UpdateDisplay fill:#90EE90
```

## Browser Compatibility

This calculator works in all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## File Structure

The project consists of four main files with clear dependencies:

```mermaid
graph LR
    HTML[index.html<br/>Structure] -->|link| CSS[styles.css<br/>Dark Mode Styles]
    HTML -->|script| JS[calculator.js<br/>Calculator Logic]
    JS -->|DOM query| Display[Display Element]
    JS -->|Event delegation| Buttons[Button Container]
    HTML -.->|contains| Display
    HTML -.->|contains| Buttons

    style HTML fill:#9370DB
    style CSS fill:#9370DB
    style JS fill:#9370DB
    style Display fill:#FFE4B5
    style Buttons fill:#FFE4B5
```

**File Descriptions**:
- `index.html` - Main HTML structure with calculator layout
- `styles.css` - Dark mode styling and responsive grid layout
- `calculator.js` - Calculator logic and state management
- `README.md` - This documentation file

## Implementation Details

### State Management

The calculator maintains the following state variables:

```mermaid
stateDiagram-v2
    [*] --> Initial: Load

    Initial --> EnteringNumber: Number clicked
    EnteringNumber --> WaitingForSecond: Operator clicked

    WaitingForSecond --> EnteringSecond: Number clicked
    EnteringSecond --> DisplayingResult: Equals clicked
    EnteringSecond --> WaitingForSecond: Operator clicked

    DisplayingResult --> EnteringNumber: Number clicked
    DisplayingResult --> WaitingForSecond: Operator clicked

    EnteringNumber --> Initial: Clear clicked
    WaitingForSecond --> Initial: Clear clicked
    EnteringSecond --> Initial: Clear clicked
    DisplayingResult --> Initial: Clear clicked

    note right of Initial
        currentDisplay = "0"
        firstOperand = null
        operator = null
    end note
```

**State Variables**:
- `currentDisplay`: Current number shown on screen
- `firstOperand`: First number in a calculation
- `operator`: Selected operator (+, -, ×, ÷)
- `waitingForSecondOperand`: Flag indicating if waiting for second number

### Precision Handling
- Results are rounded to 8 decimal places to handle floating-point precision issues
- Very large numbers (> 999,999,999,999) are displayed in scientific notation
- Common precision issues like `0.1 + 0.2` are handled correctly

### Error Handling
- **Division by zero**: Displays "Error" and resets on next input
- **Invalid states**: Automatically recovers from error states

## Known Limitations

The following features are currently not supported:
- Keyboard input (mouse/touch only)
- Advanced mathematical functions (trigonometry, logarithms, etc.)
- Calculation history
- Memory functions (M+, M-, MR, MC)
- Unit conversion
- Binary/hexadecimal operations

## Development

No build process or dependencies required. Simply edit the files and refresh your browser.

### Testing Checklist

- [x] Basic operations (+, -, ×, ÷)
- [x] Decimal number input
- [x] Operation chaining
- [x] Division by zero handling
- [x] Repeated equals functionality
- [x] Clear button resets state
- [x] Responsive design on different screen sizes
- [x] Visual feedback on button clicks

## License

This project is open source and available for any use.

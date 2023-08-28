import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lhc-easy-path-expression-help',
  templateUrl: './easy-path-expression-help.component.html',
  styleUrls: ['./easy-path-expression-help.component.css']
})
export class EasyPathExpressionHelpComponent {
  @Input() display = false;
  @Input() variables;
  @Output() onCloseModal = new EventEmitter();

  constructor(private liveAnnouncer: LiveAnnouncer) {}

  arrow_arr = ["arrow right", "arrow down"];
  help_arrow_vars = this.arrow_arr[0];
  help_arrow_ops = this.arrow_arr[0];
  help_arrow_funcs = this.arrow_arr[0];

  usableOperators = ["+", "-", "*", "/", "^", "**", "!=", "!~", ">=", "<=", "=", "&&", "||", "xor", "and", "or", "implies"];
  usableFunctions = ["CEILING()", "FLOOR()", "ABS()", "LOG()", "TRUNCATE()", "EXP()", "SQRT()", "LN()", "NOT()", "LENGTH()"];

  usableOperators2 = {
    "+" : {
      "description" : "The Addition operator denoted by a plus symbol. For integer, decimal, and quantity, adds the operands.  For strings, concatenates the second operand to the first operand.",
      "usage" : "operand1 + operand2",
      "example" : ["2 + 2 returns 4"],
      "output" : "integer, number or string"
    },
    "-" : {
      "description" : "The Subtraction operator denoted by a minus symbol.  It subtracts the second operand from the first operand.",
      "usage" : "operand1 - operand2",
      "example" : ["2 - 2 return 0"],
      "output" : "integer or number"
    },
    "*" : {
      "description" : "The Multiplication operator denoted by a star symbol. It multiplies the first operand by the second operand.",
      "usage" : "operand1 * operand2",
      "example" : ["2 * 2 returns 4"],
      "output" : "integer, number, or appropriate unit"
    },
    "/" : {
      "description" : "The Division operator denoted by a slash symbol. It divides the first operand by the second operand.  In an attempt to divide by zero, empty object is returned.",
      "usage" : "operand1 / operand2",
      "example" : ["2 / 2 returns 1"],
      "output" : "decimal"
    },
    "^" : {
      "description" : "The Power operator denoted by a carat symbol.  It returns the result of raising the first operand to the power of the second operand.",
      "usage" : "operand1^operand2",
      "example" : ["2^3 returns 8"],
      "output": "integer or decimal"
    },
    "**" : {
      "description" : "The Power operator denoted by the ** symbol.  It returns the result of raising the first operand to the power of the second operand.",
      "usage" : "operand1**operand2",
      "example" : ["2**3 returns 8"],
      "output" : "integer or decimal"
    },
    "!=" : {
      "description" : "The Not Equals operator denoted by the exclamation mark and equal symbols.  It returns true if the equal operator returns false and false if the equal returns true.  It returns empty object if equal returns empty.",
      "usage" : "operand1 != operand2",
      "example" : [
         "2 != 3 returns true",
         "2 != 2 returns false"
      ],
      "output" : "boolean"
    },
    "!~" : {
      "description" : "The Not Equivalent operator denoted by the exclamation mark and tilda symbols. It returns true if the equivalent operator returns false and vice versa.",
      "usage" : "operand1 !~ operand2",
      "example" : ["2 !~ 3"],
      "output" : "boolean"
    },
    ">=" : {
      "description" : "The Greater or Equal operator denoted by the greater than and equal symbols.  It returns true if the first operand is greater than or equal to the second.",
      "usage" : "operand1 >= operand2",
      "example" : [
        "2 >= 3 returns false",
        "3 >= 3 returns true"
      ],
      "output" : "boolean"
    },
    "<=" : {
      "description" : "The Less or Equal operator denoted by the less than and equal symbols.  It returns true if the first operand is less than or equal to the second.",
      "usage" : "operand1 <= operand2",
      "example" : [
        "2 <= 3 returns true",
        "4 <= 3 returns false"
      ],
      "output" : "boolean"
    },
    "=" : {
      "description" : "The equal operator denoted by the equal symbol.  It returns true if the first operand is equal to the second.",
      "usage" : "operand1 = operand2",
      "example" : [
        "2 = 3 returns false",
        "3 = 3 returns true" 
      ],
      "output" : "boolean"
    },
    "&&": {
      "description" : "The and boolean operator returns true if both operands evalute to true, false if either operand evalues to false.",
      "usage" : "operand1 && operand2",
      "example" : [
        "true && true returns true",
        "true && false returns false"
      ],
      "output" : "boolean"
    },
    "||": {
      "description" : "The or boolean operator returns false if both operands evaluate to false, true if either operand evaluates to true.",
      "usage" : "operand1 || operand2",
      "example" : [
        "true || false returns true",
        "false || false returns false"
      ],
      "output" : "boolean"
    },
    "xor": {
      "description" : "The xor boolean operator returns true if exactly one of the operands evalutes to true, false if either both operands evaluate to true or both operands evaluate to false.",
      "usage" : "operand1 xor operand2",
      "example" : ["a xor b"],
      "output" : "boolean"
    },
    "and": {
      "description" : "The and boolean operator returns true if both operands evalute to true, false if either operand evalues to false.",
      "usage" : "operand1 and operand2",
      "example" : [
        "true and true returns true",
        "true and false returns false"
      ],
      "output" : "boolean"
    },
    "or": {
      "description" : "The or boolean operator returns false if both operands evaluate to false, true if either operand evaluates to true.",
      "usage" : "operand1 or operand2",
      "example" : [
        "true or false returns true",
        "false or false returns false"
      ],
      "output" : "boolean"
    },
    "implies": {
      "description" : "The implies boolean operator. If the first operand evaluates to true, this operator returns the boolean evaluation of the second operand.  If the first operand evaluates to false, this operator returns true.",
      "usage" : "operand1 implies operand2",
      "example" : ["a implies b"],
      "output" : "boolean"
    },
  };

  usableFunctions2 = {
    "CEILING()" : {
      "description" : "The CEILING function rounds up and return the smallest integer greater than or equal to a given number.",
      "usage" : "CEILING([expression]) where expression can be numbers, variable names, mathematical operators, and various functions",
      "example" : [
                    "CEILING(0.95) returns 1",
                    "CEILING(3.3) returns 4",
                    "CEILING(4) returns 4",
                    "CEILING(-7.01) returns -7"
                   ],
      "output" : "integer"
    },
    "FLOOR()" : {
      "description" : "The FLOOR function rounds down and returns the largest integer less than or equal to a given number.",
      "usage" : "FLOOR([expression]) where expression can be numbers, variable names, mathematical operators, and various functions",
      "example" : [
                     "FLOOR(5.95) returns 5",
                     "FLOOR(5.05) returns 5",
                     "FLOOR(5) returns 5",
                     "FLOOR(-5.05) returns -6"
                  ],
      "output" : "integer"
    },
    "ABS()" : {
      "description" : "The ABS function returns the absolute value of a number.",
      "usage" : "ABS([expression]) where expression can be numbers, variable names, mathematical operators, and various functions",
      "example" : [
                     "ABS(3) returns 3",
                     "ABS(-3) returns 3"
                  ],
      "output" : "integer or decimal or quantity"
    },
    "LOG()" : {
      "description" : "The LOG function returns the logarithm of a number.  This function accepts two input parameters: base and value.",
      "usage" : "LOG([Base],[Value])",
      "example" : [
                    "LOG(2, 10) returns 4.0"
                  ],
      "output" : "decimal"
    },
    "TRUNCATE()" : {
      "description" : "The TRUNCATE function returns the integer portion of the input.",
      "usage" : "TRUNCATE([expression]) where expression can be numbers, variable names, mathematical operators, and various functions",
      "example" : [
                    "TRUNCATE(13.37) returns 13",
                    "TRUNCATE(42.84) returns 42",
                    "TRUNCATE(0.123) returns 0",
                    "TRUNCATE(-0.123) return -0"
                  ],
      "output" : "integer"
    },
    "EXP()" : {
      "description" : "The EXP function returns e raised to the power of the input.",
      "usage" : "EXP([expression]) where expression can be numbers, variable names, mathematical operators, and various functions",
      "example" : [
                    "EXP(0) returns 1",
                    "EXP(1) returns 2.718281828459",
                    "EXP(-1) returns 0.36787944117144233",
                    "EXP(2) returns 7.38905609893065"
                  ],
      "output" : "decimal"
    },
    "SQRT()" : {
      "description" : "The SQRT returns the square root of the input number.",
      "usage" : "SQRT([expression]) where expression can be numbers, variable names, mathematical operators, and various functions",
      "example" : [
                  "SQRT(4) returns 2.0"
                  ],
      "output" : "decimal"
    },
    "LN()" : {
      "description" : "The LN function returns the natural logarithm of the input.",
      "usage" : "LN([expression]) where expression can be numbers, variable names, mathematical operators, and various functions",
      "example" : [
                    "LN(1) returns 0.0",
                  ],
      "output" : "decimal"
    },
    "NOT()" : {
      "description" : "The Logical NOT function takes truth to falsity and vice versa.",
      "usage" : "NOT([expression])",
      "example" : [
                    "NOT(false) returns true",
                    "NOT(true) returns false"
                  ],
      "output" : "boolean"
    },
    "LENGTH()" : {
      "description" : "The LENGTH function returns the length of the input string.",
      "usage" : "LENGTH([expression])",
      "example" : [
                  "LENGTH('abc') returns 3"
                  ],
      "output" : "integer"
    },
  };

  sectionArr = [false, false, false];

  operatorItemsReadOnly = true;
  functionItemsReadOnly = true;

  closeHelp() {
    this.showHideSection(false, false, false);

    this.operatorItemsReadOnly = true;
    this.functionItemsReadOnly = true;

    this.onCloseModal.emit();
  }

  /**
   * Function to handle show/hide of all three help sections 
   */
  showHideSection(variablesFlag, usableOperatorsFlag, usableFunctionsFlag) {
    this.sectionArr[0] = variablesFlag;
    this.sectionArr[1] = usableOperatorsFlag;
    this.sectionArr[2] = usableFunctionsFlag;

    this.help_arrow_vars = this.arrow_arr[variablesFlag?1:0];
    this.help_arrow_ops = this.arrow_arr[usableOperatorsFlag?1:0];
    this.help_arrow_funcs = this.arrow_arr[usableFunctionsFlag?1:0];
  }
 
  /**
   * Show the Variables section and invoke the live announcer 
   */
  toggleVariablesSection() {
    this.showHideSection(true, false, false);

    this.operatorItemsReadOnly = true;

    let helpText = '';
    if (this.variables.length === 0)
      this.liveAnnouncer.announce("There is no variable available for this section");
    else {
      if (this.variables.length === 1)
        helpText += "There is one variable available.  The variable is " + this.variables[0];
      else {
        helpText += "There are " + this.variables.length + " variables available." ;
        for (let i = 0; i < this.variables.length; i++) {
          helpText += "  " + this.variables[i] + ",  ";          
        }
      }
   
      this.liveAnnouncer.announce(helpText);
    }
  }

  /**
   * Show the Usable Operators section and invoke the live announcer
   */
  toggleUsableOperatorsSection() {
    if (this.operatorItemsReadOnly)
      this.liveAnnouncer.announce("There are 17 operators available in this section.  Use the ENTER key to enter this section.");
    this.showHideSection(false, true, false);

    this.functionItemsReadOnly = true;
  }

  /**
   * Toggle to display detail information for each of the operators and invoke the live announcer 
   */
  toggleUsableOperatorItems() {
    this.liveAnnouncer.announce('Entering the Usable Operators Items section. Use the tab button to scroll through each operator.');
    this.sectionArr[1] = true;

    this.operatorItemsReadOnly = false;
  }

  /**
   * Prepare Live Announcer with the description of the selected item 
   */
  getLiveAnnouncementForItem(item) {
    let announceText = item.description + "   ";
    announceText += "The usage is " + item.usage + ".   ";
    announceText += "The expected output is " + item.output + ".  ";

    for (let i = 0; i < item.example.length; i++) {
      announceText += "Example " + (i + 1) + ".  "  + item.example[i] + ". ";
    }

    this.liveAnnouncer.announce(announceText);
  }

  /**
   * Show the Usable Functions section and invoke the live announcer
   */
  toggleUsableFunctionsSection() {

    if (this.functionItemsReadOnly)
      this.liveAnnouncer.announce("There are 10 functions available in this section.  Use the ENTER key to go through each function.");

    this.showHideSection(false, false, true);

    this.operatorItemsReadOnly = true;
  }

  /**
   * Toggle to display detail information for each of the operators and invoke the live announcer
   */
  toggleUsableFunctionItems() {

    this.liveAnnouncer.announce('Entering the Usable Functions Items section. Use the tab button to scroll through each function.');
    this.sectionArr[2] = true;

    this.functionItemsReadOnly = false;
  }

}


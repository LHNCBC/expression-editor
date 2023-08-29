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
      "output" : "integer, number or string",
      "display" : false
    },
    "-" : {
      "description" : "The Subtraction operator denoted by a minus symbol.  It subtracts the second operand from the first operand.",
      "usage" : "operand1 - operand2",
      "usageScreenReader" : "operand1 minus operand2",
      "example" : ["2 - 2 returns 0"],
      "exampleScreenReader" : ["2 minus 2 returns 0"],
      "output" : "integer or number",
      "display" : false
    },
    "*" : {
      "description" : "The Multiplication operator denoted by a star symbol. It multiplies the first operand by the second operand.",
      "usage" : "operand1 * operand2",
      "example" : ["2 * 2 returns 4"],
      "output" : "integer, number, or appropriate unit",
      "display" : false
    },
    "/" : {
      "description" : "The Division operator denoted by a slash symbol. It divides the first operand by the second operand.  In an attempt to divide by zero, empty object is returned.",
      "usage" : "operand1 / operand2",
      "example" : ["2 / 2 returns 1"],
      "output" : "decimal or empty object",
      "display" : false
    },
    "^" : {
      "description" : "The Power operator denoted by a carat symbol.  It returns the result of raising the first operand to the power of the second operand.",
      "usage" : "operand1^operand2",
      "usageScreenReader" : "operand1 carat operand2", 
      "example" : ["2^3 returns 8"],
      "exampleScreenReader" : ["2 carat 3 returns 8"],
      "output": "integer or decimal",
      "display" : false
    },
    "**" : {
      "description" : "The Power operator denoted by the ** symbol.  It returns the result of raising the first operand to the power of the second operand.",
      "usage" : "operand1**operand2",
      "example" : ["2**3 returns 8"],
      "output" : "integer or decimal",
      "display" : false
    },
    "!=" : {
      "description" : "The Not Equals operator denoted by the exclamation mark and equal symbols.  It returns true if the equal operator returns false and false if the equal returns true.  It returns empty object if equal returns empty.",
      "usage" : "operand1 != operand2",
      "usageScreenReader" : "operand1 exclamation mark equal operand2",
      "example" : [
         "2 != 3 returns true",
         "2 != 2 returns false"
      ],
      "exampleScreenReader" : [
         "2 exclamation mark equal 3 returns true",
         "2 exclamation mark equal 2 returns false"
      ],
      "output" : "boolean or empty object",
      "display" : false
    },
    "!~" : {
      "description" : "The Not Equivalent operator denoted by the exclamation mark and tilda symbols. It returns true if the equivalent operator returns false and vice versa.",
      "usage" : "operand1 !~ operand2",
      "usageScreenReader" : "operand1 exclamatory mark tilda operand2",
      "example" : ["2 !~ 3"],
      "exampleScreenReader" : ["2 exclamatory mark tilda 3"],
      "output" : "boolean",
      "display" : false
    },
    ">=" : {
      "description" : "The Greater or Equal operator denoted by the greater than and equal symbols.  It returns true if the first operand is greater than or equal to the second.",
      "usage" : "operand1 >= operand2",
      "example" : [
        "2 >= 3 returns false",
        "3 >= 3 returns true"
      ],
      "output" : "boolean",
      "display" : false
    },
    "<=" : {
      "description" : "The Less or Equal operator denoted by the less than and equal symbols.  It returns true if the first operand is less than or equal to the second.",
      "usage" : "operand1 <= operand2",
      "example" : [
        "2 <= 3 returns true",
        "4 <= 3 returns false"
      ],
      "output" : "boolean",
      "display" : false
    },
    "=" : {
      "description" : "The equal operator denoted by the equal symbol.  It returns true if the first operand is equal to the second.",
      "usage" : "operand1 = operand2",
      "example" : [
        "2 = 3 returns false",
        "3 = 3 returns true" 
      ],
      "output" : "boolean",
      "display" : false
    },
    "&&": {
      "description" : "The and boolean operator returns true if both operands evalute to true, false if either operand evalues to false.",
      "usage" : "operand1 && operand2",
      "example" : [
        "true && true returns true",
        "true && false returns false"
      ],
      "output" : "boolean",
      "display" : false
    },
    "||": {
      "description" : "The or boolean operator returns false if both operands evaluate to false, true if either operand evaluates to true.",
      "usage" : "operand1 || operand2",
      "example" : [
        "true || false returns true",
        "false || false returns false"
      ],
      "output" : "boolean",
      "display" : false
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
      "output" : "boolean",
      "display" : false
    },
    "or": {
      "description" : "The or boolean operator returns false if both operands evaluate to false, true if either operand evaluates to true.",
      "usage" : "operand1 or operand2",
      "example" : [
        "true or false returns true",
        "false or false returns false"
      ],
      "output" : "boolean",
      "display" : false
    },
    "implies": {
      "description" : "The implies boolean operator. If the first operand evaluates to true, this operator returns the boolean evaluation of the second operand.  If the first operand evaluates to false, this operator returns true.",
      "usage" : "operand1 implies operand2",
      "example" : ["a implies b"],
      "output" : "boolean",
      "display" : false
    },
  };

  usableFunctions2 = {
    "CEILING()" : {
      "description" : "The CEILING function rounds up and return the smallest integer greater than or equal to a given number.",
      "usage" : "CEILING([expression]) where expression can be numbers, variable names, mathematical operators, and various functions",
      "usageScreenReader" : "CEILING open parenthesis [expression] close parenthesis  where expression can be numbers, variable names, mathematical operators, and various functions",
      "example" : [
                    "CEILING(0.95) returns 1",
                    "CEILING(3.3) returns 4",
                    "CEILING(4) returns 4",
                    "CEILING(-7.01) returns -7"
                   ],
      "exampleScreenReader" : [
                    "CEILING open parenthesis 0.95 close parenthesis returns 1",
                    "CEILING open parenthesis 3.3 close parenthesis returns 4",
                    "CEILING open parenthesis 4 close parenthesis returns 4",
                    "CEILING open parenthesis -7.01 close parenthesis returns -7"
                   ],

      "output" : "integer",
      "display" : false
    },
    "FLOOR()" : {
      "description" : "The FLOOR function rounds down and returns the largest integer less than or equal to a given number.",
      "usage" : "FLOOR([expression]) where expression can be numbers, variable names, mathematical operators, and various functions",
      "usageScreenReader" : "FLOOR open parenthesis [expression] close parenthesis where expression can be numbers, variable names, mathematical operators, and various functions",
      "example" : [
                     "FLOOR(5.95) returns 5",
                     "FLOOR(5.05) returns 5",
                     "FLOOR(5) returns 5",
                     "FLOOR(-5.05) returns -6"
                  ],
      "exampleScreenReader" : [
                     "FLOOR open parenthesis 5.95 close parenthesis returns 5",
                     "FLOOR open parenthesis 5.05 close parenthesis returns 5",
                     "FLOOR open parenthesis 5 close parenthesis returns 5",
                     "FLOOR open parenthesis -5.05 close parenthesis returns -6"
                  ],

      "output" : "integer",
      "display" : false
    },
    "ABS()" : {
      "description" : "The ABS function returns the absolute value of a number.",
      "usage" : "ABS([expression]) where expression can be numbers, variable names, mathematical operators, and various functions",
      "usageScreenReader" : "ABS open parenthesis [expression] close parenthesis where expression can be numbers, variable names, mathematical operators, and various functions",
      "example" : [
                     "ABS(3) returns 3",
                     "ABS(-3) returns 3"
                  ],
      "exampleScreenReader" : [
                     "ABS open parenthesis 3 close parenthesis returns 3",
                     "ABS open parenthesis -3 close parenthesis returns 3"
                  ],
      "output" : "integer or decimal or quantity",
      "display" : false
    },
    "LOG()" : {
      "description" : "The LOG function returns the logarithm of a number.  This function accepts two input parameters: base and value.",
      "usage" : "LOG([Base],[Value])",
      "usageScreenReader" : "LOG open parenthesis [Base] comma [Value] close parenthesis", 
      "example" : [
                    "LOG(2, 10) returns 4.0"
                  ],
      "exampleScreenReader" : [
                    "LOG open parenthesis 2 comma 10 close parenthesis returns 4.0"
                  ],
      "output" : "decimal",
      "display" : false
    },
    "TRUNCATE()" : {
      "description" : "The TRUNCATE function returns the integer portion of the input.",
      "usage" : "TRUNCATE([expression]) where expression can be numbers, variable names, mathematical operators, and various functions",
      "usageScreenReader" : "TRUNCATE open parenthesis [expression] close parenthesis where expression can be numbers, variable names, mathematical operators, and various functions",
      "example" : [
                    "TRUNCATE(13.37) returns 13",
                    "TRUNCATE(42.84) returns 42",
                    "TRUNCATE(0.123) returns 0",
                    "TRUNCATE(-0.123) return -0"
                  ],
      "exampleScreenReader" : [
                    "TRUNCATE open parenthesis 13.37 close parenthesis returns 13",
                    "TRUNCATE open parenthesis 42.84 close parenthesis returns 42",
                    "TRUNCATE open parenthesis 0.123 close parenthesis returns 0",
                    "TRUNCATE open parenthesis -0.123 close parenthesis return -0"
                  ],
      "output" : "integer",
      "display" : false
    },
    "EXP()" : {
      "description" : "The EXP function returns e raised to the power of the input.",
      "usage" : "EXP([expression]) where expression can be numbers, variable names, mathematical operators, and various functions",
      "usageScreenReader" : "EXP open parenthesis [expression] close parenthesis where expression can be numbers, variable names, mathematical operators, and various functions",
      "example" : [
                    "EXP(0) returns 1",
                    "EXP(1) returns 2.718281828459",
                    "EXP(-1) returns 0.36787944117144233",
                    "EXP(2) returns 7.38905609893065"
                  ],
      "exampleScreenReader" : [
                    "EXP open parenthesis 0 close parenthesis returns 1",
                    "EXP open parenthesis 1 close parenthesis returns 2.718281828459",
                    "EXP open parenthesis -1 close parenthesis returns 0.36787944117144233",
                    "EXP open parenthesis 2 close parenthesis returns 7.38905609893065"
                  ],
      "output" : "decimal",
      "display" : false
    },
    "SQRT()" : {
      "description" : "The SQRT returns the square root of the input number.",
      "usage" : "SQRT([expression]) where expression can be numbers, variable names, mathematical operators, and various functions",
      "usageScreenReader" : "SQRT open parenthesis [expression] close parenthesis where expression can be numbers, variable names, mathematical operators, and various functions",
      "example" : [
                  "SQRT(4) returns 2.0"
                  ],
      "exampleScreenReader" : [
                  "SQRT open parenthesis 4 close parenthesis returns 2.0"
                  ],
      "output" : "decimal",
      "display" : false
    },
    "LN()" : {
      "description" : "The LN function returns the natural logarithm of the input.",
      "usage" : "LN([expression]) where expression can be numbers, variable names, mathematical operators, and various functions",
      "usageScreenReader" : "LN open parenthesis [expression] close parenthesis where expression can be numbers, variable names, mathematical operators, and various functions",
      "example" : [
                    "LN(1) returns 0.0",
                  ],
      "exampleScreenReader" : [
                    "LN open paenthesis 1 close parenthesis returns 0.0",
                  ],
      "output" : "decimal",
      "display" : false
    },
    "NOT()" : {
      "description" : "The Logical NOT function takes truth to falsity and vice versa.",
      "usage" : "NOT([expression])",
      "usageScreenReader" : "NOT open parenthesis [expression] close parenthesis",
      "example" : [
                    "NOT(false) returns true",
                    "NOT(true) returns false"
                  ],
      "exampleScreenReader" : [
                    "NOT open parenthesis false close parenthesis returns true",
                    "NOT open parenthesis true close parenthesis returns false"
                  ],
      "output" : "boolean",
      "display" : false
    },
    "LENGTH()" : {
      "description" : "The LENGTH function returns the length of the input string.",
      "usage" : "LENGTH([expression])",
      "usageScreenReader" : "LENGTH open parenthesis [expression] close parenthesis",
      "example" : [
                  "LENGTH('abc') returns 3"
                  ],
      "exampleScreenReader" : [
                  "LENGTH open parenthesis 'abc' close parenthesis returns 3"
                  ],
      "output" : "integer",
      "display" : false
    },
  };

  sectionArr = [false, false, false];

  operatorItemsReadOnly = true;
  functionItemsReadOnly = true;

  currentActiveOpenedItem = '';

  /**
   * Close Help Modal
   */
  closeHelp() {
    this.showHideSection(false, false, false);

    this.operatorItemsReadOnly = true;
    this.functionItemsReadOnly = true;

    if (this.currentActiveOpenedItem !== '') {
      if (this.usableFunctions2.hasOwnProperty(this.currentActiveOpenedItem))
        this.usableFunctions2[this.currentActiveOpenedItem].display = false;
      else if (this.usableOperators2.hasOwnProperty(this.currentActiveOpenedItem))
        this.usableOperators2[this.currentActiveOpenedItem].display = false;
    }

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

  getLiveAnncounementForSection(item) {
    console.log('getLiveAnnouncementForSection');
    let announceText = '';

    if (item === 'operators')
      announceText = "There are 17 operators available in this section.  Use the ENTER key to enter this section.";
    else if (item === 'functions')
      announceText = "There are 10 functions available in this section.  Use the ENTER key to go through each function.";

    this.liveAnnouncer.announce(announceText);
  }

  /**
   * Show the Usable Operators section and invoke the live announcer
   */
  toggleUsableOperatorsSection() {
    this.liveAnnouncer.announce('Entering the Usable Operators Items section. Use the tab button to scroll through each operator.');
    this.showHideSection(false, true, false);

    this.operatorItemsReadOnly = false;
  }

  /**
   * Toggle to display detail information for each of the operators and invoke the live announcer 
   */
  toggleUsableOperatorItem(item) {
    if (this.currentActiveOpenedItem !== '') {
      if (this.usableOperators2.hasOwnProperty(this.currentActiveOpenedItem))
        this.usableOperators2[this.currentActiveOpenedItem].display = false;
      else if (this.usableFunctions2.hasOwnProperty(this.currentActiveOpenedItem))
        this.usableFunctions2[this.currentActiveOpenedItem].display = false;
    }
    this.usableOperators2[item].display = true;
    this.currentActiveOpenedItem = item;

    this.getLiveAnnouncementDetailForItem(this.usableOperators2[item]);
  }

  /**
   * Prepare Live Announcer with the description of the selected item
   */
  getLiveAnnouncementForItem(item) {
    let announceText = item.description + "  Click the Enter key to get more detail.";

    this.liveAnnouncer.announce(announceText);
  }
  /**
   * Prepare Live Announcer with the detail of the selected item
   */
  getLiveAnnouncementDetailForItem(item) {
    let announceText = '';

    announceText += item.description + " ";
    let usage = (item.hasOwnProperty('usageScreenReader'))?item.usageScreenReader:item.usage;
    announceText += "The usage is " + usage + ".   ";
    announceText += "The expected output is " + item.output + ".  ";

    let ex = (item.hasOwnProperty('exampleScreenReader'))?item.exampleScreenReader:item.example;

    for (let i = 0; i < ex.length; i++) {
      announceText += "Example " + (i + 1) + ".  "  + ex[i] + ". ";
    }

    this.liveAnnouncer.announce(announceText);
  }

  /**
   * Show the Usable Functions section and invoke the live announcer
   */
  toggleUsableFunctionsSection(action) {
    this.liveAnnouncer.announce('Entering the Usable Functions Items section. Use the tab button to scroll through each function.');

    this.showHideSection(false, false, true);

    this.functionItemsReadOnly = false;
  }

  toggleUsableFunctionItem(item) {
    if (this.currentActiveOpenedItem !== '') {
      if (this.usableFunctions2.hasOwnProperty(this.currentActiveOpenedItem))
        this.usableFunctions2[this.currentActiveOpenedItem].display = false;
      else if (this.usableOperators2.hasOwnProperty(this.currentActiveOpenedItem))
        this.usableOperators2[this.currentActiveOpenedItem].display = false;
    }
    this.usableFunctions2[item].display = true;
    this.currentActiveOpenedItem = item;

    this.getLiveAnnouncementDetailForItem(this.usableFunctions2[item]);
  }

}


import { IS } from './is';

const LIST = {
    letter: [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L','M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ],
};

function Random() {
    this.integer = (min, max) => {
        min = IS.array(min) ? null : Number.parseInt(min);
        max = IS.array(max) ? null : Number.parseInt(max);

        if (!IS.integer(min) || !IS.integer(max)) {
            min = 0;
            max = 1;
        }

        if (IS.integer(min) && IS.integer(max)) {
            if (min > max) {
                let tempVar = min;
                min = max;
                max = tempVar;
            }

            if (min >= 0 && max > 0) {
                let integer = Math.floor(Math.random() * (max - min + 1)) + min;
                if (IS.integer(integer)) {
                    return integer;
                }
            }
        }
        return null;
    };

    this.letter = () => {
        return this.arrayItem(LIST.letter);
    },

        this.arrayItem = (array) => {
            if (IS.arrayNotEmpty(array)) {
                let index = this.integer(0, array.length - 1);
                if (IS.integer(index)) {
                    return array[index];
                }
            }
            return null;
        };

    this.stringByPattern = (pattern) => {
        // # - Number (0-9)
        // ! - Number (2-9)
        // ^ - Number (5-9)
        // ? - Char
        // > - Char Uppercase
        // < - Char LowerCase
        // * - Any [Number, Char]
        if (!IS.stringNotEmpty(pattern)) return null;
        let arr = pattern.split('');
        if (!IS.arrayNotEmpty(arr)) return null;

        let symbols = ['#', '!', '^', '?', '<', '>'];
        let result = '';

        arr.forEach((patternItem) => {
            let item = patternItem;
            if (patternItem === '*') {
                let symbol = this.arrayItem(symbols);
                if (IS.stringNotEmpty(symbol)) {
                    item = symbol;
                } else {
                    item = symbols[0];
                }
            }

            if (item === '#') {
                let integer = this.integer(0, 9);
                result += IS.integer(integer) ? `${integer}` : `${item}`;

            } else if (item === '!') {
                let integer = this.integer(2, 9);
                result += IS.integer(integer) ? `${integer}` : `${item}`;

            } else if (item === '^') {
                let integer = this.integer(5, 9);
                result += IS.integer(integer) ? `${integer}` : `${item}`;

            } else if (item === '?') {
                let letter = this.letter();
                let caseFlag = this.integer() || 0;
                if (IS.stringNotEmpty(letter) && IS.integer(caseFlag)) {
                    if (caseFlag === 0) {
                        result += `${letter.toLowerCase()}`;
                    } else {
                        result += `${letter.toUpperCase()}`;
                    }
                } else {
                    result += `${item}`;
                }

            } else if (item === '<') {
                let letter = this.letter();
                result += IS.stringNotEmpty(letter) ? `${letter.toLowerCase()}` : `${item}`;

            } else if (item === '>') {
                let letter = this.letter();
                result += IS.stringNotEmpty(letter) ? `${letter.toUpperCase()}` : `${item}`;

            } else {
                result += `${item}`;
            }
        });

        if (IS.stringNotEmpty(result)) {
            return result;
        }
        return null;
    };

    this.componentId = () => {
        return this.stringByPattern('******************');
    };
}

const RANDOM = new Random();
export { RANDOM };
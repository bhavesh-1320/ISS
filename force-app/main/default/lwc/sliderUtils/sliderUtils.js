import { IS } from './lib/is';
import { RANDOM } from './lib/random';
import { REGEXP } from './list/regexp';

function Utils() {
    this.customCssContainer = 'custom-css-container';

    this.removeUnsupportedCharacters = (str) => {
        if (IS.stringNotEmpty(str) && IS.regexp(REGEXP.unsupportedCharacters)) {
            return str.replace(REGEXP.unsupportedCharacters, '');
        }
        return null;
    };

    this.removeTwoSpaces = (str) => {
        if (IS.stringNotEmpty(str) && IS.regexp(REGEXP.twoSpaces)) {
            return str.replace(REGEXP.twoSpaces, '');
        }
        return null;
    };

    this.prepareString = (str) => {
        if (IS.stringNotEmpty(str)) {
            str = this.removeUnsupportedCharacters(str);
            str = this.removeTwoSpaces(str);
            return str;
        }
        return null;
    };

    this.random = {
        componentId: RANDOM.componentId,
    };

    this.wrapper = (componentName) => {
        if (IS.stringNotEmpty(componentName)) {
            return `${componentName}__wrapper`;
        }
        return null;
    }

    this.wrapperId = (componentName, componentId) => {
        if (IS.stringNotEmpty(componentName)) {
            return `${componentName}__${componentId || this.random.componentId()}`;
        }
        return null;
    }

    this.prepareLabel = (str, values) => {
        if (IS.stringNotEmpty(str) && IS.arrayNotEmpty(values)) {
            let newStr = `${str}`;
            values.forEach((item, index) => {
                let newRegexp = new RegExp(`\\{${index}\\}`);
                newStr = newStr.replace(newRegexp, item);
            });
            return IS.stringNotEmpty(newStr) ? newStr : null;
        }
        return IS.stringNotEmpty(str) ? str : null;
    }
}

const UTILS = new Utils();
export { UTILS, IS };
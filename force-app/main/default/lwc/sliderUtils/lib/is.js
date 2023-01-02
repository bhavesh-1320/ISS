import { TYPES } from '../list/types';

function Is() {
    this.type = (value, type) => {
        if (!type || typeof type !== TYPES.string || type.length < 2) {
            return false;
        }

        let types = Object.values(TYPES);
        let typeOf = type.toLowerCase().trim();
        if (types.indexOf(typeOf) === -1) {
            return false;
        }

        let typeUppercase = `${typeOf[0].toUpperCase()}${typeOf.substring(1)}`;
        if (typeOf === TYPES.generator || typeOf === TYPES.async) {
            typeUppercase += `${TYPES.function[0].toUpperCase()}${TYPES.function.substring(1)}`;
        } else if (typeOf === TYPES.regexp) {
            typeUppercase = 'RegExp';
        }
        let typeString = `[${TYPES.object} ${typeUppercase}]`;

        if (typeOf === TYPES.null || typeOf === TYPES.array || typeOf === TYPES.date || typeOf === TYPES.regexp) {
            typeOf = TYPES.object;
        }

        return typeof value === typeOf && Object.prototype.toString.call(value) === typeString;
    };

    this.number = (value) => {
        return this.type(value, TYPES.number);
    };

    this.infiniteCondition = (value) => {
        return value === Infinity || value === -Infinity;
    };

    this.nanCondition = (value) => {
        return value !== value;
    };

    this.numeric = (value) => {
        return this.number(value) &&
            !this.infiniteCondition(value) &&
            !this.nanCondition(value);
    };

    this.integer = (value) => {
        return this.numeric(value) &&
            value % 1 === 0;
    };

    this.array = (value) => {
        return Array.isArray(value) || this.type(value, TYPES.array);
    };

    this.arrayNotEmpty = (value) => {
        return this.array(value) && value.length !== 0;
    };

    this.string = (value) => {
        return this.type(value, TYPES.string);
    };

    this.stringNotEmpty = (value) => {
        return this.string(value) && value.length !== 0;
    };

    this.regexp = (value) => {
        return this.type(value, TYPES.regexp);
    };

}

const IS = new Is();
export { IS };
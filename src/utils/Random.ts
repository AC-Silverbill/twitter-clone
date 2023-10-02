export namespace Random {
    /**
     * i need a better name for 'range'
     * @param length
     * @param range - [OPTIONAL] if included, increases the possible string size by this amount
     * @returns
     */
    export const createRandomString = (length: number, range?: number) => {
        const array: Array<string> = [];

        if (range) length += createRandomNumber(range);
        for (let i = 0; i < length; i++) {
            const random_index = Math.round(Math.random() * (USED_CHARACTERS.length - 1));
            array.push(USED_CHARACTERS[random_index]!);
        }

        const result = array.toString().replace(/,/g, "");
        return result;
    };

    /**
     * creates a random integer number from a max-min range
     * @param max
     * @param min default is 0
     * @returns
     */
    export const createRandomNumber = (max: number, min: number = 0) => {
        const result = Math.round(Math.random() * (max - min) + min);
        return result;
    };

    // if u want to use this elsewhere, let Kat#2068 know
    const getCharCodes = (length: number, startIndex: number) => {
        const numbers_array = Array.from(Array(length)).map((item, index) => index + startIndex);
        const charcode_array = numbers_array.map((item, index) => String.fromCharCode(item));
        return charcode_array;
    };

    const NUMBERS = getCharCodes(10, 48);
    const ALPHABET_UPPER = getCharCodes(26, 65);
    const ALPHABET_LOWER = getCharCodes(26, 97);
    const USED_CHARACTERS = [...NUMBERS, ...ALPHABET_LOWER, ...ALPHABET_LOWER];
}

type possibleValues = "K" | "M" | "B";

const division = 3;
const scales: { [propname in possibleValues]: (number: number) => boolean } = {
    K: (number: number) => number > division * 1 && number <= division * 2,
    M: (number: number) => number > division * 2 && number <= division * 3,
    B: (number: number) => number > division * 3 && number <= division * 4,
} as const;

/**
 * helper function which can convert a large number into a readable string
 * @param number
 */
export default function convertToReadableString(number: number) {
    const digits = number.toString().split("").length;

    if (digits <= division) {
        return number.toString();
    }

    const scale = Object.entries(scales).find((k) => k[1](digits))?.[0]!;
    const headCount = digits % division == 0 ? division : digits % division;
    const newString =
        number.toString().substring(0, headCount) + (headCount === division ? "" : ".") + number.toString().substring(headCount, 3);
    return newString + scale;
}

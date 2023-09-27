/**
 * replaces all newlines (\n) with empty, making the string to be on one line
 * @param multiLine string that could be multiline
 * @returns
 */
export default function convertMultiToSingleLine(multiLine: string) {
    return multiLine.replace(/\n/g, "");
}

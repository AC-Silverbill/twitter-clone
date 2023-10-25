/**
 * helper function to get the width vh of an element (assuming you have the element's width already). maxes out at 100
 * @param pixelWidth
 * @returns
 */
export default function getVH_Width(pixelWidth: number) {
    return Math.min(Math.round((pixelWidth / innerWidth) * 100), 100);
}

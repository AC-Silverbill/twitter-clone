/**
 * helper function to get the height vh of an element (assuming you have the element's height already). maxes out at 100
 * @param pixelHeight
 * @returns
 */
export default function getVH_Height(pixelHeight: number) {
    return Math.min(Math.round((pixelHeight / innerHeight) * 100), 100);
}

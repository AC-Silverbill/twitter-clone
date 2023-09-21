import { colors, routes } from "./constants";

const categories = {
    colors: colors,
    routes: routes,
};

/**
 * helper function to fetch a local constant from 'constants.ts'
 *
 * feel free to more constants/add a new category, then addon onto the const `categories` in the file
 * @param category
 * @param constant
 * @returns
 */
export const getLocal = <T extends keyof typeof categories, K extends keyof (typeof categories)[T]>(category: T, constant: K) => {
    return categories[category][constant];
};

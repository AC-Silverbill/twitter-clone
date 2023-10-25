import { categories } from "./constants";

/**
 * helper function to fetch all objects of a category from 'constants.ts'
 *
 * feel free to more constants/add a new category, then addon onto the const `categories` in the file
 * @param category
 * @returns
 */
export default function getLocals<T extends keyof typeof categories>(category: T) {
    return categories[category];
}

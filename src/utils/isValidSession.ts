import { Session } from "next-auth";

/**
 * helper function to quickly see if the session's user is authenticated
 * @param data
 * @returns
 */
export default function isValidSession(data: Session | null) {
    if (!data) {
        return false;
    } else {
        return data.user.isAuthenticated;
    }
}

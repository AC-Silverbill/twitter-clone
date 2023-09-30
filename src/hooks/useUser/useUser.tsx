import { createContext, useContext } from "react";
import { Profile } from "~/types";

export type UserContextType = {
    twitterProfile?: Profile;
    isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

const useUser = () => {
    const user = useContext(UserContext);

    if (user === undefined) {
        throw new Error("You can only use useUser() in a UserProvider!");
    }

    return user;
};

export default useUser;

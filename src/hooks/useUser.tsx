import { getSession, useSession } from "next-auth/react";
import { createContext, use, useContext } from "react";
import { Profile } from "~/types";
import { getTwitterProfile } from "~/utils/getTwitterUser";

export type UserContextType = {
    twitterProfile: Profile;
    isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface Props {
    [propname: string]: any;
}

export const UserContextProvider = (props: Props) => {
    const { status, data } = useSession();
    if (status == "unauthenticated") {
        //TODO: add case for unauthenticated
    }

    const testUser = getTwitterProfile("one");
    const value: UserContextType = {
        twitterProfile: testUser,
        isLoading: false,
    };

    return <UserContext.Provider value={value} {...props} />;
};

const useUser = () => {
    const user = useContext(UserContext);

    if (user === undefined) {
        throw new Error("You can only use useUser() in a UserProvider!");
    }
    return user;
};

export default useUser;

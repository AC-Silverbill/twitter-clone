import { getSession, useSession } from "next-auth/react";
import { createContext, useContext } from "react";
import { Profile } from "~/types";
import { api } from "~/utils/api";

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

    const myProfile = api.user.getMe.useQuery();

    if (!myProfile.data) {
        throw new Error("'Me' Profile is undefined, but it is not handled elsewhere. Please do that.");
    }

    const value: UserContextType = {
        twitterProfile: myProfile.data,
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

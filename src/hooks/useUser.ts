import { TwitterUser } from "~/types";

//TODO: add real functionality lol
const useUser = (): TwitterUser => {
    return {
        id: 123821,
        email: "dsjadja@gmail.com",
        username: "Aerys",
        user: "aerys1",
        profileImageID: "~/../public/images/test1.png",
        bio: "sup",
    };
};

export default useUser;

import { Profile } from "~/types";

const placeholderProfile: Profile = {
    id: "",
    userId: "",
    nickname: "",
    username: "",
    image: "/images/defaultprofile.svg",
    joinedAt: new Date(Date.now()),
    bio: "",
    tweets: 0,
    likes: 0,
};

export default placeholderProfile;

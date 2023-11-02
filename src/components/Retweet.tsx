import React from "react";
import { Tweet } from "~/types";

interface RetweetProps {
    tweet: Tweet;
}
const Retweet = ({ tweet }: RetweetProps) => {
    return <div>Retweet</div>;
};

export default Retweet;

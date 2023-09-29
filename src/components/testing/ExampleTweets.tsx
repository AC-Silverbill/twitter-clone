import React from "react";
import { Tweet as TweetType } from "~/types";
import { getTwitterProfile } from "~/utils/getTwitterUser";

import ExampleTweet from "./ExampleTweet";

const ExampleTweets = () => {
    const [user1, user2] = [getTwitterProfile("one"), getTwitterProfile("two")];

    const exampleTweet: TweetType = {
        id: "asdjandj1njd1nd",
        type: "TWEET",
        author: user1,
        content: "hello everyone!",
        likes: 12,
        retweets: 42,
        replies: 52,
        timeCreated: new Date(Date.now()),
    };

    const exampleTweet2: TweetType = {
        id: "dkqdnojm",
        type: "TWEET",
        author: user2,
        content:
            "Once upon a time, there was a horse named Course. He loved to eat, of course. Then one night, when he was eating, of course, he came across a porch. He sat on the porch, then died. The end.",
        likes: 14,
        retweets: 2,
        replies: 76,
        timeCreated: new Date(Date.now() - 10000),
    };

    const exampleTweet3: TweetType = {
        id: "sfvkoqgqowrwkgmq",
        type: "REPLY",
        author: user1,
        content: "below me is an original post, unlike this",
        likes: 11,
        retweets: 123,
        replies: 42,
        timeCreated: new Date(Date.now() - 10000),
        reference: exampleTweet2,
    };

    const exampleTweet4: TweetType = {
        id: "sfvkoqgqowrwkgmq",
        type: "REPLY",
        author: user2,
        content: "lol",
        likes: 12,
        retweets: 42,
        replies: 52,
        timeCreated: new Date(Date.now() - 10000),
        reference: exampleTweet3,
    };

    return (
        <>
            <ExampleTweet tweet={exampleTweet4} />
            <ExampleTweet tweet={exampleTweet3} />
            <ExampleTweet tweet={exampleTweet} />
            <ExampleTweet tweet={exampleTweet2} />
        </>
    );
};

export default ExampleTweets;

import React from "react";
import { ReferenceTweet, Tweet as TweetType } from "~/types";
import { getTwitterProfile } from "~/utils/getTwitterUser";

import Tweet from "../Tweet";

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
        attachments: [],
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
        attachments: [],
    };

    const referenceTweet2: ReferenceTweet = {
        id: "dkqdnojm",
        author: user2,
        content:
            "Once upon a time, there was a horse named Course. He loved to eat, of course. Then one night, when he was eating, of course, he came across a porch. He sat on the porch, then died. The end.",
        timeCreated: new Date(),
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
        reference: referenceTweet2,
        attachments: [],
    };

    const referenceTweet3: ReferenceTweet = {
        id: "sfvkoqgqowrwkgmq",
        author: user1,
        content: "below me is an original post, unlike this",
        timeCreated: new Date(),
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
        reference: referenceTweet3,
        attachments: [],
    };

    return (
        <>
            <Tweet tweet={exampleTweet4} testMode={true} />
            <Tweet tweet={exampleTweet3} testMode={true} />
            <Tweet tweet={exampleTweet} testMode={true} />
            <Tweet tweet={exampleTweet2} testMode={true} />
        </>
    );
};

export default ExampleTweets;

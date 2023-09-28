import React from "react";
import { Tweet } from "~/types";
import { getTwitterProfile } from "~/utils/getTwitterUser";

const ExampleTweets = () => {
    const [user1, user2] = [getTwitterProfile("one"), getTwitterProfile("two")];

    const exampleTweet: Tweet = {
        id: 1,
        authorId: 52,
        author: user1,
        postId: 4,
        content: "hello everyone!",
        likes: [12],
        retweets: [],
        timeCreated: "asdasd",
    };

    const exampleTweet2: Tweet = {
        id: 52,
        authorId: 21,
        author: user2,
        postId: 52,
        content:
            "Once upon a time, there was a horse named Course. He loved to eat, of course. Then one night, when he was eating, of course, he came across a porch. He sat on the porch, then died. The end.",
        likes: [44],
        retweets: [],
        timeCreated: "asdasd",
    };
    return <div>ExampleTweets</div>;
};

export default ExampleTweets;

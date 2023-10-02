import { Profile } from "~/types";

//TODO: add popularity score to profiles
//TODO: popularity score will be determined by each request related
//#####LIST OF ITEMS#####
/**
 * getFollowers
 * getFollowings
 * getProfile
 * getLikesFromUser
 * getRepliesFromTweet
 * getRepliesFromUser
 * getTweet
 * getTweetsFromUser
 * ===> each one is +1 to popularity, for simplicity
 * ===> example of decay: every day, will decrease by 10%
 * 1000 => 900 => 810
 * "Popularity" userId/username | popularity
 */

// .2, .15, .05, .05, .05, .05, .05, .05, .05, .05 CHANGE THESE NUMBERS
const magnitudeRange = [0.2, 0.15, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05];
const ranges = [0.2, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75] as const;
const exampleRoll = (randomNumber: number) => {
    if (randomNumber > 0 && randomNumber < ranges[0]) {
        return 0;
    }

    if (randomNumber > ranges[0] && randomNumber < ranges[1]) {
        return 1;
    }

    if (randomNumber > ranges[1] && randomNumber < ranges[2]) {
        return 1;
    }

    if (randomNumber > ranges[2] && randomNumber < ranges[3]) {
        return 2;
    }

    if (randomNumber > ranges[3] && randomNumber < ranges[4]) {
        return 3;
    }

    if (randomNumber > ranges[4] && randomNumber < ranges[5]) {
        return 4;
    }

    if (randomNumber > ranges[5] && randomNumber < ranges[6]) {
        return 5;
    }

    if (randomNumber > ranges[6] && randomNumber < ranges[7]) {
        return 6;
    }

    if (randomNumber > ranges[7] && randomNumber < ranges[8]) {
        return 7;
    }

    if (randomNumber > ranges[8] && randomNumber < ranges[9]) {
        return 8;
    }

    if (randomNumber > ranges[9] && randomNumber < 1) {
        return -1;
    }
};

const returnFeedFromPopularAll = (tweetNumber: number = 20) => {
    //same thing as below, but skips fetching from followings of profile
};

const returnFeedFromPopularFollowing = (profile: Profile, tweetNumber: number = 20) => {
    // use route to see all followings of profile

    // get popularity score from db with followings's userId\username

    // create sample array with sorted scores, for 20

    //NOTE: THESE SHOULD NOT BE STRINGS, BUT ACTUAL PROFILES
    const profilesWithScores = [
        {
            name: "elonmusk",
            score: 5442,
        },
        {
            name: "gfgdgfgssd",
            score: 4552,
        },
        {
            name: "sdfgdsfgsdewrt",
            score: 523,
        },
        {
            name: "wqfqwfe",
            score: 52,
        },
        {
            name: "sadfadsfs",
            score: 42,
        },
        {
            name: "qre2135",
            score: 41,
        },
        {
            name: "qwfqwef",
            score: 36,
        },
        {
            name: "fdsfsdafas",
            score: 33,
        },
        {
            name: "sadfasdfweqrwqr",
            score: 24,
        },
        {
            name: "Bqdwfwdqfob",
            score: 11,
        },
    ];

    let chosenProfiles: any[] = [];
    for (let i = 0; i < tweetNumber; i++) {
        // first 3 are garenteed
        if (i < 3) {
            chosenProfiles.push(profilesWithScores[i]);
        } else {
            const roll = Math.random();
            const index = exampleRoll(roll);
            if (index === -1) {
                //fetch a random user from following to push onto
            } else {
                chosenProfiles.push(profilesWithScores[roll]);
            }
        }
    }

    // pull latest tweets from people, (if duplicate people, pull the next latest tweet)
    let actualFeed: any[] = [];
    return actualFeed;
};

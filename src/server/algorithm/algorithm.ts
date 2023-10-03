import { Profile } from "~/types";
import { Random } from "~/utils/Random";

//TODO: add popularity score to profiles
//TODO: popularity score will be determined by each request related
//#####LIST OF ITEMS#####
/*
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

//hard coded, keep magnitudes to help visualize percentages
const magnitudes = [0.2, 0.15, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05] as const;
const ranges = [0.2, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75] as const;

const getRandomIndex = () => {
    const randomNumber = Math.random();
    return ranges.findIndex((range, index) => randomNumber > (ranges[index - 1] ?? 0) && randomNumber < ranges[index]!);
};

const returnFeedFromPopularAll = (tweetNumber: number = 20) => {
    //same thing as below, but skips fetching from followings of profile
};

const returnFeedFromPopularFollowing = (profile: Profile, feedNumber: number = 20) => {
    //TODO: use route to see all followings of profile

    //TODO: get popularity score from db with followings's userId\username

    //NOTE: THESE SHOULD NOT BE STRINGS, BUT ACTUAL PROFILES
    const randomFollowing = Array(50)
        .fill(null)
        .map((unused) => ({
            name: Random.createRandomString(10),
            score: Random.createRandomNumber(1000, 1),
        }));

    const randomTop10 = randomFollowing.sort((a, b) => b.score - a.score);
    let chosenProfiles: any[] = [];
    for (let i = 0; i < feedNumber; i++) {
        // first 3 are guaranteed
        if (i < 3) {
            chosenProfiles.push(randomTop10[i]);
        } else {
            const index = getRandomIndex();
            if (index === -1) {
                //TODO: fetch a random user from following to push onto
            } else {
                chosenProfiles.push(randomTop10[index]);
            }
        }
    }

    //TODO: pull latest tweets from people, (if duplicate people, pull the next latest tweet)
    let actualFeed: any[] = [];
    return actualFeed;
};

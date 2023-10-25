#####EXAMPLE TODO#####
this is just an example. if a todo needs more stuff,
add it below just like this
when done, just add 2 ~~ on each side of title
~~like this~~



### FRONTEND
# TIER ONE
- ~~fix searchbar onClick with proper onBlur~~
- turn retweet to proper retweet, not a quote (i kinda didnt realize this lol), 
- add <MiniModal/> for page
- - add <MiniModal/> for chooseing to retweet, or quote (retweet is instant)
- add like functionality
- ~~add proper time since post (current is 1hr default)~~
- add 'Edit Profile' functionality
- update following tweets
- fix /media crashing page since the image no longer exists
- - add `validator` for checking invalid URLs
- - add real validator logic for when an image url isnt valid

# TIER TWO
- fix padding on pacman loading on minifeeds on profile
- ~~remove 'child div'~~
- add notifications
- - remove verified tab
- add emojis to tweet
- add scheduling to tweet
- change `MAX_TIME_BEFORE_LITERAL_DATE` to proper 24hrs 
- ~~remove '!' on line 32 of `Tweet.ts` (needs function on line done first)~~

### NEED FROM BACKEND
# TIER ONE
- addLikesToTweet
- randomize feed
- recognize seen feed already
- add `timeCreated` to referenceTweet routes and type
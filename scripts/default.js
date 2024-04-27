import { activities, socials, emotions, energies } from '../config/mongoCollections.js';
import { activityData, socialData, emotionData, energyData } from '../data/dataIndex.js';
import { dbConnection } from '../config/mongoConnection.js';

const initDefaults = async () => {
    try {
        console.log("Initializing emotions...");
        await emotionData.createEmotion("Fantastic", "/public/images/FantasticEmoji.png", 1);
        await emotionData.createEmotion("Good", "/public/images/GoodEmoji.png", 2);
        await emotionData.createEmotion("Meh", "/public/images/MehEmoji.png", 3);
        await emotionData.createEmotion("Bad", "/public/images/BadEmoji.png", 4);
        await emotionData.createEmotion("Awful", "/public/images/AwfulEmoji.png", 5);

        console.log("Initializing activities...");
        await activityData.createActivity("Cooking", "/icons/activities/Cooking.png", ["Indoor"]);
        await activityData.createActivity("Sports", "/icons/activities/Sports.png", ["Outdoor", "Physical", "Fun"]);
        await activityData.createActivity("Video Games", "/icons/activities/VideoGames.png", ["Entertainment", "Fun"]);
        await activityData.createActivity("Chores", "/icons/activities/Chores.png", ["Tasks"]);
        await activityData.createActivity("Cleaning", "/icons/activities/Cleaning.png", ["Tasks"]);
        await activityData.createActivity("Shopping", "/icons/activities/Shopping.png", ["Fun"]);
        await activityData.createActivity("Exercising", "/icons/activities/Exercising.png", ["Physical"]);
        await activityData.createActivity("Homework", "/icons/activities/Homework.png", ["Indoor", "School"]);
        await activityData.createActivity("Reading", "/icons/activities/Reading.png", ["Indoor"]);
        await activityData.createActivity("Painting/Drawing", "/icons/activities/Painting_Drawing.png", ["Indoor"]);
        await activityData.createActivity("Swimming", "/icons/activities/Swimming.png", ["Physical", "Fun"]);

        console.log("Initializing socials...");
        await socialData.createSocial("Friends", "/icons/socials/Friends.png");
        await socialData.createSocial("Family", "/icons/socials/Family.png");

        console.log("Initializing energies...");
        await energyData.createEnergy("Lively", "/icons/energies/excited.png", 1);
        await energyData.createEnergy("Awake", "/icons/energies/awake.png", 2);
        await energyData.createEnergy("Fine", "/icons/energies/meh.png", 3);
        await energyData.createEnergy("Tired", "/icons/energies/tired.png", 4);
        await energyData.createEnergy("Drained", "/icons/energies/exhausted.png", 5);

        console.log("Done initializing");
    } catch (error) {
        console.error("Failed to initialize defaults:", error);
    }
};

initDefaults();
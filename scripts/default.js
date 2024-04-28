import { activities, socials, emotions, energies } from '../config/mongoCollections.js';
import { activityData, socialData, emotionData, energyData } from '../data/dataIndex.js';
import { dbConnection } from '../config/mongoConnection.js';

const initDefaults = async () => {
    try {
        console.log("Initializing emotions...");
        await emotionData.createEmotion("Annoyed", "/public/images/emotions/annoyed.svg", 1);
        await emotionData.createEmotion("Unhappy", "/public/images/emotions/unhappy.svg", 2);
        await emotionData.createEmotion("Content", "/public/images/emotions/content.svg", 3);
        await emotionData.createEmotion("Pleased", "/public/images/emotions/pleased.svg", 4);
        await emotionData.createEmotion("Joyful", "/public/images/emotions/joyful.svg", 5);

        console.log("Initializing activities...");
        await activityData.createActivity("Cooking", "/icons/activities/Cooking.png", "Indoor");
        await activityData.createActivity("Sports", "/icons/activities/Sports.png", "Outdoor");
        await activityData.createActivity("Video Games", "/icons/activities/VideoGames.png", "Entertainment");
        await activityData.createActivity("Chores", "/icons/activities/Chores.png", "Tasks");
        await activityData.createActivity("Cleaning", "/icons/activities/Cleaning.png", "Tasks");
        await activityData.createActivity("Shopping", "/icons/activities/Shopping.png", "Fun");
        await activityData.createActivity("Exercising", "/icons/activities/Exercising.png", "Physical");
        await activityData.createActivity("Homework", "/icons/activities/Homework.png", "Indoor", "School");
        await activityData.createActivity("Reading", "/icons/activities/Reading.png", "Indoor");
        await activityData.createActivity("Painting/Drawing", "/icons/activities/Painting_Drawing.png", "Indoor");
        await activityData.createActivity("Swimming", "/icons/activities/Swimming.png", "Physical");

        console.log("Initializing socials...");
        await socialData.createSocial("Friends", "/icons/socials/Friends.png");
        await socialData.createSocial("Family", "/icons/socials/Family.png");

        console.log("Initializing energies...");
        await energyData.createEnergy("Drained", "darkBlue", 1);
        await energyData.createEnergy("Tired", "lightBlue", 2);
        await energyData.createEnergy("Fine", "neutral", 3);
        await energyData.createEnergy("Awake", "lightYellow", 4);
        await energyData.createEnergy("Lively", "Yellow", 5);

        console.log("Done initializing");
    } catch (error) {
        console.error("Failed to initialize defaults:", error);
    }
};

initDefaults();
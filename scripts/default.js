import { activities, socials, emotions, energies } from '../config/mongoCollections.js';
import { activityData, socialData, emotionData, energyData   } from '../data/dataIndex.js';
import { dbConnection } from '../config/mongoConnection.js';

const initDefaults = async () => {
    try {
        console.log("Initializing emotions");
        await emotionData.createEmotion("Annoyed", "/icons/emotions/miserable.png", 1);
        await emotionData.createEmotion("Unhappy", "/icons/emotions/unhappy.png", 2);
        await emotionData.createEmotion("Content", "/icons/emotions/content.png", 3);
        await emotionData.createEmotion("Pleased","/icons/emotions/great.png", 4);
        await emotionData.createEmotion("Joyful", "/icons/emotions/joyful.png", 5);

        console.log("Initializing activities");
        await activityData.createActivity("Jogging", "/icons/activities/jogging.png", ["Physical", "Outdoor"]);
        await activityData.createActivity("Gym", "/icons/activities/gym.png", ["Physical"]);
        await activityData.createActivity("Homework", "/icons/activities/homework.png", ["Indoor", "School"]);

        console.log("Initializing socials");
        await socialData.createSocial("Friends", "/icons/socials/friends.png");
        await socialData.createSocial("Family", "/icons/socials/family.png");

        console.log("Initializing energies");
        await energyData.createEnergy("Drained", "/icons/energies/exhausted.png", 1);
        await energyData.createEnergy("Tired", "/icons/energies/tired.png", 2);
        await energyData.createEnergy("Fine", "/icons/energies/meh.png", 3);
        await energyData.createEnergy("Awake", "/icons/energies/awake.png", 4);
        await energyData.createEnergy("Lively", "/icons/energies/excited.png", 5);

    } catch (error) {
        console.error("Failed to initialize defaults:", error);
    }
};

initDefaults();
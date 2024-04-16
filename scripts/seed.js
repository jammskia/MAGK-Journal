import { ObjectId } from 'mongodb';
import { entryData, activityData, socialData, emotionData, energyData } from '../data/dataIndex.js';
import { entries } from '../config/mongoCollections.js';
import { dbConnection } from '../config/mongoConnection.js';


// make sure to either run defaults.js if you're doing it this way, else make your own traits
///////// EMOTIONS
const annoyed = await emotionData.getEmotionByLabel("Annoyed");
const unhappy = await emotionData.getEmotionByLabel("Unhappy");
const content = await emotionData.getEmotionByLabel("Content");
const pleased = await emotionData.getEmotionByLabel("Pleased");
const joyful = await emotionData.getEmotionByLabel("Joyful");

///////// ENERGIES
const drained = await energyData.getEnergyByLabel("Drained");
const tired = await energyData.getEnergyByLabel("Tired");
const fine = await energyData.getEnergyByLabel("Fine");
const awake = await energyData.getEnergyByLabel("Awake");
const lively = await energyData.getEnergyByLabel("Lively");

///////// ACTIVITIES
const jogging = await activityData.getActivityByLabel("Jogging");
const gym = await activityData.getActivityByLabel("Gym");
const homework = await activityData.getActivityByLabel("Homework");

///////// SOCIALS
const friends = await socialData.getSocialByLabel("Friends");
const family = await socialData.getSocialByLabel("Family");

///////// USERS
// TODO
const sampleUsers = [
    { _id: new ObjectId(), username: "user1", email: "user1@example.com" },
    { _id: new ObjectId(), username: "user1", email: "user1@example.com" },
];

///////// ENTRIES
const sampleEntries = [
    {
        userId: sampleUsers[0]._id.toString(),
        date: new Date('2024-04-15'),
        emotionId: joyful._id.toString(),
        energyId: awake._id.toString(),
        activities: [gym._id.toString()],
        socials: [friends._id.toString()],
        notes: "I feel great!"
    }, 
    {
        userId: sampleUsers[0]._id.toString(),
        date: new Date('2024-04-14'),
        emotionId: joyful._id.toString(),
        energyId: lively._id.toString(),
        activities: [jogging._id.toString()],
        socials: [friends._id.toString()],
        notes: "I love CS546"
    },

    {
        userId: sampleUsers[1]._id.toString(),
        date: new Date('2024-01-01'),
        emotionId: annoyed._id.toString(),
        energyId: tired._id.toString(),
        activities: [],
        socials: [],
        notes: "I hate life"
    }
];

// to test out the date functions:
const sampleDateEntries = [
    { 
        _id: new ObjectId(), 
        userId: sampleUsers[0]._id.toString(), 
        date: new Date('2024-01-01T12:00:00Z'), 
        notes: "Happy New Year" 
    },
    { 
        _id: new ObjectId(), 
        userId: sampleUsers[0]._id.toString(), 
        date: new Date('2024-02-14T12:00:00Z'), 
        notes: "Valentine's Day" 
    },
];

const seedEntries = async () => {
    const createdEntries = []; 
    try {
        // create the entries
        for (const sampleEntry of sampleEntries) {
            const createdEntry = await entryData.createEntry(
                sampleEntry.userId, 
                sampleEntry.emotionId,
                sampleEntry.energyId,  
                sampleEntry.activities, 
                sampleEntry.socials,
                sampleEntry.notes
            );
            console.log("Created Entry:", createdEntry);
            createdEntries.push(createdEntry);
        }

        // update the entry
        if (createdEntries.length > 0) {
            const updateObject = {
                notes: "Nevermind",
                activities: [homework._id.toString()],
                socials: [],
            };

            const updatedEntry = await entryData.updateEntry(
                createdEntries[0].userId.toString(),
                createdEntries[0]._id.toString(),
                updateObject
            );

            console.log("Updated Entry:", updatedEntry);

            //// test out the dates
            console.log("Got entry by date:")
            console.log(await entryData.getEntryByDate(sampleUsers[0]._id.toString(),"2024-04-16"));

            // month function:
            const entryCollection = await entries();
            await entryCollection.insertMany(sampleDateEntries);
            console.log("Fake entries inserted");

            const februaryEntries = await entryData.getEntriesByMonth(sampleUsers[0]._id.toString(), '2024', 'February');
            console.log("February entries:", februaryEntries);
        }

        console.log("Entries seeded successfully");

    } catch (e) {
        console.log("Error seeding entries", e);
    }
};

///////// EXECUTION
const seedDatabase = async () => {
    try {
        await seedEntries();
        console.log("Database seeded successfully.");

    } catch (e) {
        console.error("Error during database seeding:", e);
    }
}

seedDatabase();

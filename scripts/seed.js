import { ObjectId } from 'mongodb';
import { activities, entries, socials, users } from '../config/mongoCollections.js';
import { entryData } from '../data/dataIndex.js';
import { dbConnection } from '../config/mongoConnection.js';

const emotionId1 = new ObjectId();
const emotionId2 = new ObjectId();
const energyId1 = new ObjectId();
const energyId2 = new ObjectId();

const activityId1 = new ObjectId();
const activityId2 = new ObjectId();
const activityId3 = new ObjectId();
const socialId = new ObjectId();

///////// USERS
const sampleUsers = [
    { _id: new ObjectId(), username: "user1", email: "user1@example.com" },
    { _id: new ObjectId(), username: "user1", email: "user1@example.com" },
];

///////// ENTRIES
const sampleEntries = [
    {
        userId: sampleUsers[0]._id,
        date: new Date('2024-04-15'),
        emotionId: emotionId1.toString(),
        energyId: energyId1.toString(),
        activities: [activityId1.toString(), activityId2.toString()],
        socials: [socialId.toString()],
        notes: "I feel great! I love coding!"
    }, 
    {
        userId: sampleUsers[0]._id,
        date: new Date('2024-04-14'),
        emotionId: emotionId1.toString(),
        energyId: energyId1.toString(),
        activities: [activityId3.toString()],
        socials: [],
        notes: "I love CS546"
    },

    {
        userId: sampleUsers[1]._id,
        date: new Date('2024-01-01'),
        emotionId: emotionId2.toString(),
        energyId: energyId2.toString(),
        activities: [],
        socials: [],
        notes: "I hate life"
    }
];

const seedEntries = async () => {
    try {
        // create the entries
        const createdEntry1 = await entryData.createEntry(
            sampleEntries[0].userId.toString(), 
            sampleEntries[0].emotionId.toString(),
            sampleEntries[0].energyId.toString(),  
            sampleEntries[0].activities, 
            sampleEntries[0].socials,
            sampleEntries[0].notes
        );
        console.log("Created Entry:", createdEntry1);

        const createdEntry2 = await entryData.createEntry(
            sampleEntries[1].userId.toString(), 
            sampleEntries[1].emotionId.toString(),
            sampleEntries[1].energyId.toString(), 
            sampleEntries[1].activities, 
            sampleEntries[1].socials,
            sampleEntries[1].notes
        );
        console.log("Created Entry:", createdEntry2);

        const createdEntry3 = await entryData.createEntry(
            sampleEntries[2].userId.toString(), 
            sampleEntries[2].emotionId.toString(), 
            sampleEntries[2].energyId.toString(),
            sampleEntries[2].activities, 
            sampleEntries[2].socials,
            sampleEntries[2].notes
        );
        console.log("Created Entry:", createdEntry3);


        // update the entry
        const updateObject = {
            notes: "Nevermind",
            activities: [activityId1.toString()],
            socials: [],
        };

        const updatedEntry = await entryData.updateEntry(
            createdEntry1.userId.toString(),
            createdEntry1._id.toString(),
            updateObject
        );

        console.log("Updated Entry:", updatedEntry);
        console.log("Entries seeded successfully")

    } catch (e) {
        console.log("Error seeding entries", e);
    }
}

// const seedDefaultAES  = async () => {
//     try {
//         const 

//     } catch (e) {
//         console.log("Error seeding defaults", e);
//     }
// }


///////// EXECUTION
const seedDatabase = async () => {
    try {
        // drop the db
        const db = await dbConnection();
        await db.dropDatabase();

        console.log("Database cleared.");

        // seedDddDDDDD
        await seedEntries();
        console.log("Database seeded successfully.");

    } catch (e) {
        console.error("Error during database seeding:", e);
    }
}

seedDatabase();



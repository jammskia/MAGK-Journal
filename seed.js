import { ObjectId } from 'mongodb';
import { activities, entries, socials, users } from './config/mongoCollections.js';
import { entryData } from './data/dataIndex.js';
import { dbConnection } from './config/mongoConnection.js';

const emotionId1 = new ObjectId();
const emotionId2 = new ObjectId();
const activityId1 = new ObjectId();
const activityId2 = new ObjectId();
const activityId3 = new ObjectId();
const socialId = new ObjectId();

const sampleUsers = [
    { _id: new ObjectId(), username: "user1", email: "user1@example.com" },
    { _id: new ObjectId(), username: "user1", email: "user1@example.com" },
];

const sampleEntries = [
    {
        userId: sampleUsers[0]._id,
        date: new Date('2024-04-15'),
        emotionId: emotionId1.toString(),
        activities: [activityId1.toString(), activityId2.toString()],
        socials: [socialId.toString()],
        notes: "I feel great! I love coding!"
    }, 
    {
        userId: sampleUsers[0]._id,
        date: new Date('2024-04-14'),
        emotionId: emotionId1.toString(),
        activities: [activityId3.toString()],
        socials: [],
        notes: "I love CS546"
    },

    {
        userId: sampleUsers[1]._id,
        date: new Date('2024-01-01'),
        emotionId: emotionId2.toString(),
        activities: [],
        socials: [],
        notes: "I hate life"
    }
];

const seedEntries = async () => {
    try {
        for (const entry of sampleEntries) {
            await entryData.createEntry(
                entry.userId.toString(),
                entry.emotionId,
                entry.activities,
                entry.socials,
                entry.notes
            );
        }
        console.log("Entries seeded successfully")
    } catch (e) {
        console.log("Error seeding database:", e);
    }
}

const seedDatabase = async () => {
    await seedEntries();
}

seedDatabase();
import { entryData, activityData, socialData, emotionData, energyData, userData } from '../data/dataIndex.js';
import { dbConnection } from '../config/mongoConnection.js';


// make sure to run defaults.js if you're doing it this way, else make your own defaults

/*
to retrieve and instantiate specific default, do something like this:

const drained = await energyData.getEnergyByLabel("Drained");
const tired = await energyData.getEnergyByLabel("Tired");
...
*/

///////// EMOTIONS
const emotions = await emotionData.getAllEmotions();
const emotionIds = [];

for (let i = 0; i < emotions.length; i++) {
    emotionIds.push(emotions[i]._id.toString());
}

///////// ENERGIES
const energies = await energyData.getAllEnergies();
const energyIds = [];

for (let i = 0; i < energies.length; i++) {
    energyIds.push(energies[i]._id.toString());
}

///////// ACTIVITIES
const activities = await activityData.getAllActivities();
const activityIds = [];

for (let i = 0; i < activities.length; i++) {
    activityIds.push(activities[i]._id.toString());
}

///////// SOCIALS
const socials = await socialData.getAllSocials();
const socialIds = [];

for (let i = 0; i < socials.length; i++) {
    socialIds.push(socials[i]._id.toString());
}

///////// USERS
// Test Users
let newUser1 = null;
let newUser2 = null;

const seedUsers = async () => {
    console.log("Initializing users...");
    newUser1 = await userData.createUser("Carly Hopkins", "CHopkins@gmail.com", "Password123", "01/10/2002");
    console.log(newUser1);
    newUser2 = await userData.createUser("John Bryant", "JBryant23@gmail.com", "Password123", "04/22/2003");
    console.log(newUser2);
}

try {
    await seedUsers();
    console.log("Users added successfully.");
} catch (e) {
    console.error("Error while adding users: ", e);
}



///////// ENTRIES
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const notes = [
    "Today was a day of simple pleasures. I spent the morning sipping coffee and watching the sunrise, feeling a sense of calm wash over me. In the afternoon, I took a leisurely walk in the park, enjoying the beauty of nature and the crisp autumn air.",
    "Another day, another adventure. Today, I decided to try a new hobby and spent the afternoon painting. It was so therapeutic to let my creativity flow onto the canvas. In the evening, I treated myself to a homemade dinner and a good book.",
    "A day filled with laughter and joy. I met up with friends for a picnic in the park, and we spent hours reminiscing about old times and making new memories. As the sun set, we lit a bonfire and shared stories under the starry sky.",
    "Today was a productive day. I tackled some long overdue tasks and felt a great sense of accomplishment. In the evening, I treated myself to a relaxing bath and some well-deserved self-care.",
    "A day of exploration and discovery. I visited a new museum in town and spent hours admiring the artwork. Afterwards, I wandered the streets, taking in the sights and sounds of the city.",
    "Today was a day of reflection. I spent some time alone, journaling about my thoughts and feelings. It was a therapeutic experience that helped me gain clarity and perspective.",
    "A day spent in nature. I went hiking in the mountains and was awestruck by the beauty of the landscape. It was a challenging hike, but the breathtaking views made it all worth it.",
    "Today was a day of creativity. I spent the day working on a new art project and was thrilled with the results. In the evening, I shared my work with friends and received their support and encouragement.",
    "A day of learning and growth. I attended a workshop on a topic that has always interested me and came away feeling inspired and motivated. I can't wait to apply what I've learned to my own life.",
    "Today was a day of celebration. I attended a friend's birthday party and had a wonderful time catching up with old friends and making new ones. It was a reminder of how important it is to cherish the people in our lives.",
    "A day of challenges. I faced some obstacles today, but I didn't let them get me down. Instead, I tackled them head on and came out stronger on the other side.",
    "Today was a day of relaxation. I spent the day lounging by the pool, soaking up the sun and enjoying the peaceful surroundings. It was the perfect way to recharge my batteries.",
    "A day of giving back. I volunteered at a local charity and spent the day helping those in need. It was a humbling experience that reminded me of the importance of kindness and compassion.",
    "Today was a day of inspiration. I read a book that touched my soul and left me feeling inspired and motivated. It was a reminder of the power of words to uplift and inspire.",
    "A day of adventure. I went on a spontaneous road trip with friends and explored new places. It was a day filled with laughter, excitement, and unforgettable memories.",
    "Today was a day of self-care. I treated myself to a spa day and indulged in some much-needed relaxation. It was a reminder to prioritize my own well-being.",
    "A day of gratitude. I spent the day reflecting on all the blessings in my life and feeling grateful for everything I have. It was a reminder to appreciate the little things.",
    "Today was a day of learning. I took a class on a subject I've always been curious about and came away with a new perspective. It was a reminder of the importance of lifelong learning.",
    "A day of new beginnings. I started a new chapter in my life today and felt a mix of excitement and nervousness. It was a reminder that change can be a beautiful thing.",
    "Today was a day of connection. I spent quality time with loved ones and strengthened my bonds with them. It was a reminder of the importance of nurturing relationships.",
    "A day of creativity. I spent the day working on a new project and was thrilled with the results. It was a reminder of the joy that comes from expressing oneself.",
    "Today was a day of adventure. I tried something new and stepped out of my comfort zone. It was a reminder that life is meant to be lived to the fullest.",
    "A day of inspiration. I came across a quote that resonated with me and inspired me to pursue my dreams. It was a reminder of the power of words to motivate and uplift.",
    "Today was a day of reflection. I spent some quiet time alone, reflecting on the past and envisioning the future. It was a reminder of the importance of self-reflection.",
    "A day of gratitude. I took time to appreciate the beauty of the world around me and felt a deep sense of gratitude. It was a reminder to be thankful for the little things in life.",
    "Today was a day of growth. I faced a challenge that pushed me out of my comfort zone and helped me grow as a person. It was a reminder that challenges can lead to personal development.",
    "A day of connection. I spent the day with friends and family, laughing and making memories. It was a reminder of the importance of social connections.",
    "Today was a day of adventure. I explored a new place and tried new things. It was a reminder of the excitement that comes from stepping into the unknown.",
    "A day of relaxation. I took a break from the hustle and bustle of life and spent the day unwinding. It was a reminder of the importance of self-care.",
    "Today was a day of inspiration. I came across a story that touched my heart and inspired me to be a better person. It was a reminder of the power of storytelling.",
    "A day of learning. I attended a workshop that expanded my horizons and taught me something new. It was a reminder of the joy of learning.",
    "Today was a day of reflection. I took some time to reflect on my goals and aspirations. It was a reminder of the importance of setting intentions.",
    "A day of gratitude. I took stock of all the blessings in my life and felt a deep sense of gratitude. It was a reminder to appreciate the abundance around me.",
    "Today was a day of growth. I faced a fear head-on and came out stronger on the other side. It was a reminder that growth often comes from facing challenges.",
    "A day of connection. I spent quality time with loved ones and strengthened my relationships. It was a reminder of the importance of nurturing connections.",
    "Today was a day of creativity. I worked on a project that allowed me to express myself creatively. It was a reminder of the joy that comes from creative expression.",
    "A day of inspiration. I came across a piece of art that moved me deeply and inspired me to see the world in a new way. It was a reminder of the power of art to evoke emotion.",
    "Today was a day of reflection. I took some time to reflect on my past experiences and how they have shaped me. It was a reminder of the importance of self-awareness.",
    "A day of gratitude. I spent the day focusing on all the things I have to be grateful for. It was a reminder of the abundance in my life.",
    "Today was a day of growth. I pushed myself to try something new and discovered a new passion. It was a reminder of the importance of stepping out of my comfort zone.",
];


const sampleEntries = [];
let entryDate = new Date().toISOString().split('T')[0];

for (let i = 0; i < 40; i++) {
    const date = new Date(entryDate);
    date.setDate(date.getDate() - 1);
    entryDate = date.toISOString().split('T')[0]
    let activities = [activityIds[getRandomNumber(0, activityIds.length - 1)], activityIds[getRandomNumber(0, activityIds.length - 1)], activityIds[getRandomNumber(0, activityIds.length - 1)]];
    let uniqueActvities = [...new Set(activities)];
    sampleEntries.push({
        userId: newUser1._id.toString(),
        date: entryDate,
        title: "Untitled",
        emotionId: emotionIds[getRandomNumber(0, emotionIds.length - 1)],
        energyId: energyIds[getRandomNumber(0, energyIds.length - 1)],
        activities: uniqueActvities,
        socials: [socialIds[getRandomNumber(0, socialIds.length - 1)]],
        notes: notes[i]
    });
}

const seedEntries = async () => {
    const createdEntries = [];
    try {
        // create the entries
        for (const sampleEntry of sampleEntries) {
            const createdEntry = await entryData.createEntry(
                sampleEntry.userId,
                sampleEntry.date,
                sampleEntry.title,
                sampleEntry.emotionId,
                sampleEntry.energyId,
                sampleEntry.activities,
                sampleEntry.socials,
                sampleEntry.notes
            );
            createdEntries.push(createdEntry);
        }

        // update an entry
        if (createdEntries.length > 0) {
            const updateObject = {
                notes: "Nevermind",
                activities: [activityIds[0]],
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
            console.log(await entryData.getEntryByDate(newUser1._id.toString(), "2024-04-16"));
        }
        console.log("Entries seeded successfully.");

    } catch (e) {
        console.log("Error seeding entries", e);
    }
};

///////// EXECUTION
const seedDatabase = async () => {
    try {
        await seedEntries();
        console.log("Database seeded successfully.");
        process.exit();
    } catch (e) {
        console.error("Error during database seeding:", e);
    }
}

seedDatabase();

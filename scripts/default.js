import { activityData, socialData, emotionData, energyData } from '../data/dataIndex.js';

const initDefaults = async () => {
    try {
        ///////// EMOTIONS
        console.log("Initializing emotions...");
        await emotionData.createEmotion("Annoyed", "/public/images/emotions/annoyed.svg", 1);
        await emotionData.createEmotion("Unhappy", "/public/images/emotions/unhappy.svg", 2);
        await emotionData.createEmotion("Content", "/public/images/emotions/content.svg", 3);
        await emotionData.createEmotion("Pleased", "/public/images/emotions/pleased.svg", 4);
        await emotionData.createEmotion("Joyful", "/public/images/emotions/joyful.svg", 5);

        ///////// ENERGIES
        console.log("Initializing energies...");
        await energyData.createEnergy("Drained", "darkBlue", 1);
        await energyData.createEnergy("Tired", "lightBlue", 2);
        await energyData.createEnergy("Fine", "neutral", 3);
        await energyData.createEnergy("Awake", "lightYellow", 4);
        await energyData.createEnergy("Lively", "Yellow", 5);

        ///////// ACTIVITIES
        console.log("Initializing activities...");
        // Hobbies
        await activityData.createActivity("Arts & Crafts", "/icons/activities/arts_crafts.png", "Hobbies");
        await activityData.createActivity("Baking", "/icons/activities/Baking.png", "Hobbies");
        await activityData.createActivity("Drawing", "/icons/activities/Drawing.png", "Hobbies");
        await activityData.createActivity("Film-making", "/icons/activities/Film-making.png", "Hobbies");
        await activityData.createActivity("Gardening", "/icons/activities/Gardening.png", "Hobbies");
        await activityData.createActivity("Knitting", "/icons/activities/Knitting.png", "Hobbies");
        await activityData.createActivity("Painting", "/icons/activities/Painting.png", "Hobbies");
        await activityData.createActivity("Photography", "/icons/activities/Photography.png", "Hobbies");
        await activityData.createActivity("Playing Music", "/icons/activities/playing_music.png", "Hobbies");
        await activityData.createActivity("Programming", "/icons/activities/arts_crafts.png", "Hobbies");
        await activityData.createActivity("Web Design", "/icons/activities/web_design.png", "Hobbies");
        await activityData.createActivity("Writing", "/icons/activities/Writing.png", "Hobbies");

        // Entertainment
        await activityData.createActivity("Board Games", "/icons/activities/BoardGames.png", "Entertainment");
        await activityData.createActivity("Card Games", "/icons/activities/CardGames.png", "Entertainment");
        await activityData.createActivity("Dancing", "/icons/activities/Dancing.png", "Entertainment");
        await activityData.createActivity("Listening to Music", "/icons/activities/Music.png", "Entertainment");
        await activityData.createActivity("Movies", "/icons/activities/Movies.png", "Entertainment");
        await activityData.createActivity("Reading", "/icons/activities/Reading.png", "Entertainment");
        await activityData.createActivity("Shopping", "/icons/activities/Shopping.png", "Entertainment");
        await activityData.createActivity("Singing", "/icons/activities/Singing.png", "Entertainment");
        await activityData.createActivity("TV/Shows", "/icons/activities/shows.png", "Entertainment");
        await activityData.createActivity("Toys", "/icons/activities/Toys.png", "Entertainment");
        await activityData.createActivity("Video Games", "/icons/activities/VideoGames.png", "Entertainment");

        // Physical
        await activityData.createActivity("Dance & Aerobics", "/icons/activities/Dance_Aerobics.png", "Physical");
        await activityData.createActivity("Driving Sports", "/icons/activities/CarSports.png", "Physical");
        await activityData.createActivity("Exercising", "/icons/activities/Exercising.png", "Physical");
        await activityData.createActivity("Gym", "/icons/activities/Gym.png", "Physical");
        await activityData.createActivity("Martial Arts", "/icons/activities/Martial_Arts.png", "Physical");
        await activityData.createActivity("Team Sports", "/icons/activities/TeamSports.png", "Physical");
        await activityData.createActivity("Track & Field", "/icons/activities/Track_and_Field.png", "Physical");
        await activityData.createActivity("Water Sports", "/icons/activities/WaterSports.png", "Physical");

        // Outdoor
        await activityData.createActivity("Animals", "/icons/activities/Animals.png", "Outdoor");
        await activityData.createActivity("Astronomy", "/icons/activities/Astronomy.png", "Outdoor");
        await activityData.createActivity("Camping", "/icons/activities/Camping.png", "Outdoor");
        await activityData.createActivity("Extreme Sports", "/icons/activities/Extreme_Sports.png", "Outdoor");
        await activityData.createActivity("Farming", "/icons/activities/Farming.png", "Outdoor");
        await activityData.createActivity("Fishing", "/icons/activities/Fishing.png", "Outdoor");
        await activityData.createActivity("Hiking", "/icons/activities/Hiking.png", "Outdoor");
        await activityData.createActivity("Hunting", "/icons/activities/Camping.png", "Outdoor");
        await activityData.createActivity("Picnicking", "/icons/activities/Picnicking.png", "Outdoor");
        await activityData.createActivity("Walking", "/icons/activities/Walking.png", "Outdoor");
        await activityData.createActivity("Water Exploration", "/icons/activities/Water_Exploration.png", "Travel");

        // Educational
        await activityData.createActivity("Class", "/icons/activities/Class.png", "Educational");
        await activityData.createActivity("Clubs", "/icons/activities/Clubs.png", "Educational");
        await activityData.createActivity("Homework", "/icons/activities/Homework.png", "Educational");
        await activityData.createActivity("Lecture", "/icons/activities/Lecture.png", "Educational");
        await activityData.createActivity("Online Courses", "/icons/activities/OnlineCourses.png", "Educational");
        await activityData.createActivity("Projects", "/icons/activities/Projects.png", "Educational");
        await activityData.createActivity("Workshops", "/icons/activities/Workshops.png", "Educational");

        // Work
        await activityData.createActivity("Business Trip", "/icons/activities/CityTours.png", "Work");
        await activityData.createActivity("Meeting", "/icons/activities/Meeting.png", "Work");
        await activityData.createActivity("Training", "/icons/activities/Training.png", "Work");
        
        // Tasks
        await activityData.createActivity("Banking", "/icons/activities/Banking.png", "Tasks");
        await activityData.createActivity("Cleaning", "/icons/activities/Cleaning.png", "Tasks");
        await activityData.createActivity("Cooking", "/icons/activities/Cooking.png", "Tasks");
        await activityData.createActivity("Groceries", "/icons/activities/Groceries.png", "Tasks");
        await activityData.createActivity("Home Repairs", "/icons/activities/HomeRepairs.png", "Tasks");
        await activityData.createActivity("Laundry", "/icons/activities/Laundry.png", "Tasks");
        await activityData.createActivity("Organization", "/icons/activities/Organization.png", "Tasks");
        await activityData.createActivity("Vehicle Maintenance", "/icons/activities/VehicleMaintenance.png", "Tasks");

        // Community
        await activityData.createActivity("Charity Work", "/icons/activities/CharityWork.png", "Community");
        await activityData.createActivity("Local Events", "/icons/activities/LocalEvents.png", "Community");
        await activityData.createActivity("Public Speaking", "/icons/activities/PublicSpeaking.png", "Community");
        await activityData.createActivity("Religious Activities", "/icons/activities/ReligiousActivities.png", "Community");
        await activityData.createActivity("Volunteering", "/icons/activities/Volunteering.png", "Community");

        // Travel
        await activityData.createActivity("Airplane Ride", "/icons/activities/Airplane.png", "Travel");
        await activityData.createActivity("City Tours", "/icons/activities/CityTours.png", "Travel");
        await activityData.createActivity("Cruise Trip", "/icons/activities/Cruise.png", "Travel");
        await activityData.createActivity("Road Trips", "/icons/activities/RoadTrips.png", "Travel");
        await activityData.createActivity("Sightseeing", "/icons/activities/Sightseeing.png", "Travel");
        await activityData.createActivity("Vacation", "/icons/activities/Vacation.png", "Travel");

        // Events
        await activityData.createActivity("Ceremony", "/icons/activities/Ceremony.png", "Events");
        await activityData.createActivity("Concert", "/icons/activities/Concert.png", "Events");
        await activityData.createActivity("Dating", "/icons/activities/Dating.png", "Events");
        await activityData.createActivity("Festivals", "/icons/activities/Festivals.png", "Events");
        await activityData.createActivity("Party", "/icons/activities/Party.png", "Events");
        await activityData.createActivity("Sports", "/icons/activities/Sports.png", "Events");
        await activityData.createActivity("Wedding", "/icons/activities/Wedding.png", "Events");

        // Wellness
        await activityData.createActivity("Haircut", "/icons/activities/Haircut.png", "Wellness");
        await activityData.createActivity("Meditation", "/icons/activities/Meditation.png", "Wellness");
        await activityData.createActivity("Massage", "/icons/activities/Massage.png", "Wellness");
        await activityData.createActivity("Makeover", "/icons/activities/Makeover.png", "Wellness");
        await activityData.createActivity("Resting", "/icons/activities/Meditation.png", "Wellness");
        await activityData.createActivity("Spa Day", "/icons/activities/Spa.png", "Wellness");

        ///////// SOCIALS
        console.log("Initializing socials...");
        await socialData.createSocial("Classmates", "/icons/socials/Classmates.png");
        await socialData.createSocial("Coworkers", "/icons/socials/Coworkers.png");
        await socialData.createSocial("Close Family", "/icons/socials/Family.png");
        await socialData.createSocial("Extended Family", "/icons/socials/Family.png");
        await socialData.createSocial("Children", "/icons/socials/Children.png");
        await socialData.createSocial("Partner", "/icons/socials/Partner.png");
        await socialData.createSocial("Significant Other", "/icons/socials/SignificantOther.png");
        await socialData.createSocial("Friends", "/icons/socials/Friends.png");
        await socialData.createSocial("Best Friends", "/icons/socials/Friends.png");
        await socialData.createSocial("Pets", "/icons/socials/Pets.png");
        await socialData.createSocial("Acquaintances", "/icons/socials/Acquaintances.png");
        await socialData.createSocial("Strangers", "/icons/socials/Strangers.png");
        
        console.log("Done initializing.");
        process.exit();
    } catch (error) {
        console.error("Failed to initialize defaults:", error);
    }
};

initDefaults();
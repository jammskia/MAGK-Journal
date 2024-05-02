///////////// FOR RANDOMIZED HEADINGS 
// titles

export const headings = {
    userGreetings: [
        "Make sure to make an entry today!",
        "Don't forget to reflect on your day!",
        "What's the highlight of your day so far?",
        "Hope you're ready to jot down today's experiences!",
        "Let's capture today's moments together!",
        "Got something to share? Your journal awaits!",
        "Remember to log your day!",
        "It's a great day to document your journey!",
        "How was your day? Let's hear it!",
        "Time to unwind and scribble down your thoughts!"
    ],

    greetingPrefixes: [
        "Hi",
        "Hey",
        "Hello",
        "Greetings",
        "Welcome",
        "Good to see you",
        "Howdy",
        "Hi there",
        "Hey there",
        "Hello there"
    ],

    titleMainHeadings: [
        "Today's Headliner:",
        "Name This Entry",
        "Chapter ____?"
    ],
    titleSubHeadings: [
        "Give it a title that stands out.",
        "Label your day with something memorable.",
    ],
    
    // emotions
    emotionMainHeadings: [
        "What's your mood today?",
        "How do you feel?",
        "Capture your current emotion.",
        "Your mood.",
        "How's your state of mind?"
    ],
    emotionSubHeadings: [
        "Choose the icon that resonates with you.",
        "Which face matches your vibe?",
        "Click the emoji that feels best.",
        "Mark the one you feel most."
    ],
    
    // energies
    energyMainHeadings: [
        "Rate your Energy Level.",
        "How energized are you?",
        "Assess your energy!",
        "Energy check!"
    ],
    energySubHeadings: [
        "Select the level that mirrors your energy.",
        "Choose a bar that matches your zest.",
        "Pick a point on the bar.",
        "Where's your power level at?",
        "How much juice do you have left?"
    ],
    
    // activities
    activityMainHeadings: [
        "Daily Deeds: What did you do?",
        "Activity roll call!",
        "Log your actions.",
        "Recount the day's activities.",
        "Activity overview!"
    ],
    activitySubHeadings: [
        "Mark all that apply.",
        "Tick the boxes of your ventures.",
        "Select your undertakings.",
        "Chronicle today's journey."
    ],
    
    // socials
    socialMainHeadings: [
        "Social Spectrum:",
        "Today's Companions.",
        "Social Circle check-in!",
        "Connection Inventory!"
    ],
    socialSubHeadings: [
        "Choose who shared the day with you.",
        "Who were you with?",
        "Name your partners.",
        "Who was along for the ride?",
        "Who were your adventure pals?",
    ],
    
    // notes
    notesMainHeadings: [
        "Jot down your notes.",
        "Daily Digest",
        "Snapshot of the Day."
    ],
    notesSubHeadings: [
        "Scribe your thoughts and experiences.",
        "Archive today's high and lowlights...",
        "Pen not needed! Write down the narrative!",
        "Document key occurrences."
    ]
}

export const routeHelpers = {
    getRandomHeading(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    randomizeHeadings() {
        return {
            userGreetings: this.getRandomHeading(headings.userGreetings),
            greetingPrefixes: this.getRandomHeading(headings.greetingPrefixes),
            titleMainHeading: this.getRandomHeading(headings.titleMainHeadings),
            titleSubHeading: this.getRandomHeading(headings.titleSubHeadings),
            emotionMainHeading: this.getRandomHeading(headings.emotionMainHeadings),
            emotionSubHeading: this.getRandomHeading(headings.emotionSubHeadings),
            energyMainHeading: this.getRandomHeading(headings.energyMainHeadings),
            energySubHeading: this.getRandomHeading(headings.energySubHeadings),
            activityMainHeading: this.getRandomHeading(headings.activityMainHeadings),
            activitySubHeading: this.getRandomHeading(headings.activitySubHeadings),
            socialMainHeading: this.getRandomHeading(headings.socialMainHeadings),
            socialSubHeading: this.getRandomHeading(headings.socialSubHeadings),
            notesMainHeading: this.getRandomHeading(headings.notesMainHeadings),
            notesSubHeading: this.getRandomHeading(headings.notesSubHeadings),
        }
    }
};

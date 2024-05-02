# MAGK Journal

This was a team project for `CS 545 at Stevens Institute of Technology, Spring 2024. The members were: 
- Ronald Arvanites
- Joshua George
- Thomas Kwon
- Justerini Mejia
- Joshua Prasad

## Project Description
MAGK is a journal website where users can write entries that summarize their day. They can record emotions, energy levels, activities, and social interactions. It features a MoodMeter for visualizing emotional trends over time and additional analytics.

### Features
Each entry is encompassed of 6 things.  

| Value      | Required | How Many  | Description                                                                                                                  |
|------------|----------|-----------|------------------------------------------------------------------------------------------------------------------------------|
| Title      |          | As Long   | Entries can be labeled to differentiate special days/events or left untitled. The entry would then be identified by the date |
| Emotion    | &check;  | One       | Emotions are rated from 1 (Annoyed) to 5 (Joyful) and represented as icons.                                                  |
| Energy     | &check;  | One       | Energy levels are rated from 1 (Drained) to 5 (Lively) and represented as a bar.                                             |
| Activities |          | As Many   | Represent *what* the user does over the day, grouped into related categories.                                                |
| Socials    |          | As Many   | Represent *who* the user interacts with over the day.                                                                        |  
| Notes      |          | As Long   | Additional notes if the other values do not fully capture the day's story.                                                   |

## How to Run
1. **Clone the repository:**  
Use git or download the zip. 

2. **Install the needed packages:**
```
npm install
```

3. **Connect to MongoDB and populate the Database:**  

    1. **Set up the default values** (emotions, energies, activities, socials):
        ```
        npm run default
        ```

        This will populate the database with default configurations and ensure that the website has the necessary data to function properly. At this point, it's ready to use, and you can start creating entries.  
        
    2. **Seed the database with sample entries:**
        This is optional if you want to test the website with pre-filled data. This is a quick way to preview the MoodMeter.
        ```
        npm run seed
        ```

    3. **Reset the Database:**
        You can do this at any point.
        ```
        npm run reset
        ```

4. **Run the program:**  
```
npm start
```
Follow the link that pops up on the terminal or go to `localhost:3000` on a browser.

## Using the Website

### Entries
Here, you can see all your past entries and create new ones.

#### Creating Entries
Click the `Create a New Entry` button at the top of the main entries page or the `+` at the bottom right of most pages. You are then prompted to enter a title, an emotion, an energy level, activities, social interactions, and notes.  

After you're done picking, hit `Submit Entry` and you should be viewing the entry you just created.

#### Viewing Entries
If you are on the main entries page, you can view a specific entry by hitting the `View` button on a past entry.  

You should then be able to see the information that you inputted for that entry.  

Additionally, you can choose to edit or delete the entry by hitting the corresponding buttons at the bottom. 
- The Edit process is exactly the same as the Create process. 
- The Delete, of course, removes the entry.

### MoodMeter
Here, you can see all the analytics generated from all your existing entries. At the top, you can set a range of dates to analyze.

#### Emotion Chart
Your emotion over time is represented as a line graph.

#### Activity Podium
Your Top 3 Commonly Done Activities are represented in an Olympic-style Podium. Ties are of course represented.

#### General Statistics
Alongside the two graphics, you can also review some more straightforward statistics.
- Average Emotion
- Average Energy
- Most Interacted Social
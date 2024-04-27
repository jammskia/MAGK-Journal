import { entries } from '../../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import { emotionData } from '../../data/dataIndex.js';

import validation from "../../misc/commonValidations.js";
import dataHelpers from "../commonData.js";

const entryDataFunctions = {
    ///////////// CREATE
    async createEntry(
        userId,
        date,
        title = "Untitled",
        emotionId,
        energyId,
        activities,
        socials,
        notes) {

        // validations
        userId = validation.checkId(userId, "userId");
        title = validation.checkString(title, "title");
        emotionId = validation.checkId(emotionId, "emotionId");
        energyId = validation.checkId(energyId, "energyId");

        activities = validation.checkArray(activities, "activities");
        for (let i = 0; i < activities.length; i++) {
            activities[i] = validation.checkId(activities[i], `Activity: ${activities[i]}`);
        }

        socials = validation.checkArray(socials, "socials");
        for (let i = 0; i < socials.length; i++) {
            socials[i] = validation.checkId(socials[i], `Socials: ${socials[i]}`);
        }

        notes = validation.checkString(notes, "notes", 0);

        // check for an existing entry today
        let currentDate = new Date();
        if (date !== undefined) {
            currentDate = new Date(date);
        }

        // COMMENT OUT FOR SEEDING, BECAUSE YOU WON'T BE ABLE TO MAKE SEVERAL ENTRIES
        // try {
        //     existingEntry = await this.getEntryByDate(userId, currentDate);
        //     if (existingEntry) throw `Entry already exists on ${currentDate}`;
        // } catch (e) {
        //     if (error.message.includes('No entry found on')) {
        //         // continue, no entry exists
        //     } else {
        //         throw error;
        //     }
        // }

        // actual insertion
        const entryId = new ObjectId();
        let newEntry = {
            _id: entryId,
            userId,
            title,
            emotionId,
            energyId,
            activities,
            socials,
            notes,
            date: currentDate
        };

        return dataHelpers.createItem(entries, newEntry);
    },

    ///////////// RETRIEVE
    getAllEntries: () => dataHelpers.getAllItems(entries),

    getEntryById(entryId) {
        entryId = validation.checkId(entryId, "entryID");
        return dataHelpers.getItemById(entries, entryId);
    },

    async getEntryByDate(userId, date) {
        userId = validation.checkId(userId, "userId");

        // set range for querying
        const targetDate = new Date(date);
        targetDate.setUTCHours(0, 0, 0, 0);
        const nextDay = new Date(targetDate);
        nextDay.setDate(targetDate.getDate() + 1);

        const entryCollection = await entries();

        const dateEntry = await entryCollection.findOne({
            userId: userId,
            date: {
                // covers start of the day 00:00 to 23:59
                $gte: targetDate,
                $lt: nextDay
            }
        })

        if (!dateEntry) throw `No entry found on ${targetDate} for user ${userId}`;
        return dateEntry;
    },

    async getUserEntries(userId) {
        userId = validation.checkId(userId, "userId");

        const entryCollection = await entries();
        const userEntries = await entryCollection.find({ userId: userId }).toArray();
        return userEntries;
    },

    async getLastSevenEntries(userId) {
        userId = validation.checkId(userId, "userId");
        const entryCollection = await entries();
        const userEntries = await entryCollection.find({ userId: userId }).sort({ date: -1 }).limit(7).toArray();
        return userEntries.reverse();
    },

    async getEntriesByDateRange(userId, startDateStr, endDateStr) {
        userId = validation.checkId(userId, "userId");

        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        // Increment dates by 1 since days are off by 1
        endDate.setDate(endDate.getDate() + 1);

        const entryCollection = await entries();
        const entriesInDateRange = await entryCollection.find({
            userId: userId,
            date: {
                $gte: startDate,
                $lte: endDate
            }
        }).toArray();
        return entriesInDateRange.reverse();
    },

    async getDefaultMoodMeterData(userId) {
        userId = validation.checkId(userId, "userId");
        const entries = await this.getLastSevenEntries(userId);
        let moodMeterData = []

        for (let entry of entries) {
            let emotion = await emotionData.getEmotionById(entry.emotionId);
            let formattedDate = entry.date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            let obj = {
                date: formattedDate,
                emotion: emotion.value
            };
            moodMeterData.push(obj);
        }

        return moodMeterData;
    },

    async getMoodMeterDataForDateRange(userId, startDateStr, endDateStr) {
        userId = validation.checkId(userId, "userId");

        const entries = await this.getEntriesByDateRange(userId, startDateStr, endDateStr)
        let moodMeterData = []

        for (let entry of entries) {
            let emotion = await emotionData.getEmotionById(entry.emotionId);
            let formattedDate = entry.date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            let obj = {
                date: formattedDate,
                emotion: emotion.value
            };
            moodMeterData.push(obj);
        }

        return moodMeterData;
    },

    async getEntriesByMonth(userId, year, month) {
        userId = validation.checkId(userId, "userId");

        // convert str input to number
        const monthNames = {
            January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
            July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
        };
        const monthNumber = monthNames[month];
        year = parseInt(year);
        if (year == null || monthNumber == null) throw 'Invalid year or month!';

        const monthStart = new Date(Date.UTC(year, monthNumber, 1));
        const monthEnd = new Date(Date.UTC(year, monthNumber + 1, 0, 23, 59, 59, 999));

        const entryCollection = await entries();
        const monthEntries = await entryCollection.find({
            userId: userId,
            date: {
                $gte: monthStart,
                $lte: monthEnd
            }
        }).toArray();

        return monthEntries;
    },


    ///////////// UPDATE
    async updateEntry(userId, entryId, updateObject) {
        userId = validation.checkId(userId, "userId");
        entryId = validation.checkId(entryId, "entryId");

        // check fields to update
        let entryUpdate = {};
        if ('title' in updateObject) {
            entryUpdate.title = validation.checkString(updateObject.title, "title");
        }  
        if ('emotionId' in updateObject) {
            entryUpdate.emotionId = validation.checkId(updateObject.emotionId, "emotionId");
        }
        if ('energyId' in updateObject) {
            entryUpdate.energyId = validation.checkId(updateObject.energyId, "energyId");
        }
        if ('activities' in updateObject) {
            entryUpdate.activities = [];
            for (let i = 0; i < updateObject.activities.length; i++) {
                entryUpdate.activities.push(validation.checkId(updateObject.activities[i], "activityId"));
            }
        }
        if ('socials' in updateObject) {
            entryUpdate.socials = [];
            for (let i = 0; i < updateObject.socials.length; i++) {
                entryUpdate.socials.push(validation.checkId(updateObject.socials[i], "socialId"));
            }
        }
        if ('notes' in updateObject) {
            entryUpdate.notes = validation.checkString(updateObject.notes, "Notes", 0);
        }

        // actual updating
        const entryCollection = await entries();
        await validation.checkOwnership(entryId, userId, entryCollection);

        entryUpdate.updatedOn = new Date();
        const updatedEntry = await entryCollection.findOneAndUpdate(
            { _id: new ObjectId(entryId) },
            { $set: entryUpdate },

            // returns updated entry instead of return info
            { returnDocument: 'after' }
        );

        return updatedEntry;
    },

    ///////////// DELETE
    async deleteEntry(userId, entryId) {
        userId = validation.checkId(userId);
        entryId = validation.checkId(entryId);

        const entryCollection = await entries();
        await validation.checkOwnership(entryId, userId, entryCollection);

        const deleteResult = await entryCollection.deleteOne({ _id: new ObjectId(entryId) });
        if (deleteResult.deletedCount === 0) throw 'Delete failed, or no entry was found'

        return deleteResult;
    }
}

export default entryDataFunctions;

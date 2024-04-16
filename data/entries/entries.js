import { entries } from '../../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

import validation from "../../misc/commonValidations.js";
import dataHelpers from "../commonData.js";

const entryDataFunctions = {
    ///////////// CREATE
    async createEntry(
        userId, 
        emotionId,
        energyId,
        activities,
        socials,
        notes) {
            
        // validations
        userId = validation.checkId(userId, "userId");
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
    
        notes = validation.checkString(notes, "notes");

        // check for an existing entry today
        const currentDate = new Date();

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
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const entryCollection = await entries();

        const dateEntry = await entryCollection.find({
            userId: new ObjectId(userId),

            // covers start of the day 00:00 to 23:59
            date: { $gte: startOfDay,
                    $lte: endOfDay }
        }).toArray();  

        if (dateEntry.length === 0) throw `No entry found on ${date}`;
        return dateEntry;
    },

    async getUserEntries(userId, startDate = null, endDate = null) {
        userId = validation.checkId(userId, "userId");

        let query = { userId: new ObjectId(userId) };

        // getting entries by date range
        if (startDate || endDate) {
            query.date = {};

            // get all entries AFTER
            if (startDate) {
                query.date.$gte = new Date(startDate);
            }

            // get all entries BEFORE
            if (endDate) {
                query.date.$lte = new Date(endDate);
            }
        }

        const entryCollection = await entries();
        const userEntries = await entryCollection.find(query).toArray();
        return userEntries;
    },

    ///////////// UPDATE
    async updateEntry(userId, entryId, updateObject) {
        userId = validation.checkId(userId, "userId");
        entryId = validation.checkId(entryId, "entryId");

        // check fields to update
        let entryUpdate = {};
        if ('emotionId' in updateObject) {
            entryUpdate.emotionId = new ObjectId(validation.checkId(updateObject.emotionId, "emotionId"));
        }  
        if ('energyId' in updateObject) {
            entryUpdate.energyId = new ObjectId(validation.checkId(updateObject.energyId, "energyId"));
        }  
        if ('activities' in updateObject) {
            entryUpdate.activities = [];
            for (let i = 0; i < updateObject.activities.length; i++) {
                entryUpdate.activities.push(new ObjectId(validation.checkId(updateObject.activities[i], "activityId")));
            }
        }
        if ('socials' in updateObject) {
            entryUpdate.socials = [];
            for (let i = 0; i < updateObject.socials.length; i++) {
                entryUpdate.socials.push(new ObjectId(validation.checkId(updateObject.socials[i], "socialId")));
            }
        }
        if ('notes' in updateObject) {
            entryUpdate.notes = validation.checkString(updateObject.notes, "Notes");
        }  

        // actual updating
        const entryCollection = await entries();
        await validation.checkOwnership(entryId, userId, entryCollection);

        entryUpdate.updatedOn = new Date();
        const updatedEntry = await entryCollection.findOneAndUpdate(
            { _id: new ObjectId(entryId) },
            { $set: entryUpdate },

            // returns updated entry instead of return info
            {returnDocument: 'after'}
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

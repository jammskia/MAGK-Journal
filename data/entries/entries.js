import { entries } from '../../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

import validation from "../../misc/commonValidations.js";

const entryDataFunctions = {
    ///////////// CREATE
    async createEntry(
        userId, 
        emotionId,
        activities,
        socials,
        notes) {
            
        // validations
        userId = validation.checkId(userId, "userId");
        emotionId = validation.checkId(emotionId, "emotionId");
        activities = validation.checkArray(activities, "activities");
        socials = validation.checkArray(socials, "socials");
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
            activities,
            socials,
            notes,
            date: currentDate
        }

        const entryCollection = await entries();
        const insertResult = await entryCollection.insertOne(newEntry);

        if (!insertResult.insertedId) throw 'Insert failed!'
        
        return entryId; 
    },

    ///////////// RETREIVE
    async getAllEntries() {
        const entryCollection = await entries();
        return await entryCollection.find().toArray();
    },

    async getEntryById(entryId) {   
        entryId = validation.checkId(entryId, "entryID");

        const entryCollection = await entries();
        const entry = await entryCollection.findOne({ _id: new ObjectId(entryId) });
        
        if (!entry) throw `Could not get entry with ID ${entryId}`;
        return entry;
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

        if (entries.length === 0) throw `No entry found on ${date}`;
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
        if (updateObject.emotionId) {
            entryUpdate.emotionId = new ObjectId(validation.checkId(updateObject.emotionId, "emotionId"));
        }  
        if (updateObject.activities) {
            entryUpdate.activities = [];
            for (let i = 0; i < entryUpdate.activities.length; i++) {
                entryUpdate.activities.push(new ObjectId(validation.checkId(entryUpdate[i], "activityId")));
            }
        }
        if (updateObject.socials) {
            entryUpdate.socials = [];
            for (let i = 0; i < entryUpdate.socials.length; i++) {
                entryUpdate.socials.push(new ObjectId(validation.checkId(entryUpdate[i], "socialId")));
            }
        }
        if (updateObject.notes) {
            entryUpdate.notes = validation.checkString(entryUpdate.notes, "Notes");
        }  

        // actual updating
        const entryCollection = await entries();
        await validation.checkOwnership(entryId, userId, entryCollection);

        updateFields.updatedOn = new Date();
        const updatedEntry = await entryCollection.updateOne(
            { _id: new ObjectId(entryId) },
            { $set: entryUpdate }
        );

        return updatedEntry;
    },

    ///////////// DELETE
    async deleteEntry(userId, entryId) {
        userId = validation.checkId(userId);
        entryId = validation.checkId(userId);

        const entryCollection = await entries();
        await validation.checkOwnership(entryId, userId, entryCollection);

        const deleteResult = await entryCollection.deleteOne({ _id: new ObjectId(entryId) });
        if (deleteResult.deletedCount === 0) throw 'Delete failed, or no entry was found'

        return deleteResult;
    }
}

export default entryDataFunctions;

import { activities } from '../../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

import validation from "../../misc/commonValidations.js";

const activityDataFunctions = {
    ///////////// CREATE
    async createActivity(
        name,
        iconPath,
        tags) {

        name = validation.checkString(name, "name");
        iconPath = validation.checkString(iconPath, "iconPath");

        tags = validation.checkArray(tags, "tags");
        for (let i = 0; i < tags.length; i++) {
            tags[i] = validation.checkString(tags[i], `Tag: ${tags[i]}`);
        }

        const activityId = new ObjectId();
        let newActivity = {
            _id: activityId,
            name,
            iconPath,
            tags
        };

        const activityCollection = await activities();
        const insertResult = await activityCollection.insertOne(newActivity);

        if (!insertResult.insertedId) throw 'Insert failed!'
        return await this.getActivityById(insertResult.insertedId.toString()); 
    },

    ///////////// RETRIEVE
    async getAllActivities() {
        const activityCollection = await activities();
        return await activityCollection.find().toArray();
    },

    async getActivityById(activityId) {
        activityId = validation.checkId(activityId, "activityId");

        const activityCollection = await activities();
        const activity = await activityCollection.findOne({ _id: new ObjectId(activityId) });

        if (!activity) throw `Could not get activity with ID ${activityId}`;
        return activity;
    },

    async getActivityByLabel(label) {
        label = validation.checkString(label, "Activity name");

        const activityCollection = await activities();
        const activity = await activityCollection.findOne({ name: label });

        if (!activity) throw `Could not get activity ${label}`;
        return activity;
    }
}

export default activityDataFunctions;
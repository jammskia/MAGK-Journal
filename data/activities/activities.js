import { activities } from '../../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

import validation from "../../misc/commonValidations.js";
import dataHelpers from "../commonData.js";

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

        return dataHelpers.createItem(activities, newActivity);
    },


    ///////////// RETRIEVE
    getAllActivities: () => dataHelpers.getAllItems(activities),

    getActivityById: (activityId) => {
        activityId = validation.checkId(activityId, "activityId");
        return dataHelpers.getItemById(activities, activityId);
    },

    getActivityByLabel: (label) => {
        label = validation.checkString(label, "Activity name");
        return dataHelpers.getItemByLabel(activities, label);
    }
}

export default activityDataFunctions;
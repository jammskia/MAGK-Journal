import { activities } from '../../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

import validation from "../../misc/commonValidations.js";
import dataHelpers from "../commonData.js";

const activityDataFunctions = {
    ///////////// CREATE
    async createActivity(
        name, 
        iconPath, 
        category = "Miscellaneous") {

        name = validation.checkString(name, "name");
        iconPath = validation.checkString(iconPath, "iconPath");
    
        category = validation.checkString(category, "category");
    
        const activityId = new ObjectId();
        let newActivity = {
            _id: activityId,
            name,
            iconPath,
            category
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
    },
    
    async getActivitiesByCategory() {
        const allActivities = await this.getAllActivities();
        const categorizedActivities = {};

        for (let i = 0; i < allActivities.length; i++) {
            const activity = allActivities[i];
            const category = activity.category;

            if (!categorizedActivities[category]) {
                categorizedActivities[category] = [];
            }

            categorizedActivities[category].push(activity);
        }
        return categorizedActivities;
    }
}

export default activityDataFunctions;
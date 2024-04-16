import { emotions } from '../../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

import validation from "../../misc/commonValidations.js";
import dataHelpers from "../commonData.js";

const emotionDataFunctions = {
    ///////////// CREATE
    async createEmotion(
        name,
        iconPath,
        value) {

        name = validation.checkString(name, `Emotion name: ${name}`);
        iconPath = validation.checkString(iconPath, "Emotion iconPath");
        validation.checkRating(value, "Emotion value");

        const emotionId = new ObjectId();
        let newEmotion = {
            _id: emotionId,
            name,
            iconPath,
            value
        };

        return dataHelpers.createItem(emotions, newEmotion); 
    },

    ///////////// RETRIEVE
    getAllEmotions: () => dataHelpers.getAllItems(emotions),

    getEmotionById: (emotionId) => {
        emotionId = validation.checkId(emotionId, "emotionId");
        return dataHelpers.getItemById(emotions, emotionId);
    },

    getEmotionByLabel: (label) => {
        label = validation.checkString(label, "Emotion name");
        return dataHelpers.getItemByLabel(emotions, label);
    }
}

export default emotionDataFunctions;
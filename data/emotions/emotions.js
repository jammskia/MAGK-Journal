import { emotions } from '../../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

import validation from "../../misc/commonValidations.js";

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

        const emotionCollection = await emotions();
        const insertResult = await emotionCollection.insertOne(newEmotion);

        if (!insertResult.insertedId) throw 'Insert failed!'
        return await this.getEmotionById(insertResult.insertedId.toString()); 
    },

    ///////////// RETRIEVE
    async getAllEmotions() {
        const emotionCollection = await emotions();
        return await emotionCollection.find().toArray();
    },

    async getEmotionById(emotionId) {
        emotionId = validation.checkId(emotionId, "emotionId");

        const emotionCollection = await emotions();
        const emotion = await emotionCollection.findOne({ _id: new ObjectId(emotionId) });

        if (!emotion) throw `Could not get emotion with ID ${emotionId}`;
        return emotion;
    },

    async getEmotionByLabel(label) {
        label = validation.checkString(label, "Emotion name");

        const emotionCollection = await emotions();
        const emotion = await emotionCollection.findOne({ name: label });

        if (!emotion) throw `Could not get emotion ${label}`;
        return emotion;
    }
}

export default emotionDataFunctions;
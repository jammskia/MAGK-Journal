import { activities, socials } from '../../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

import validation from "../../misc/commonValidations.js";

const socialDataFunctions = {
    ///////////// CREATE
    async createSocial(
        name,
        iconPath) {

        name = validation.checkString(name, "name");
        iconPath = validation.checkString(iconPath, "iconPath");

        const socialId = new ObjectId();
        let newSocial = {
            _id: socialId,
            name,
            iconPath
        };

        const socialCollection = await socials();
        const insertResult = await socialCollection.insertOne(newSocial);

        if (!insertResult.insertedId) throw 'Insert failed!'
        return await this.getSocialById(insertResult.insertedId.toString()); 
    },

    ///////////// RETRIEVE
    async getAllSocials() {
        const socialCollection = await socials();
        return await socialCollection.find().toArray();
    },

    async getSocialById(socialId) {
        socialId = validation.checkId(socialId, "socialId");

        const socialCollection = await socials();
        const social = await socialCollection.findOne({ _id: new ObjectId(socialId) });

        if (!social) throw `Could not get social with ID ${socialId}`;
        return social;
    },

    async getSocialByLabel(label) {
        label = validation.checkString(label, "Social name");

        const socialCollection = await socials();
        const social = await socialCollection.findOne({ name: label });

        if (!social) throw `Could not get social ${label}`;
        return social;
    }
}

export default socialDataFunctions;
import { socials } from '../../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

import validation from "../../misc/commonValidations.js";
import dataHelpers from "../commonData.js";

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

        return dataHelpers.createItem(socials, newSocial); 
    },

    ///////////// RETRIEVE
    getAllSocials: () => dataHelpers.getAllItems(socials),

    getSocialById: (socialId) => {
        socialId = validation.checkId(socialId, "socialId");
        return dataHelpers.getItemById(socials, socialId);
    },

    getSocialByLabel: (label) => {
        label = validation.checkString(label, "Social name");
        return dataHelpers.getItemByLabel(socials, label);
    }
}

export default socialDataFunctions;
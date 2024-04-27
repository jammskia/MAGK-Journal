import { energies } from '../../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

import validation from "../../misc/commonValidations.js";
import dataHelpers from "../commonData.js";

const energyDataFunctions = {
    ///////////// CREATE
    async createEnergy(
        name,
        color,
        value) {

        name = validation.checkString(name, "Energy name");
        color = validation.checkString(color, "Energy color");
        validation.checkRating(value, "Energy value");

        const energyId = new ObjectId();
        let newEnergy = {
            _id: energyId,
            name,
            color,
            value
        };

        return dataHelpers.createItem(energies, newEnergy);  
    },

    ///////////// RETRIEVE
    getAllEnergies: () => dataHelpers.getAllItems(energies),

    getEnergyById: (energyId) => {
        energyId = validation.checkId(energyId, "energyId");
        return dataHelpers.getItemById(energies, energyId);
    },

    getEnergyByLabel: (label) => {
        label = validation.checkString(label, "Energy name");
        return dataHelpers.getItemByLabel(energies, label);
    }
}

export default energyDataFunctions;
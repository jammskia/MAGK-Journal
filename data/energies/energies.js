import { energies } from '../../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

import validation from "../../misc/commonValidations.js";

const energyDataFunctions = {
    ///////////// CREATE
    async createEnergy(
        name,
        iconPath,
        value) {

        name = validation.checkString(name, "Energy name");
        iconPath = validation.checkString(iconPath, "Energy iconPath");
        validation.checkRating(value, "Energy value");

        const energyId = new ObjectId();
        let newEnergy = {
            _id: energyId,
            name,
            iconPath,
            value
        };

        const energyCollection = await energies();
        const insertResult = await energyCollection.insertOne(newEnergy);

        if (!insertResult.insertedId) throw 'Insert failed!'
        return await this.getEnergyById(insertResult.insertedId.toString());  
    },

    ///////////// RETRIEVE
    async getAllEnergies() {
        const energyCollection = await energies();
        return await energyCollection.find().toArray();
    },

    async getEnergyById(energyId) {
        energyId = validation.checkId(energyId, "energyId");

        const energyCollection = await energies();
        const energy = await energyCollection.findOne({ _id: new ObjectId(energyId) });

        if (!energy) throw `Could not get energy with ID ${energyId}`;
        return energy;
    },

    async getEnergyByLabel(label) {
        label = validation.checkString(label, "Energy name");

        const energyCollection = await energies();
        const energy = await energyCollection.findOne({ name: label });

        if (!energy) throw `Could not get energy ${label}`;
        return energy;
    }
}

export default energyDataFunctions;
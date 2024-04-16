// this file just combines all the data functions, because I noticed they were the same format

import { ObjectId } from "mongodb";

const dataHelpers = {
    async createItem(collection, data) {
        const itemCollection = await collection();
        const insertResult = await itemCollection.insertOne(data);

        if (!insertResult.insertedId) throw 'Insert failed!';
        return await this.getItemById(collection, insertResult.insertedId.toString());
    },

    async getAllItems(collection) {
        const itemCollection = await collection();
        return await itemCollection.find().toArray();
    },

    async getItemById(collection, itemId) {
        const itemCollection = await collection();
        const item = await itemCollection.findOne( { _id: new ObjectId(itemId) });

        if (!item) throw `Could not get item with ID ${itemId}`;
        return item;
    },

    async getItemByLabel(collection, label) {
        const itemCollection = await collection();
        const item = await itemCollection.findOne( { name: label });

        if (!item) throw `Could not get item with label ${label}`;
        return item;
    }

}

export default dataHelpers;
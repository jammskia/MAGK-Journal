import {ObjectId} from 'mongodb';

const exportedMethods = {
    checkId(id, name = "ID") {
        if (!id) throw `${name} must be provided`;
        if (typeof id !== 'string') throw `${name} must be a string`;

        id = id.trim();
        if (id.length === 0) throw `${name} cannot be empty`;

        if (!ObjectId.isValid(id)) throw `${name} is not a valid ObjectId`;

        return id;
    }, 

    checkString(str, name = "String", minLength = 1, maxLength = 255) {
        if (!str) throw `${name} must be provided`;
        if (typeof str !== 'string') throw `${name} must be a string`;

        str = str.trim();
        if (str.length < minLength) throw `${name} must be at least ${minLength} chars long`;
        if (str.length > maxLength) throw `${name} must be at most ${maxLength} chars long`;

        return str;
    },

    checkArray(arr, name = "Array", minLength = 0, maxLength = Infinity) {
        if (!arr) throw `${name} must be provided`;
        if (arr.length < minLength) throw `${name} must be at least ${minLength} chars long`;
        if (arr.length > maxLength) throw `${name} must be at most ${maxLength} chars long`;
        
        return arr;
    }, 

    async checkOwnership(entryId, userId, entryCollection) {
        const existingEntry = await entryCollection.findOne({ _id: new ObjectId(entryId), userId: new ObjectId(userId) });
        if (!existingEntry) {
            throw new Error("No entry found or you do not have permission to delete this entry");
        }

        return existingEntry;
    }
}

export default exportedMethods;

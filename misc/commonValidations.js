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
        if (minLength !== 0) {
            if (!str) throw `${name} must be provided`;
        }
        
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
        const entry = await entryCollection.findOne({ _id: new ObjectId(entryId) });
        if (!entry) throw 'No entry found with the given ID';

        if (entry.userId.toString() !== userId.toString()) throw 'You do not have permission to modify this entry';
    },

    async checkRating(value, name = 'Value') {
        if (!value) throw `${name} must be provided`;
        if (typeof value !== 'number') throw `${name} must be a number`;

        const isWhole = value % 1 === 0;
        const isHalf = value % 1 === 0.5;

        if (!isWhole && !isHalf) throw `${name} must be a whole number or a half increment`;
    }
}

export default exportedMethods;

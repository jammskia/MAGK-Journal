import { ObjectId } from 'mongodb';
import moment from 'moment';

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
    },

    validateEmail(email) {
        // Checks that one argument was passed
        if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
        // Checks if email is a valid string
        this.validateString(email);
        // Checks if email contains a '.'
        if (!email.includes('.')) throw `Invalid email.`;
        // Checks if email contains a '@'
        if (!email.includes('@')) throw `Invalid email.`;
        // Checks if email only contains valid characters
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) throw 'Invalid email.';
    },

    validateUsername(username) {
        // Checks that one argument was passed
        if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
        // Checks if username is a valid string
        this.validateString(username);
        // Checks if username only contains alphanumeric characters
        if (!/^[A-Za-z0-9]*$/.test(username)) throw 'Username must contain only letters and numbers.';
        // Checks if username is at least 2 characters
        if (username.length < 2) throw 'Username must be at least 2 characters.';
        // Checks if username is less than 30 characters
        if (username.length > 30) throw 'Username must be no more than 30 characters.';
    },

    validateDate(date) {
        // Checks that one argument was passed
        if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
        // Checks if date is a valid date
        if (!moment(date, 'MM/DD/YYYY', true).isValid()) throw 'Invalid date.';
    },

    validateDateOfBirth(dateOfBirth) {
        // Checks that one argument was passed
        if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
        // Checks if dateOfBirth is a valid string
        this.validateString(dateOfBirth);
        // Checks if dateOfBirth is in format mm/dd/yyyy
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateOfBirth)) throw 'Invalid dateOfBirth.';
        // Check if dateOfBirth is valid
        this.validateDate(dateOfBirth);
        // Checks dateOfBirth is at least 13 years old
        // Declares a variable named today and sets it equal to todays dates
        let today = new Date();
        // Declares a variable named birthday and sets it equal to dateOfBirth as a Date type
        let birthday = new Date(dateOfBirth);
        // Declares a variable named age and sets it equal to today's year - birthday's year
        let age = today.getFullYear() - birthday.getFullYear();
        // Declares a variable named month and sets it equal to today's month - birthday's month
        let month = today.getMonth() - birthday.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
            //  Subtracts age by 1
            age--;
        }
        // Checks if age is less than or equal to 13
        if (age < 13) throw 'You must be 13 years or older to create an account.'
    },

    validatePassword(password) {
        // Checks that one argument was passed
        if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
        // Checks if password is a valid string
        this.validateString(password);
        // Checks if password contains spaces
        if (/\s/g.test(password)) throw 'Password must not contain spaces.';
        // Checks if password is at least 8 characters
        if (password.length < 8) throw 'Password must be at least 8 characters.';
    },

    validateString(string) {
        // Checks that one argument was passed
        if (arguments.length !== 1) throw `This function takes 1 argument but ${arguments.length} were given.`;
        // Check if string is a string
        if (typeof string !== 'string') throw `${string} is not a string.`;
        // Checks if name, website, or recordLabel only contains spaces
        if (string.trim().length === 0) throw 'A string with just spaces is not valid.';
    },
}

export default exportedMethods;

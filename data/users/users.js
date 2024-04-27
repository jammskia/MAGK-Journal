import { users } from '../../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
const saltRounds = 10;

import validation from "../../misc/commonValidations.js";
import dataHelpers from "../commonData.js";

const userDataFunctions = {
    ///////////// CREATE
    async createUser(
        name,
        emailAddress,
        password,
        dateOfBirth) {

        name = validation.checkString(name, "User name");
        validation.validateEmail(emailAddress);
        validation.validateDateOfBirth(dateOfBirth);
        validation.validatePassword(password);

        // Hashes password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userId = new ObjectId();
        let newUser = {
            _id: userId,
            name: name,
            emailAddress: emailAddress,
            password: hashedPassword,
            dateOfBirth: dateOfBirth
        };

        return dataHelpers.createItem(users, newUser);
    },

    ///////////// RETRIEVE
    getAllUsers: () => dataHelpers.getAllItems(users),

    getUserById: (userId) => {
        userId = validation.checkId(userId, "userId");
        return dataHelpers.getItemById(users, userId);
    },
}

export default userDataFunctions;
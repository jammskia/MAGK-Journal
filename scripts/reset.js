// just run this to clear the database
import { dbConnection } from '../config/mongoConnection.js';

const db = await dbConnection();
await db.dropDatabase();

console.log("Database reset.")
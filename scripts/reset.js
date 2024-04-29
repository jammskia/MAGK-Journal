// just run this to clear the database
import { dbConnection } from '../config/mongoConnection.js';

async function resetDatabase() {
    const db = await dbConnection();
    await db.dropDatabase();
    console.log("Database reset.")
    process.exit();
}

resetDatabase();
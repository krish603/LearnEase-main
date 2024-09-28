// Import the MongoDB driver
const { MongoClient } = require('mongodb');
const email = "";
const pass = "";
const user = "";
// MongoDB connection string (replace with your own connection string)
const uri = "mongodb://localhost:27017/dhruvApp1";

// Create a new MongoClient
const client = new MongoClient(uri);

async function addUser(email, password, username) {
    try {
        // Connect to MongoDB
        await client.connect();

        // Access the database
        const database = client.db('Collage-Management-System');
        const collection = database.collection('Faculty');

        // Define the new user document
        const newUser = {
            email: email,
            password: password,  // Note: In a real application, you should hash passwords before storing!
            username: username,
        };

        // Insert the user into the collection
        const result = await collection.insertOne(newUser);

        console.log(`New user inserted with the id: ${result.insertedId}`);
    } catch (error) {
        console.error(error);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Example usage
addUser("user@example.com", "password123", "newUser123");
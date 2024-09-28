// Import the MongoDB driver
const { MongoClient } = require('mongodb');

// MongoDB connection string (replace with your own connection string)
const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);

async function addUser(email, password, username) {
    try {
        // Connect to MongoDB
        await client.connect();

        // Access the database
        const database = client.db('myDatabase');
        const collection = database.collection('users');

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

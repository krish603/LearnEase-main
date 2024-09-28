const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ezclass', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('Connected to MongoDB');

    // Fetch total number of students
    const totalStudents = await mongoose.connection.db.collection('students').countDocuments();
    console.log('Total Students:', totalStudents);

    // Fetch total number of faculties
    const totalFaculties = await mongoose.connection.db.collection('faculties').countDocuments();
    console.log('Total Faculties:', totalFaculties);

    // Fetch total number of courses
    const totalCourses = await mongoose.connection.db.collection('courses').countDocuments();
    console.log('Total Courses:', totalCourses);

    // Fetch total fees collection (assuming 'fees' collection has an amount field)
    const feesData = await mongoose.connection.db.collection('fees').aggregate([
        {
            $group: {
                _id: null,
                totalFees: { $sum: "$amount" }  // Assuming each document has an 'amount' field
            }
        }
    ]).toArray();
    
    const totalFees = feesData.length > 0 ? feesData[0].totalFees : 0;
    console.log('Total Fees Collection: ₹', totalFees);

    // Close the connection
    mongoose.connection.close();
})
.catch(err => console.error('Database connection error:', err));

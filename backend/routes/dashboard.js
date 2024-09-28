router.get('/api/dashboard', async (req, res) => {
    try {
        const totalStudents = await mongoose.connection.db.collection('students').countDocuments();
        console.log('Total Students:', totalStudents);  // Debug log

        const totalFaculties = await mongoose.connection.db.collection('faculties').countDocuments();
        console.log('Total Faculties:', totalFaculties);  // Debug log

        const totalCourses = await mongoose.connection.db.collection('courses').countDocuments();
        console.log('Total Courses:', totalCourses);  // Debug log

        const feesData = await mongoose.connection.db.collection('fees').aggregate([
            {
                $group: {
                    _id: null,
                    totalFees: { $sum: "$amount" }
                }
            }
        ]).toArray();
        
        const totalFees = feesData.length > 0 ? feesData[0].totalFees : 0;
        console.log('Total Fees Collection: ₹', totalFees);  // Debug log

        res.json({
            totalStudents,
            totalFaculties,
            totalCourses,
            feesCollection: totalFees,
            studentGrowth: 80,  // Static for now
            facultyGrowth: 50,
            courseGrowth: 76,
            feesGrowth: 30
        });
    } catch (err) {
        console.error('Error fetching dashboard data:', err);  // Error handling
        res.status(500).send('Server Error');
    }
});

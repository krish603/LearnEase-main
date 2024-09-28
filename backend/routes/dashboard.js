// In your routes/dashboard.js or server.js file
router.get('/api/dashboard', async (req, res) => {
    try {
        const totalStudents = await mongoose.connection.db.collection('students').countDocuments();
        const totalFaculties = await mongoose.connection.db.collection('faculties').countDocuments();
        const totalCourses = await mongoose.connection.db.collection('courses').countDocuments();
        const feesData = await mongoose.connection.db.collection('fees').aggregate([
            {
                $group: {
                    _id: null,
                    totalFees: { $sum: "$amount" }
                }
            }
        ]).toArray();
        
        const totalFees = feesData.length > 0 ? feesData[0].totalFees : 0;

        res.json({
            totalStudents,
            totalFaculties,
            totalCourses,
            feesCollection: totalFees,
            studentGrowth: 80,  // Static percentage growths, update logic if dynamic
            facultyGrowth: 50,
            courseGrowth: 76,
            feesGrowth: 30
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

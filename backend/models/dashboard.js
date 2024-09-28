const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
    totalStudents: Number,
    totalFaculties: Number,
    totalCourses: Number,
    feesCollection: Number,
    studentGrowth: Number,
    facultyGrowth: Number,
    courseGrowth: Number,
    feesGrowth: Number
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;

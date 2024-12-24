const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School', 
        required: true
    },
    classrooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom' 
    }],
    profilePicture: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

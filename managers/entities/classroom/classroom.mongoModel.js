const mongoose = require('mongoose');
const classroomSchema = new mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;

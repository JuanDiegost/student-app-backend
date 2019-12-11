import { Schema, model } from 'mongoose'

const studentSchema = Schema({
    email: {
        type: String,
        requiere: true
    },
    firts_name: String,
    last_name: String,
    code: String,
    school: String,
    program: String,
    zone: String,
    center: String,
    phone: String,
    personal_mail: String,
    intitud_mail: String,
    gener: String,
    type: String,
    stratum: String,
    etnia: String,
    disability: String,
	period: String,
    notesCall: String,
    comment: String,
    dropoutReason: String,
    teacher: {type: Schema.Types.ObjectId, ref: 'teacher'}

}, {
    collection: 'student'
});

export default model("student",studentSchema);
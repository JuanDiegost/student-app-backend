import Teacher from './models/Teacher'
import Student from './models/Student'

import { ClientHttp2Session } from 'http2';
import { rejects } from 'assert';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
import jwt from 'jsonwebtoken';


const newToken = (userLogin, secreto, expiresIn) => {
	const { email } = userLogin;
	return jwt.sign({ email }, secreto, { expiresIn });
}

export const resolvers = {

    Query: {
        async teacherList(){
            return await Teacher.find()
        },
        async searchTeacher(){
            return await Teacher.find()
        },
        async getStudentsByTeacher(_,{idTeacher,limit,offset}) {
			return Student.find({teacher:idTeacher}).sort({ $natural: -1 }).limit(limit).skip(offset);
        },
        async getStudents(_,{limit,offset}) {
			return Student.find().sort({ $natural: -1 }).limit(limit).skip(offset);
        },
        async getStudent(_,{ id }){
            return await Student.findById(id);
        }
    },
    Mutation: {
        async createTeacher(_,{ teacherinfo }){
            const newTeacher = new Teacher(teacherinfo)
            await newTeacher.save()
            return newTeacher
        },
        async  addStudents(_,{studentsInfo}){
            let i=0;
            const teachers = await Teacher.find()           
            studentsInfo.forEach((stu)=>{
                const teacher = teachers[i]
                console.log(teacher)
                stu["teacher"] = teacher._id
                console.log(stu)
                const newStudent = new Student(stu)
                newStudent.save()
                i++;
                console.log(`lenght ${teachers.length} i ${i}`)
                if (i===teachers.length){
                    i=0
                }
            })
            return "ok";
        },
        async autUser(_, { email, password }) {
			const existUser = await Teacher.findOne({ email });

			if (!existUser) {
				throw new Error("El usuario no existe");
			}
			const passwordCorrect = await bcrypt.compare(password, existUser.password);

			if (!passwordCorrect) {
				throw new Error('Password Incorrecto');
			}
			return existUser;
        },
        async editStudent(_,{studentInfo}){
            return new Promise((resolve, object) => {
				Student.findOneAndUpdate({ _id: studentInfo._id }, studentInfo, { new: true }, (error, student) => {
					if (error) rejects(err)
					else resolve(student)
				});
			});
        }

    }
}

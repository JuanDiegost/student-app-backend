import { resolvers } from './resolvers'
import { ApolloServer, gql } from 'apollo-server-express'

//Definir que se pude consultar a traves del query

const typeDef = gql`

    type Student {
        _id: ID
        email: String
        firts_name: String
        last_name: String
        code: String
        comment: String
        school: String
        program: String
        zone: String
        center: String
        phone: String
        personal_mail: String
        intitud_mail: String
        gener: String
        type: String
        stratum: String
        etnia: String
        disability: String
        period: String
        notesCall: String
        dropoutReason: String
        teacher:ID
    }


    input studentsInput {
        _id:ID
        email: String
        firts_name: String
        last_name: String
        code: String
        school: String
        comment: String
        program: String
        zone: String
        center: String
        phone: String
        personal_mail: String
        intitud_mail: String
        gener: String
        type: String
        stratum: String
        etnia: String
        disability: String
        period: String
        notesCall: String
        dropoutReason: String
        teacher:ID
    }

    type Teacher{
        _id: ID
        email: String
        password: String
        first_name: String
        last_name: String
    }


    input TeacherInput{
        email: String
        password: String
        first_name: String
        last_name: String
    }

    type Query {
        getStudent(id:ID!):Student
        getStudents(limit:Int,offset:Int):[Student]
        teacherList: [Teacher]
        searchTeacher(_id:ID): Teacher
        getStudentsByTeacher(idTeacher:ID,limit:Int,offset:Int):[Student]
    }
    
    type Mutation {
        createTeacher(teacherinfo: TeacherInput): Teacher
        addStudents(studentsInfo: [studentsInput]): String
        autUser(email:String!, password:String!): Teacher
        editStudent(studentInfo:studentsInput): Student
    }
`

const schema = new ApolloServer({
    typeDefs: typeDef,
    resolvers: resolvers,
    introspection:true,   //tener el playground
    playground: {
        endpoint: '/graphql'
    }
})

export default schema
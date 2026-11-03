import mongoose from "mongoose"

const courseSchema  = new mongoose.Schema({
    courseTitle:{
        type:String,
        required:true
    },
    courseSubTitle:{
        type:String,
       
    },
    description:{
        type:String,
        
    },
    category:{
        type:String,
        required:true
    },
    courseLevel:{
        type:String,
        enum:["Beginner","Medium","Advanced"],
        default:"Beginner"
    },
    coursePrice:{
        type:Number,
        
    },
    courseThumbnail:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrBr5j4xYo1A5pwsCXML9SAUHTGNhl2zOXOY5b1S59K72qAIF4qcuIn2Q3&s=10"
    },
    enrolledStudents:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    lectures:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Lecture"
        }
    ],
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isPublished:{
        type:Boolean,
        default:false
    }


},{timestamps:true})

export const Course = mongoose.model("Course",courseSchema)
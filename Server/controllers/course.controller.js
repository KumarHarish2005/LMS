import { Course } from "../models/course.model.js";

export const createCourse = async(req,res)=>{

        
    try {
        const {courseTitle,category,courseSubTitle,description,courseLevel,courseThumbnail,coursePrice}= req.body;
        if(!courseTitle||!category){
            return res.status(400).json({
            success:false,
            message:"Course title and category is required"
        })
        }

        const course = await Course.create({
            courseTitle,
            category,
            courseSubTitle,
            description,
            courseLevel,
            courseThumbnail,
            coursePrice,
            creator:req.id
        })
        return res.status(201).json({
            success:true,
            message:"Create course",
            course
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to create course"
        })
    }
}

export const getCreatorCourses = async ( req,res)=>{
    try {
        const userId = req.id;
        const courses = await Course.find({creator:userId});
        if(!courses){
            return res.status(404).json({
                message:"Course not found",
                success:false
            })
        }

        return res.status(200).json({
            success:true,
            message:"Fetching Completed",
            courses
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to fetch courses"
        })
    }
}
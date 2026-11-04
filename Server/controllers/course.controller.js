import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import {deleteMediaFromCloudinary, uploadMedia} from "../utils/cloudinary.js"
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

export const editCourse = async (req,res) =>{
    try {
        const courseId = req.params.courseId;
        const {courseTitle,courseSubTitle,description,category,courseLevel,coursePrice} = req.body;
        const courseThumbnail = req.file;

        let course = await Course.findById(courseId)

        if(!course){
            return res.status(404).json({
                message:"Course not found"
            })
        }
        let thumbnail;
        if(courseThumbnail){
            if(course.courseThumbnail){
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId);
            }
            //upload thumbnail on cloudinary
            thumbnail=await uploadMedia(courseThumbnail.path)

        }
        const updateData = {courseTitle,courseSubTitle,description,category,courseLevel,coursePrice,courseThumbnail: thumbnail?.secure_url || course.courseThumbnail}

        course = await Course.findByIdAndUpdate(courseId,updateData,{new:true});
        return res.status(200).json({
            course,
            message:"Course updated successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to edit course",
            error
        })
    }
}

export const getCourseById = async (req,res) => {
    try {
        const {courseId} = req.params;

        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
            success:false,
            message:"Course not found",
            
        })
        }

        return res.status(200).json({
            course
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Fetching this course, couldn't be done",
            error
        })
    }
}

export const createLecture = async (req,res)=>{

    try {
        const {lectureTitle} = req.body;
        const {courseId} = req.params;

        if(!lectureTitle||!courseId){
            return res.status(400).json({
                message:"Lecture title is required"
            })
        };

        //create lecture
        const lecture = await Lecture.create({lectureTitle});

        const course = await Course.findById(courseId);
        if(course){
            course.lectures.push(lecture._id);
            await course.save();

        }
        return res.status(201).json({
            lecture,
            message:"Lecture created successfully",
            success:true
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to create lecture",
            error
        })
    }
}

export const getLecture = async (req,res)=>{
    console.log("Request params:", req.params);
console.log("Course ID:", req.params.courseId);
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId).populate("lectures");
        if(!course){
            return res.status(404).json({
                success:false,
                message:"Failed to fetch the course and its lectures"
            })
        }
        return res.status(200).json({
            lectures:course.lectures
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to get lectures",
            error
        })
    }
}
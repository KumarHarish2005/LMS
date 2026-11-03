import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
export const register = async (req,res,next)=>{
    try {
        const {name,email,password}= req.body;
        if(!name||!email||!password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })

        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success:false,
                message:'User already exists with the email'
            })
        }
        const hashedPassword= await bcrypt.hash(password,10);
        await User.create({
            name,
            email,
            password:hashedPassword
        })
        return res.status(201).json({
            success:true,
            message:"Account created successfully"
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to register"
        })
    }
}

export const login  = async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })

        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:'Incorrect email or password'
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:'Incorrect email or password'
            })
        }

        //generation of token
        generateToken(res,user,`Welcome back ${user.name}`)


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
}

export const logout = async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            success:true,
            message:"Logged Out Successfully"
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        })
    }
}

export const getUserProfile = async(req,res)=>{
    try {
        
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({
                message:"Profile not found",
                success:false
            })
        }
        return res.status(200).json({
                message:"Collected user",
                success:true,
                user
            })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to load user"
        })
    }
}


export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Update name
        if (name) {
            user.name = name;
        }

        // Update photo only if a new photo is uploaded
        if (profilePhoto) {

            // Delete previous photo
            if (user.photoURL) {
                const publicId = user.photoURL
                    .split("/")
                    .pop()
                    .split(".")[0];

                await deleteMediaFromCloudinary(publicId);
            }

            // Upload new photo
            const cloudResponse = await uploadMedia(profilePhoto.path);

            user.photoURL = cloudResponse.secure_url;
        }

        await user.save();

        const updatedUser = await User.findById(userId)
            .select("-password");

        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "User updated successfully"
        });

    } catch (error) {
        console.log("Update Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update user"
        });
    }
};

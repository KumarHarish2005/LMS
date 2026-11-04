import { useCreateCourseMutation } from "@/features/api/courseapi";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    courseTitle: "",
    courseSubTitle: "",
    description: "",
    category: "",
    courseLevel: "Beginner",
    coursePrice: "0",
    courseThumbnail: "",
  });

  const [createCourse,{data,isLoading,error,isSuccess,isError}] = useCreateCourseMutation();
  const changeHandler = (e) => {
    const { name, value } = e.target;

    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const createCourseHandler = async (e) => {
     e.preventDefault();
      const finalCourseData = {
    ...courseData,
    coursePrice: Number(courseData.coursePrice)
  };
     await createCourse(finalCourseData);
    
  };

  //for toast
  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message||"Course created")
    }
    if(isError){
      toast.error(error?.data?.message||"Some problem occured while creating the course")
    }
  },[isSuccess,isError])
  return (
    <div className="w-full min-w-0 px-4 py-8 sm:px-6 lg:px-10 lg:py-10 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 md:mt-20  ">
      {/* Heading */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="font-bold text-2xl sm:text-3xl">Let's Add Course</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Provide the necessary information to create a new course.
        </p>
      </div>

      {/* Form */}
      <form 
      onSubmit={createCourseHandler}
      className="max-w-5xl mx-auto space-y-8">
        {/* Basic Information */}
        <section className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-lg">Basic Information</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter the basic details of your course.
            </p>
          </div>

          {/* Course Title */}
          <div className="space-y-2">
            <label htmlFor="courseTitle" className="text-sm font-medium">
              Course Title <span className="text-red-500">*</span>
            </label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              required
              value={courseData.courseTitle}
              onChange={changeHandler}
              placeholder="e.g. Complete Web Development Bootcamp"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          

          
        </section>

        {/* Course Settings */}
        <section className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-lg">Course Settings</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Set the category
            </p>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                id="category"
                name="category"
                value={courseData.category}
              onChange={changeHandler}
                type="text"
                required
                placeholder="e.g. Web Development"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

         
           

            
          </div>
        </section>

        

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pb-8">
          <button
            type="reset"
            className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Reset
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-medium transition"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;

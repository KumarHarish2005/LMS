import {
  useCreateCourseMutation,
  useCreateLectureMutation,
  useGetLecturesQuery,
} from "@/features/api/courseapi";
import { Loader2 } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const params = useParams();
  const courseId = params.courseId;
  const [lectureTitle, setLectureTitle] = useState("");

  const navigate = useNavigate();
  const [createLecture, { data, isLoading, isSuccess, isError, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureIsError,
    refetch
  } = useGetLecturesQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || `Lecture ${lectureTitle} created`)
      refetch();
    }
    if (isError) {
      toast.error(error.data?.message || "Failed to create lecture");
    }
  }, [isSuccess, error, isError]);

  return (
    <div className="w-full min-w-0 px-4 py-8 sm:px-6 lg:px-10 lg:py-10 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 md:mt-20  ">
      {/* Heading */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="font-bold text-2xl sm:text-3xl">Let's Add Lecture</h1>
      </div>

      {/* Form */}
      <form className="max-w-5xl mx-auto space-y-8">
        {/* Basic Information */}
        <section className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-lg">Basic Information</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter the basic details of your lecture.
            </p>
          </div>

          {/* Course Title */}
          <div className="space-y-2">
            <label htmlFor="courseTitle" className="text-sm font-medium">
              Lecture Title <span className="text-red-500">*</span>
            </label>
            <input
              id="courseTitle"
              name="courseTitle"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              type="text"
              required
              placeholder="e.g. Complete Web Development Bootcamp"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>
        </section>
        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pb-8">
          <button
            onClick={() => navigate(`/admin/courses/${courseId}`)}
            className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Back to course
          </button>
          <button
            type="reset"
            className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={isLoading}
            onClick={createLectureHandler}
            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-medium transition"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                Please wait...
              </>
            ) : (
              "Create Lecture"
            )}
          </button>
        </div>
      </form>

      <div className="mt-10">
        {lectureLoading ? (
          <>
            <p>Loading lecture...</p>
          </>
        ) : lectureIsError ? (
          <p>Failed to load lectures</p>
        ) : lectureData.lectures.length === 0 ? (
          <p>No lectures available</p>
        ) : (
          lectureData?.lectures?.map((lecture,index)=>(
              <Lecture key={lectureData._id} lecture = {lecture} index={index} courseId = {courseId}/>
          ))
          
        )}
      </div>
    </div>
  );
};

export default CreateLecture;

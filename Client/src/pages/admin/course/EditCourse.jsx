import { Button } from "@/components/ui/button";
import { useCreateCourseMutation } from "@/features/api/courseapi";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import CourseTab from "./CourseTab";

const EditCourse = () => {
    const params=useParams();
      const courseId = params.courseId;
    return(
        <div className="flex-1 my-24" >
            <div className="flex items-center justify-between mb-5">
                <h1 className="font-bold text-xl">
                    All detail information regarding course
                </h1>
                <Link to={`/admin/courses/${courseId}/lectures`}>
                Go to Lectures...
                </Link>

            </div>
            <CourseTab/>
        </div>
    )
};

export default EditCourse;
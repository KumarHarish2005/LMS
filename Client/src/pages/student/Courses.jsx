import React from "react";
import Course from "./Course";

const Courses = () => {
  const isLoading = false;
  const courses = [1, 2, 4, 5, 5, 3, 6, 7, 8];
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
              >
                {/* Image Skeleton */}
                <div className="h-48 w-full animate-pulse bg-gray-200 dark:bg-gray-800" />

                <div className="space-y-4 p-5">
                  {/* Course Title */}
                  <div className="h-5 w-3/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />

                  {/* Description */}
                  <div className="space-y-2">
                    <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-3 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                  </div>

                  {/* Instructor and Rating */}
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="h-6 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => (
              <Course key={course} />
            ))}
            <Course />
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

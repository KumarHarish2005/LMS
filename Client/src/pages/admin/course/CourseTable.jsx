
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, BookOpen } from "lucide-react";
import { useEditCourseMutation, useGetCreatorCourseQuery } from "@/features/api/courseapi";

const CourseTable = () => {
  const { data, isLoading, error } = useGetCreatorCourseQuery();
  const navigate = useNavigate();
  
  const courses = data?.courses || [];

  const editCourse = (courseId) => {
    navigate(`/admin/courses/${courseId}`);
  };

  if (isLoading) {
    return <div className="p-6 text-center dark:text-white">Loading courses...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Failed to load courses.</div>;
  }

  return (
    <div className="w-full min-w-0 space-y-5 p-3 sm:p-5 md:p-7 lg:p-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 md:mt-20">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">My Courses</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and track your created courses.
          </p>
        </div>

        <Button
          onClick={() => navigate("/admin/courses/create")}
          className="w-full sm:w-auto gap-2"
        >
          <Plus size={18} />
          Create New Course
        </Button>
      </div>

      {/* Empty State */}
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-8 sm:p-12 text-center">
          <BookOpen size={36} className="text-gray-400 mb-3" />
          <h2 className="font-semibold text-lg">No courses yet</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create your first course to get started.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile Cards: below md */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {courses.map((course) => (
              <div
                key={course._id}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Course Title
                    </p>
                    <h2 className="font-semibold text-base break-words">
                      {course.courseTitle}
                    </h2>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                      course.isPublished
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                    }`}
                  >
                    {course.isPublished ? "Active" : "Draft"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-gray-200 dark:border-gray-800 pt-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Price
                    </p>
                    <p className="font-semibold mt-1">
                      ₹{course.coursePrice ?? 0}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Course ID
                    </p>
                    <p className="text-xs mt-1 break-all text-gray-600 dark:text-gray-300">
                      {course._id}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2"
                  onClick={() => editCourse(course._id)}
                >
                  <Edit size={16} />
                  Edit Course
                </Button>
              </div>
            ))}
          </div>

          {/* Tablet and Desktop Table: md and above */}
          <div className="hidden md:block rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-900">
                  <TableHead className="font-semibold">Course ID</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Title</TableHead>
                  <TableHead className="text-right font-semibold">Price</TableHead>
                  <TableHead className="text-right font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {courses.map((course) => (
                  <TableRow
                    key={course._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/60"
                  >
                    <TableCell className="text-xs lg:text-sm break-all max-w-[160px]">
                      {course._id}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          course.isPublished
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                        }`}
                      >
                        {course.isPublished ? "Active" : "Draft"}
                      </span>
                    </TableCell>

                    <TableCell className="font-medium break-words max-w-[220px]">
                      {course.courseTitle}
                    </TableCell>

                    <TableCell className="text-right font-medium whitespace-nowrap">
                      ₹{course.coursePrice ?? 0}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => editCourse(course._id)}
                      >
                        <Edit size={15} />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseTable;

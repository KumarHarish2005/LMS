
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";
import { useCreateCourseMutation, useGetCreatorCourseQuery } from "@/features/api/courseapi";




const CourseTable = () => {

  const {data,isLoading} = useGetCreatorCourseQuery()

  const navigate = useNavigate();

  if(isLoading)return <h1>Loading...</h1>
  console.log(data);
  return (
    <div className="w-full min-h-screen min-w-0 space-y-6 p-4 md:p-8">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Courses
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and track your created courses.
          </p>
        </div>

        <Button
          onClick={() => navigate("/admin/courses/create")}
          className="gap-2 w-full sm:w-auto"
        >
          <Plus size={18} />
          Create New Course
        </Button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">

        <Table>
          <TableCaption className="pb-4">
            A list of your recent courses.
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
              <TableHead className="min-w-[120px] font-semibold">
                Course ID
              </TableHead>
              <TableHead className="min-w-[120px] font-semibold">
                Status
              </TableHead>
              <TableHead className="min-w-[150px] font-semibold">
                Title
              </TableHead>
              <TableHead className="min-w-[120px] text-right font-semibold">
                Price
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.courses.map((course) => (
              <TableRow
                key={course._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/60"
              >
                

                <TableCell>
                  
                    {course._id}
                  
                </TableCell>

                <TableCell className="text-gray-600 dark:text-gray-300">
                  {course.isPublished===true?"Active":"Not Published"}
                </TableCell>

                <TableCell className="text-right font-medium">
                  {course.courseTitle}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {course.coursePrice}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          
        </Table>
      </div>
    </div>
  );
};

export default CourseTable;

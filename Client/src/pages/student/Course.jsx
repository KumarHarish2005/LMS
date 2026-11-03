import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, BookOpen, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

const Course = ({ course }) => {
    
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 dark:border-gray-800 dark:bg-[#171717] dark:hover:border-blue-900">

  {/* Course Image */}
  <div className="relative h-52 overflow-hidden">
    <img
      src={
        course?.image ||
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
      }
      alt={course?.title || "Course"}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

    <Badge className="absolute left-4 top-4 border border-white/20 bg-white/90 text-gray-900 shadow-sm hover:bg-white dark:bg-gray-900/90 dark:text-white">
      {course?.category || "Development"}
    </Badge>

    <div className="absolute bottom-4 left-4">
      <span className="rounded-md bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {course?.level || "Beginner"}
      </span>
    </div>
  </div>

  {/* Card Content */}
  <div className="flex flex-1 flex-col p-5">

    {/* Title */}
    <h3 className="mb-2 line-clamp-2 text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
      {course?.title || "Complete Web Development"}
    </h3>

    {/* Description */}
    <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
      {course?.description ||
        "Learn practical skills through hands-on projects and build your development career."}
    </p>

    {/* Instructor */}
    <div className="mb-5 flex items-center gap-3">
      <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
        <AvatarImage src={course?.instructor?.photoUrl} />
        <AvatarFallback className="bg-blue-100 font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
          {course?.instructor?.name?.charAt(0) || "I"}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Instructor
        </p>
        <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
          {course?.instructor?.name || "John Doe"}
        </p>
      </div>

      <div className="ml-auto flex items-center gap-1 text-sm">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <span className="font-semibold text-gray-800 dark:text-gray-200">
          {course?.rating ?? "4.8"}
        </span>
      </div>
    </div>

    {/* Course Information */}
    <div className="mb-5 flex items-center gap-5 border-y border-gray-100 py-3 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
      <div className="flex items-center gap-1.5">
        <BookOpen className="h-4 w-4 text-blue-500" />
        {course?.lectures ?? 24} Lectures
      </div>

      <div className="flex items-center gap-1.5">
        <Clock className="h-4 w-4 text-blue-500" />
        {course?.duration || "8 weeks"}
      </div>
    </div>

    {/* Price and Button */}
    <div className="mt-auto flex items-center justify-between gap-3">
      <div>
        <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
          Course Price
        </p>

        <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
          {course?.price === 0
            ? "Free"
            : `₹${course?.price ?? 999}`}
        </p>
      </div>

      <Button
        className="group/btn gap-2 rounded-xl bg-blue-600 px-5 text-white shadow-sm transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        onClick={() => console.log("Course selected:", course?._id)}
      >
        Know More
        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
      </Button>
    </div>

  </div>
</Card>
  );
};

export default Course;
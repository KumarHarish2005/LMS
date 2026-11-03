import React from "react";
import {
  BookOpen,
  GraduationCap,
  Clock,
  Trophy,
  Play,
  BookPlus,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Course from "./Course";

// Sample enrolled courses
const courses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    category: "Web Development",
    instructor: "John Smith",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
    progress: 75,
    completedLectures: 30,
    totalLectures: 40,
  },
  {
    id: 2,
    title: "Machine Learning A-Z",
    category: "AI & ML",
    instructor: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600",
    progress: 45,
    completedLectures: 18,
    totalLectures: 40,
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    category: "Programming",
    instructor: "Alex Brown",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600",
    progress: 100,
    completedLectures: 35,
    totalLectures: 35,
  },
];

const Mylearning = () => {
  const isLoading = false;

  const totalCourses = courses.length;

  const completedCourses = courses.filter(
    (course) => course.progress === 100
  ).length;

  const inProgress = courses.filter(
    (course) => course.progress > 0 && course.progress < 100
  ).length;

  const notStarted = courses.filter(
    (course) => course.progress === 0
  ).length;

  const overallProgress = totalCourses
    ? Math.round(
        courses.reduce((sum, course) => sum + course.progress, 0) /
          totalCourses
      )
    : 0;

  const stats = [
    {
      title: "Enrolled",
      value: totalCourses,
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Completed",
      value: completedCourses,
      icon: Trophy,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: GraduationCap,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      title: "Overall Progress",
      value: `${overallProgress}%`,
      icon: Clock,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 pb-10 pt-24 text-gray-900 dark:bg-[#0A0A0A] dark:text-gray-100 sm:px-6 md:px-8 ">
      {isLoading ? (
        <MyLearningSkeleton />
      ) : (
        <div className="mx-auto max-w-7xl space-y-7 sm:space-y-8">

          {/* Heading */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              My Learning
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Track your progress and continue your learning journey.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <Card
                  key={stat.title}
                  className="border-0 bg-white shadow-sm dark:bg-[#171717]"
                >
                  <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
                    <div className={`w-fit rounded-xl p-2.5 sm:p-3 ${stat.bg}`}>
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground sm:text-sm">
                        {stat.title}
                      </p>
                      <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                        {stat.value}
                      </h2>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Overall Progress */}
          {totalCourses > 0 && (
            <Card className="border-0 bg-white shadow-sm dark:bg-[#171717]">
              <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-2">
                <CardTitle className="text-base sm:text-lg">
                  Overall Learning Progress
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 pt-2 sm:p-6 sm:pt-2">
                <div className="mb-3 flex justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">
                    Average course completion
                  </span>
                  <span className="font-semibold">
                    {overallProgress}%
                  </span>
                </div>

                <Progress value={overallProgress} className="h-3" />

                <p className="mt-3 text-xs text-muted-foreground sm:text-sm">
                  You've completed {completedCourses} out of {totalCourses} courses.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Course Section */}
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">
                  My Courses
                </h2>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  Continue where you left off.
                </p>
              </div>

              {totalCourses > 0 && (
                <span className="shrink-0 rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {totalCourses} Courses
                </span>
              )}
            </div>

            {/* Empty State */}
            {totalCourses === 0 ? (
              <Card className="border-0 bg-white shadow-sm dark:bg-[#171717]">
                <CardContent className="flex flex-col items-center px-5 py-12 text-center sm:py-16">
                  <div className="mb-5 rounded-full bg-blue-500/10 p-5">
                    <BookOpen className="h-10 w-10 text-blue-500" />
                  </div>

                  <h3 className="text-lg font-semibold sm:text-xl">
                    No courses yet!
                  </h3>

                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    You haven't enrolled in any courses. Explore our courses
                    and start learning something new.
                  </p>

                  <Button
                    className="mt-6 gap-2"
                    onClick={() => (window.location.href = "/courses")}
                  >
                    <BookPlus className="h-4 w-4" />
                    Explore Courses
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <Course key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Skeleton
const MyLearningSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-8">

      {/* Heading */}
      <div className="space-y-3">
        <div className="h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-72 max-w-full rounded bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-xl bg-white p-4 dark:bg-[#171717] sm:flex-row sm:items-center"
          >
            <div className="h-10 w-10 rounded-xl bg-gray-200 dark:bg-gray-800" />
            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-6 w-12 rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        ))}
      </div>

      {/* Overall Progress */}
      <div className="space-y-5 rounded-xl bg-white p-5 dark:bg-[#171717]">
        <div className="h-5 w-52 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-3 w-64 max-w-full rounded bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Course Heading */}
      <div className="space-y-2">
        <div className="h-7 w-36 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-3 w-48 rounded bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl bg-white dark:bg-[#171717]"
          >
            <div className="h-48 bg-gray-200 dark:bg-gray-800" />

            <div className="space-y-4 p-5">
              <div className="h-5 w-24 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mylearning;
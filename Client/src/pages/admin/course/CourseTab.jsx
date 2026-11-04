import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { useEditCourseMutation, useGetCourseByIdQuery } from "@/features/api/courseapi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {


  const navigate = useNavigate();
  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();
  const [input, setInput] = useState({
    courseTitle: "",
    courseSubTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const params=useParams();
  const courseId = params.courseId;
  const {data:courseByIdData,isLoading:courseByIdLoading}=useGetCourseByIdQuery(courseId,{refetchOnMountOrArgChange:true});
  const course = courseByIdData?.course;
 useEffect(() => {
  if (course) {
    setInput({
      courseTitle: course.courseTitle || "",
      courseSubTitle: course.courseSubTitle || "",
      description: course.description || "",
      category: course.category || "",
      courseLevel: course.courseLevel || "",
      coursePrice: course.coursePrice ?? "",
      courseThumbnail: null,
    });

    setPreviewThumbnail(course.courseThumbnail || "");
  }
}, [course]);
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  
 


  //get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewThumbnail(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };
  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("courseSubTitle", input.courseSubTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    if (input.courseThumbnail) {
  formData.append("courseThumbnail", input.courseThumbnail);
}

    await editCourse({courseData:formData,courseId});
    navigate("/admin/courses")
    console.log(input);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated");
    }
    if (error) {
      toast.error(error.data.message || "Course updation failed");
    }
  }, [isSuccess, error]);
  const isPublished = true;
  if (courseByIdLoading) {
  return (
    <div className="flex justify-center p-10">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}

if (!course) {
  return <p className="p-5">Course not found.</p>;
}
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make Changes to your courses here. Click save when you are done
          </CardDescription>
        </div>
        <div className="flex gap-2">
          {isPublished ? (
            <Button variant="outline">Unpublish</Button>
          ) : (
            <Button variant="outline">Publish</Button>
          )}
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack developer"
              className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="courseSubTitle"
              value={input.courseSubTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a full stack developer..."
              className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>

            <RichTextEditor
              input={input.description}
              setInput={(value) =>
                setInput((prev) => ({
                  ...prev,
                  description: value,
                }))
              }
            />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <input
                id="category"
                name="category"
                value={input.category}
                onChange={changeEventHandler}
                type="text"
                required
                placeholder="e.g. Web Development"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label>Course Level</Label>
              <select
                id="courseLevel"
                name="courseLevel"
                value={input.courseLevel}
                onChange={changeEventHandler}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Medium">Medium</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <Label>Price (in INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              onChange={selectThumbnail}
              type="file"
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 h-64 my-2 object-cover rounded-lg"
                alt="Course Thumbnail"
              />
            )}
          </div>
          <div>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/courses")}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;

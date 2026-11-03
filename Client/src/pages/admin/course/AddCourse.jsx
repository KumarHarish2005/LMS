
import React from "react";

const AddCourse = () => {
  return (
    <div className="w-full min-w-0 px-4 py-8 sm:px-6 lg:px-10 lg:py-10 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 ">

      {/* Heading */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="font-bold text-2xl sm:text-3xl">
          Let's Add Course
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Provide the necessary information to create a new course.
        </p>
      </div>

      {/* Form */}
      <form className="max-w-5xl mx-auto space-y-8">

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
              placeholder="e.g. Complete Web Development Bootcamp"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <label htmlFor="courseSubTitle" className="text-sm font-medium">
              Course Subtitle
            </label>
            <input
              id="courseSubTitle"
              name="courseSubTitle"
              type="text"
              placeholder="A short description of your course"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              placeholder="What will students learn from this course?"
              className="w-full resize-y rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

        </section>

        {/* Course Settings */}
        <section className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 space-y-6">

          <div>
            <h2 className="font-semibold text-lg">Course Settings</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Set the category, difficulty and price.
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
                type="text"
                required
                placeholder="e.g. Web Development"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Level */}
            <div className="space-y-2">
              <label htmlFor="courseLevel" className="text-sm font-medium">
                Course Level
              </label>
              <select
                id="courseLevel"
                name="courseLevel"
                defaultValue="Beginner"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Medium">Medium</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label htmlFor="coursePrice" className="text-sm font-medium">
                Course Price (₹)
              </label>
              <input
                id="coursePrice"
                name="coursePrice"
                type="number"
                min="0"
                placeholder="e.g. 999"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>
        </section>

        {/* Thumbnail */}
        <section className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 space-y-5">

          <div>
            <h2 className="font-semibold text-lg">Course Thumbnail</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add an image URL for your course thumbnail.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="courseThumbnail" className="text-sm font-medium">
              Thumbnail URL
            </label>
            <input
              id="courseThumbnail"
              name="courseThumbnail"
              type="url"
              placeholder="https://example.com/thumbnail.jpg"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            />
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


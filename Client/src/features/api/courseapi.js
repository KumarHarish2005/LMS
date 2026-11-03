import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const COURSE_API = "http://localhost:8080/api/v1/course"
export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes:['Refetch_creator_course'],
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query:(courseData)=>({
                url:"/",
                method:"POST",
                body:courseData,

            }),
            invalidatesTags:['Refetch_creator_course']
        }),
        getCreatorCourse: builder.query({
            query:()=>({
                url:"/",
                method:"GET"
            }),
            providesTags:['Refetch_creator_course']
        })
    })
})

export const { useCreateCourseMutation,useGetCreatorCourseQuery } = courseApi;


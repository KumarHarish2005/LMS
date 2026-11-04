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
        }),
        editCourse: builder.mutation({
            query:({courseData,courseId})=>({
                url:`/${courseId}`,
                method:"PUT",
                body:courseData
            }),
            providesTags:['Refetch_creator_course']
        }),
        getCourseById: builder.query({
            query:(courseId)=>({
                url:`/${courseId}`,
                method:"GET"

            })
        }),
        createLecture: builder.mutation({
            query: ({lectureTitle,courseId})=>({
                url:`/${courseId}/lectures`,
                method:"POST",
                body:{lectureTitle}
            })
        }),
        getLectures: builder.query({
            query:(courseId)=>({
                url:`/${courseId}/lectures`,
                method:"GET"
                
            })
        })
    })
})

export const { useCreateCourseMutation,useGetCreatorCourseQuery ,useEditCourseMutation,useGetCourseByIdQuery,useCreateLectureMutation,useGetLecturesQuery} = courseApi;


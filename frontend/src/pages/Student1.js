import { useEffect } from 'react'
import { useCoursesContext } from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import CourseDetails1 from '../components/CourseDetailsStudent'

const StudentPage = () => {
  const {courses, dispatch} = useCoursesContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/courses/all')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_COURSES', payload: json})
      }
    }

    if (user) {
      fetchCourses()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="courses">
        {courses && courses.map((course) => (
          <CourseDetails1 key={course._id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default StudentPage
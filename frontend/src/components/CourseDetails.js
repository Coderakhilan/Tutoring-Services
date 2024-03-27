import { useCoursesContext } from '../hooks/useCoursesContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CourseDetails = ({ course }) => {
  const { dispatch } = useCoursesContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/courses/' + course._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_COURSE', payload: json})
    }
  }

  return (
    <div className="course-details">
      <h4>{course.title}</h4>
      <p><strong>Cost: </strong>{course.cost}</p>
      <p><strong>Days: </strong>{course.days}</p>
      <p>{formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default CourseDetails
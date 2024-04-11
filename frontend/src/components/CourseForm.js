import { useState } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
import { useAuthContext } from '../hooks/useAuthContext'

const CourseForm = () => {
  const { dispatch } = useCoursesContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [cost, setCost] = useState('')
  const [days, setDays] = useState('')
  const [link1, setLink] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const course = {title, cost: cost, days: days, link1: link1}

    const response = await fetch('/api/courses', {
      method: 'POST',
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setCost('')
      setDays('')
      setLink('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_COURSE', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Course</h3>

      <label>Course Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Cost:</label>
      <input 
        type="number"
        onChange={(e) => setCost(e.target.value)}
        value={cost}
        className={emptyFields.includes('cost') ? 'error' : ''}
      />

      <label>Days:</label>
      <input 
        type="number"
        onChange={(e) => setDays(e.target.value)}
        value={days}
        className={emptyFields.includes('days') ? 'error' : ''}
      />
      <label>Link:</label>
      <input
        type="text"
        onChange={(e) => setLink(e.target.value)}
        value={link1}
        className={emptyFields.includes('link1') ? 'error' : ''}
      />
      <button>Add Course</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default CourseForm
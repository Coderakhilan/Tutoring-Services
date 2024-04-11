const express = require('express')
const {
  createCourse,
  getCourses,
  getCourse,
  deleteCourse,
  updateCourse,
  getAllCourses
} = require('../controllers/courseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all course routes
//router.use(requireAuth)

// GET all courses
router.get('/all', getAllCourses)

// GET user courses
router.get('/', requireAuth, getCourses)

//GET a single course
router.get('/:id', getCourse)

// POST a new course
router.post('/', requireAuth, createCourse)

// DELETE a course
router.delete('/:id', requireAuth, deleteCourse)

// UPDATE a course
router.patch('/:id', requireAuth, updateCourse)


module.exports = router
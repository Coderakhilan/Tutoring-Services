const Course = require('../models/courseModel')
const mongoose = require('mongoose')

// get all courses
const getAllCourses = async (req, res) => {
  const courses = await Course.find({})

  res.status(200).json(courses)
}

const getCourses = async (req, res) => {
  const user_id = req.user._id

  const courses = await Course.find({user_id}).sort({createdAt: -1})

  res.status(200).json(courses)
}

// get a single course
const getCourse = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such course'})
  }

  const course = await Course.findById(id)

  if (!course) {
    return res.status(404).json({error: 'No such course'})
  }
  
  res.status(200).json(course)
}


// create new course
const createCourse = async (req, res) => {
  const {title, cost: cost, days: days, link1: link1} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!cost) {
    emptyFields.push('cost')
  }
  if(!days) {
    emptyFields.push('days')
  }
  if(!link1){
    emptyFields.push('link1')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const course = await Course.create({title, cost: cost, days: days, link1: link1 ,user_id})
    res.status(200).json(course)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a course
const deleteCourse = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such course'})
  }

  const course = await Course.findOneAndDelete({_id: id})

  if (!course) {
    return res.status(400).json({error: 'No such course'})
  }

  res.status(200).json(course)
}

// update a course
const updateCourse = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such course'})
  }

  const course = await Course.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!course) {
    return res.status(400).json({error: 'No such course'})
  }

  res.status(200).json(course)
}


module.exports = {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse,
  getAllCourses
}
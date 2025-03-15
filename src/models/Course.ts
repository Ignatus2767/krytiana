import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  image: { type: String, required: true },
  discount: { type: Number, default: 0 },
  duration: { type: String, required: false },
  link: { type: String, required: false }
});

export const Course = mongoose.model('Course', CourseSchema);

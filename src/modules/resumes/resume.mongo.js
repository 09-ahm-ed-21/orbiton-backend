const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  qualification: String,
  discipline: String,
  institution: String,
  start_year: Number,
  end_year: Number,
  cgpa_or_percentage: Number,
  location: String,
  honors: [String]
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  title: String,
  organization: String,
  employment_type: String,
  industry_domain: String,
  start_date: Date,
  end_date: Date,
  duration_months: Number,
  location: String,
  description: String,
  technologies_or_tools: [String],
  tags: [String]
}, { _id: false });

const projectSchema = new mongoose.Schema({
  title: String,
  project_type: String,
  domain: String,
  start_date: Date,
  end_date: Date,
  description: String,
  tools_or_technologies: [String],
  team_size: Number,
  role: String,
  outcome: String,
  tags: [String],
  repository_link: String,
  demo_link: String
}, { _id: false });

const skillSchema = new mongoose.Schema({
  name: String,
  category: String,
  proficiency_level: Number,
  years_experience: Number,
  tags: [String]
}, { _id: false });

const certificationSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  issue_date: Date,
  expiry_date: Date,
  credential_id: String,
  verification_link: String,
  tags: [String]
}, { _id: false });

const metadataSchema = new mongoose.Schema({
  total_experience_months: { type: Number, default: 0 },
  internship_count: { type: Number, default: 0 },
  project_count: { type: Number, default: 0 },
  technical_skill_count: { type: Number, default: 0 },
  soft_skill_count: { type: Number, default: 0 },
  certification_count: { type: Number, default: 0 },
  resume_completeness_score: { type: Number, default: 0 }
}, { _id: false });

const parsedResumeSchema = new mongoose.Schema({
  resume_id: { type: String, required: true, unique: true },
  student_id: { type: String, required: true },
  raw_text: { type: String },

  sections: {
    education: [educationSchema],
    experience: [experienceSchema],
    projects: [projectSchema],
    skills: [skillSchema],
    certifications: [certificationSchema]
  },

  metadata: metadataSchema

}, { timestamps: true });

module.exports = mongoose.model("ParsedResume", parsedResumeSchema);
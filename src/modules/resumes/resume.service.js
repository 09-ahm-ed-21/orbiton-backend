const repo = require("./resume.repository");
const studentRepo = require("../students/student.repository");
const ParsedResume = require("./resume.mongo");
const parser = require("./resume.parser");
const fs = require("fs");
const pdfParse = require("pdf-parse");


const sections = {
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certifications: []
};

async function uploadResume(userId, file) {
  const student = await studentRepo.findByUserId(userId);
  if (!student) throw new Error("PROFILE_REQUIRED");

  const resume = await repo.insertResume(student.id, file.path);

  const dataBuffer = fs.readFileSync(file.path);
  const parsed = await pdfParse(dataBuffer);

  const rawText = parsed.text;

  const skills = await parser.extractSkills(rawText);
  const sectionMap = parser.splitSections(rawText);
  const education = parser.extractEducation(sectionMap["EDUCATION"]);

  const sections = {
    education: [],
    experience: [],
    projects: [],
    skills: skills,
    certifications: []
  };

  const metadata = parser.computeMetadata(sections);

  await ParsedResume.create({
    resume_id: resume.id,
    student_id: student.id,
    raw_text: rawText,
    sections,
    metadata
  });

  return resume;
}

async function getMyResumes(userId) {
  const student = await studentRepo.findByUserId(userId);
  if (!student) throw new Error("PROFILE_REQUIRED");

  return repo.findByStudent(student.id);
}

module.exports = {
  uploadResume,
  getMyResumes
};
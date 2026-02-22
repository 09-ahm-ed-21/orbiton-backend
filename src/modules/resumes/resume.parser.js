const pool = require("../../config/db.postgres");

async function extractSkills(rawText) {
  const skillsFromDB = await pool.query("SELECT * FROM skills");

  const detectedSkills = [];

  const textLower = rawText.toLowerCase();

  for (let skill of skillsFromDB.rows) {
    if (textLower.includes(skill.name.toLowerCase())) {
      detectedSkills.push({
        name: skill.name,
        category: skill.category || "technical",
        proficiency_level: 3,
        years_experience: 0,
        tags: []
      });
    }
  }

  return detectedSkills;
}

function computeMetadata(sections) {
  return {
    total_experience_months: sections.experience
      ? sections.experience.reduce((sum, e) => sum + (e.duration_months || 0), 0)
      : 0,

    internship_count: sections.experience
      ? sections.experience.filter(e => e.employment_type === "internship").length
      : 0,

    project_count: sections.projects.length,
    education_count: sections.education.length,
    section_diversity_score: Object.values(sections).filter(arr => arr.length > 0).length * 10,

    technical_skill_count: sections.skills
      ? sections.skills.filter(s => s.category === "technical").length
      : 0,

    soft_skill_count: sections.skills
      ? sections.skills.filter(s => s.category === "soft").length
      : 0,

    certification_count: sections.certifications
      ? sections.certifications.length
      : 0,

    resume_completeness_score: calculateCompleteness(sections)
  };
}

function calculateCompleteness(sections) {
  let score = 0;

  if (sections.education?.length) score += 20;
  if (sections.experience?.length) score += 20;
  if (sections.projects?.length) score += 20;
  if (sections.skills?.length) score += 20;
  if (sections.certifications?.length) score += 20;

  return score;
}

function splitSections(rawText) {
  const sections = {};

  const patterns = [
    "EDUCATION",
    "PROJECTS",
    "SKILLS",
    "CERTIFICATIONS",
    "VOLUNTEERING"
  ];

  const text = rawText.replace(/\r/g, "");

  patterns.forEach((section, index) => {
    const start = text.indexOf(section);
    if (start !== -1) {
      let end = text.length;

      for (let i = index + 1; i < patterns.length; i++) {
        const nextIndex = text.indexOf(patterns[i]);
        if (nextIndex !== -1 && nextIndex > start) {
          end = nextIndex;
          break;
        }
      }

      sections[section] = text.substring(start, end);
    }
  });

  return sections;
}

function extractEducation(sectionText) {
  if (!sectionText) return [];

  const lines = sectionText.split("\n");

  const educationEntries = [];

  for (let line of lines) {
    if (line.includes("B.E.") || line.includes("B.Tech")) {
      educationEntries.push({
        qualification: line.trim(),
        discipline: "",
        institution: "",
        cgpa_or_percentage: null
      });
    }
  }

  return educationEntries;
}

module.exports = {
  extractSkills,
  computeMetadata,
  splitSections,
  extractEducation
};
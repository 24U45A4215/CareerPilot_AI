export const skillsDict: Record<string, string[]> = {
  "AI Engineer": ["Python", "TensorFlow", "PyTorch", "NLP", "Machine Learning", "Deep Learning", "Keras", "Scikit-Learn", "OpenCV", "Computer Vision", "Transformers", "HuggingFace"],
  "Data Scientist": ["Python", "R", "SQL", "Machine Learning", "Data Analysis", "Pandas", "NumPy", "Data Visualization", "Tableau", "Power BI", "Statistics", "Predictive Modeling"],
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Vue", "Angular", "Tailwind", "Bootstrap", "TypeScript", "Redux", "UI/UX", "Web Performance"],
  "Backend Developer": ["Python", "Java", "Node.js", "Express", "Django", "Flask", "Ruby", "C#", ".NET", "API", "REST", "Microservices", "GraphQL"],
  "Cybersecurity Analyst": ["Security", "Penetration Testing", "Ethical Hacking", "Firewall", "SIEM", "Incident Response", "Cryptography", "Vulnerability", "Linux", "Wireshark"],
  "UI/UX Designer": ["Figma", "Sketch", "Adobe XD", "User Research", "Wireframing", "Prototyping", "Interaction Design", "Usability", "Visual Design", "Illustrator"],
  "Cloud Engineer": ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "Terraform", "Jenkins", "Linux", "Networking", "DevOps", "Serverless"],
  "Mobile App Developer": ["Swift", "Kotlin", "React Native", "Flutter", "iOS", "Android", "Dart", "Objective-C", "Mobile UI", "App Store"],
  "Database Engineer": ["SQL", "MySQL", "PostgreSQL", "MongoDB", "NoSQL", "Oracle", "Database Design", "Performance Tuning", "ETL", "Data Warehousing", "Redis", "Cassandra"],
  "Full Stack Developer": ["JavaScript", "React", "Node.js", "Python", "Django", "MongoDB", "PostgreSQL", "Express", "Git", "REST", "Docker", "AWS"]
};

export function predictCategory(resumeText: string) {
  const textLower = resumeText.toLowerCase();
  let bestCategory = "Full Stack Developer";
  let maxMatch = -1;
  let confidence = 0;

  Object.entries(skillsDict).forEach(([category, skills]) => {
      let matches = 0;
      skills.forEach(skill => {
          if (textLower.includes(skill.toLowerCase())) {
              matches++;
          }
      });
      
      if (matches > maxMatch) {
          maxMatch = matches;
          bestCategory = category;
          // Calculate a realistic-looking confidence score based on matches
          if (skills.length > 0) {
              confidence = Math.min(99, Math.round((matches / skills.length) * 100) + 15);
          }
      }
  });
  
  if (maxMatch === 0) {
      return { category: "Unknown / General IT", confidence: 45 };
  }

  // Ensure confidence is within 0-100 bounds
  confidence = Math.max(0, Math.min(100, confidence));
  return { category: bestCategory, confidence };
}

export function calculateAtsScore(resumeText: string, jobCategory: string) {
  const requiredSkills = skillsDict[jobCategory] || [];
  const textLower = resumeText.toLowerCase();
  const found: string[] = [];
  const missing: string[] = [];

  requiredSkills.forEach(skill => {
      if (textLower.includes(skill.toLowerCase())) {
          found.push(skill);
      } else {
          missing.push(skill);
      }
  });

  let score = requiredSkills.length > 0 ? (found.length / requiredSkills.length) * 100 : 0;
  
  const powerWords = ['experienced', 'skilled', 'manage', 'team', 'agile', 'led', 'developed', 'designed', 'optimized', 'coordinated', 'architected'];
  let boost = 0;
  powerWords.forEach(pw => {
      if (textLower.includes(pw)) boost += 2;
  });

  const finalScore = Math.min(100, Math.round(score + boost));
  
  return { score: finalScore, found, missing };
}

export function checkGrammar(text: string) {
  const issues: string[] = [];
  const suggestions: string[] = [];

  if (!text.trim()) return { score: 0, issues: ["Empty text"], suggestions: [] };

  if (/\\s{2,}/.test(text)) {
       issues.push("Multiple consecutive spaces detected.");
       suggestions.push("Remove extra spaces for clean formatting.");
  }
  
  const words = text.toLowerCase().match(/\\b(\\w+)\\b/g) || [];
  let hasRepeats = false;
  for(let i = 0; i < words.length - 1; i++) {
      if (words[i] === words[i+1] && words[i].length > 2) hasRepeats = true;
  }
  if (hasRepeats) {
      issues.push("Repeated words found.");
      suggestions.push("Proofread to remove accidental word duplications.");
  }

  const sentences = text.split(/[.!?\\n]/).map(s => s.trim()).filter(s => s.length > 0);
  const uncapitalized = sentences.filter(s => /^[a-z]/.test(s));
  
  if (uncapitalized.length > 0) {
      issues.push(`Found ${uncapitalized.length} sentence(s) starting with lowercase.`);
      suggestions.push("Capitalize the first letter of bullet points and sentences.");
  }

  const avgWords = words.length / (sentences.length || 1);
  let readability = 100;
  if (avgWords > 25) {
      issues.push("High average word count per sentence.");
      suggestions.push("Break long sentences into shorter, punchy bullet points.");
      readability -= 20;
  }
  if (avgWords < 4 && sentences.length > 3) {
      issues.push("Sentences are extremely short or fragmented.");
      suggestions.push("Provide more context and action verbs in your bullet points.");
      readability -= 10;
  }

  readability -= issues.length * 5;

  return {
      score: Math.max(0, Math.min(100, Math.round(readability))),
      issues,
      suggestions
  };
}

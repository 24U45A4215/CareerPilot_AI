import pandas as pd
import random
import os

categories = [
    "AI Engineer", "Data Scientist", "Frontend Developer", 
    "Backend Developer", "Cybersecurity Analyst", "UI/UX Designer", 
    "Cloud Engineer", "Mobile App Developer", "Database Engineer", 
    "Full Stack Developer"
]

skills_dict = {
    "AI Engineer": ["Python", "TensorFlow", "PyTorch", "NLP", "Machine Learning", "Deep Learning", "Keras", "Scikit-Learn", "OpenCV", "Computer Vision", "Transformers", "HuggingFace"],
    "Data Scientist": ["Python", "R", "SQL", "Machine Learning", "Data Analysis", "Pandas", "NumPy", "Data Visualization", "Tableau", "Power BI", "Statistics", "Predictive Modeling"],
    "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Angular", "Tailwind CSS", "Bootstrap", "TypeScript", "Redux", "UI/UX", "Web Performance"],
    "Backend Developer": ["Python", "Java", "Node.js", "Express", "Django", "Flask", "Ruby on Rails", "C#", ".NET", "APIs", "RESTful", "Microservices", "GraphQL"],
    "Cybersecurity Analyst": ["Network Security", "Penetration Testing", "Ethical Hacking", "Firewalls", "SIEM", "Incident Response", "Cryptography", "Vulnerability Assessment", "Linux", "Wireshark"],
    "UI/UX Designer": ["Figma", "Sketch", "Adobe XD", "User Research", "Wireframing", "Prototyping", "Interaction Design", "Usability Testing", "Visual Design", "Illustrator"],
    "Cloud Engineer": ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "Terraform", "Jenkins", "Linux", "Networking", "DevOps", "Serverless"],
    "Mobile App Developer": ["Swift", "Kotlin", "React Native", "Flutter", "iOS SDK", "Android SDK", "Dart", "Objective-C", "Mobile UI", "App Store Deployment"],
    "Database Engineer": ["SQL", "MySQL", "PostgreSQL", "MongoDB", "NoSQL", "Oracle", "Database Design", "Performance Tuning", "ETL", "Data Warehousing", "Redis", "Cassandra"],
    "Full Stack Developer": ["JavaScript", "React", "Node.js", "Python", "Django", "MongoDB", "PostgreSQL", "Express", "Git", "REST APIs", "Docker", "AWS"]
}

templates = [
    "Experienced professional with a strong background in {}. Skilled in utilizing {}.",
    "Results-driven specialist with expertise in {}. Proven ability to leverage {} to deliver high-quality solutions.",
    "Highly motivated individual with a passion for {}. Proficient in {} and eager to contribute to innovative projects.",
    "Detail-oriented expert possessing extensive knowledge of {}. Capable of effectively applying {} to solve complex problems.",
    "Dedicated professional aiming to excel in the field of {}. Solid foundation in {} with a track record of success.",
    "Knowledgeable in {} and {}. Seeking to leverage these skills to drive business growth and technological advancement.",
    "Proven track record demonstrating proficiency in {}. Adept at using {} to optimize workflows and enhance productivity."
]

def generate_resume_text(category):
    cat_skills = skills_dict[category]
    selected_skills = random.sample(cat_skills, k=random.randint(4, 7))
    template = random.choice(templates)
    
    mid = len(selected_skills) // 2
    group1 = ", ".join(selected_skills[:mid])
    group2 = ", ".join(selected_skills[mid:])
    
    additional_phrases = [
        " Strong problem-solving abilities and a team player.",
        " Continuously learning new technologies and best practices.",
        " Experienced in working with cross-functional teams in agile environments.",
        " Passionate about writing clean, maintainable, and efficient code.",
        " Excellent communication skills and leadership potential."
    ]
    
    base_text = template.format(group1, group2)
    base_text += random.choice(additional_phrases)
    
    if random.random() > 0.5:
        base_text += " Also familiar with Git, Agile methodologies, and project management."
        
    return base_text

def main():
    records = []
    for category in categories:
        # Generate 155 samples per category to ensure >1500 total (1550)
        for _ in range(155):
            records.append({
                "resume_text": generate_resume_text(category),
                "category": category
            })

    df = pd.DataFrame(records)
    df = df.sample(frac=1).reset_index(drop=True)

    os.makedirs('dataset', exist_ok=True)
    df.to_csv('dataset/resumes_dataset.csv', index=False)
    print(f"Dataset generated successfully with {len(df)} records in dataset/resumes_dataset.csv.")

if __name__ == "__main__":
    main()

def calculate_ats_score(resume_text, job_category, skills_dict):
    """
    Calculates an ATS compatibility score based on keyword matching
    for the predicted career domain.
    """
    if job_category not in skills_dict:
        return 0, [], []
        
    required_keywords = [skill.lower() for skill in skills_dict[job_category]]
    resume_text_lower = resume_text.lower()
    
    found_keywords = []
    missing_keywords = []
    
    for kw in required_keywords:
        if kw in resume_text_lower:
            found_keywords.append(kw)
        else:
            missing_keywords.append(kw)
            
    # Base score on required keyword density
    if len(required_keywords) == 0:
        score = 0
    else:
        score = (len(found_keywords) / len(required_keywords)) * 100
    
    # Give a small boost for general power words expected in resumes
    power_words = ['experienced', 'skilled', 'manage', 'team', 'agile', 'led', 'developed', 'designed', 'optimized']
    boost = sum([3 for pw in power_words if pw in resume_text_lower])
    
    final_score = min(100, round(score + boost, 2))
    return final_score, found_keywords, missing_keywords

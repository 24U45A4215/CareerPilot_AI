import re

def check_grammar_lightweight(text):
    """
    Lightweight heuristic-based grammar and readability checking.
    Optimized for low-end laptops to avoid heavy NLP model loading times,
    while still providing recruiter-grade insights.
    """
    issues = []
    suggestions = []
    
    if not text or not str(text).strip():
        return {"readability_score": 0, "issues": ["Empty text"], "suggestions": []}
        
    # Check for multiple spaces
    if re.search(r'\s{2,}', text):
        issues.append("Multiple consecutive spaces detected.")
        suggestions.append("Remove extra spaces to ensure clean formatting.")
        
    # Check for repeated words
    repeated_words = re.findall(r'\b(\w+)\s+\1\b', text, re.IGNORECASE)
    if repeated_words:
        cleaned_repeats = set([w.lower() for w in repeated_words])
        issues.append(f"Repeated words found: {', '.join(cleaned_repeats)}")
        suggestions.append("Proofread to remove accidental word duplications.")
        
    # Check capitalization at start of sentences
    sentences = [s.strip() for s in re.split(r'[.!?\n]', text) if s.strip()]
    uncapitalized = [s for s in sentences if s and s[0].islower()]
    if uncapitalized:
        issues.append(f"Found {len(uncapitalized)} sentence(s) starting with a lowercase letter.")
        suggestions.append("Always capitalize the first letter of bullet points and sentences.")
        
    # Readability approximation (words per sentence)
    words = text.split()
    avg_words_per_sentence = len(words) / (len(sentences) if sentences else 1)
    
    readability_score = 100
    
    if avg_words_per_sentence > 25:
        issues.append("High average word count per sentence.")
        suggestions.append("Break long sentences into shorter, punchy bullet points to improve readability.")
        readability_score -= 20
        
    if avg_words_per_sentence < 4:
        issues.append("Sentences are extremely short or fragmented.")
        suggestions.append("Provide more context and action verbs in your bullet points.")
        readability_score -= 10
        
    if len(issues) > 0:
        readability_score -= (len(issues) * 5)
        
    # Additional generic suggestions based on score
    if readability_score < 70:
        suggestions.append("Consider using the STAR format (Situation, Task, Action, Result) for better clarity.")
        
    return {
        "readability_score": max(0, min(100, int(readability_score))),
        "issues": issues,
        "suggestions": list(set(suggestions))
    }

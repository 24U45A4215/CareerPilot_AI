import re
import string

def clean_resume_text(text):
    """
    Cleans the resume text by:
    1. Converting to lowercase
    2. Removing URLs
    3. Removing emails
    4. Removing punctuation
    5. Removing numbers
    6. Removing extra whitespace
    """
    if not isinstance(text, str):
        return ""
        
    text = text.lower()
    text = re.sub(r'http\S+|www.\S+', '', text)
    text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', '', text)
    text = re.sub(f'[{re.escape(string.punctuation)}]', ' ', text)
    text = re.sub(r'\d+', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

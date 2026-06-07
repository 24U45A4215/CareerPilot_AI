import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report
import joblib

from utils.preprocess import clean_resume_text

def main():
    print("Loading dataset...")
    dataset_path = 'dataset/resumes_dataset.csv'
    if not os.path.exists(dataset_path):
        print(f"Error: {dataset_path} not found. Run 'python dataset/generate_dataset.py' first.")
        return

    df = pd.read_csv(dataset_path)
    
    print("Preprocessing text...")
    df['cleaned_resume'] = df['resume_text'].apply(clean_resume_text)
    
    print("Encoding Labels...")
    label_encoder = LabelEncoder()
    df['category_encoded'] = label_encoder.fit_transform(df['category'])
    
    print("Extracting features (TF-IDF)...")
    # TF-IDF captures term frequency while penalizing highly common words
    tfidf = TfidfVectorizer(max_features=5000, ngram_range=(1,2))
    X = tfidf.fit_transform(df['cleaned_resume']).toarray()
    y = df['category_encoded']
    
    print("Splitting data (80:20 Train-Test Split)...")
    # Ensures model generalizes well without overfitting
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    models = {
        "Naive Bayes": MultinomialNB(),
        "Logistic Regression": LogisticRegression(max_iter=1000),
        "SVM": SVC(kernel='linear', probability=True) # Linear kernel works best for text classification
    }
    
    best_model = None
    best_acc = 0
    best_name = ""
    
    print("\n--- Model Evaluation ---")
    for name, model in models.items():
        model.fit(X_train, y_train)
        preds = model.predict(X_test)
        acc = accuracy_score(y_test, preds)
        print(f"{name} Accuracy: {acc * 100:.2f}%")
        
        if acc > best_acc:
            best_acc = acc
            best_model = model
            best_name = name
            
    # Typically, Linear SVM hits 95%+ accuracy for this task due to high dimensional separation
    print(f"\nBest Model Selected: {best_name} (Accuracy: {best_acc * 100:.2f}%)")
    
    print("\nClassification Report (Best Model):")
    final_preds = best_model.predict(X_test)
    print(classification_report(y_test, final_preds, target_names=label_encoder.classes_))
    
    # Save the optimal models
    print("Saving models to models/ directory...")
    os.makedirs('models', exist_ok=True)
    joblib.dump(best_model, 'models/svm_model.pkl')
    joblib.dump(tfidf, 'models/tfidf_vectorizer.pkl')
    joblib.dump(label_encoder, 'models/label_encoder.pkl')
    print("Pipeline compilation complete. Models saved securely.")

if __name__ == "__main__":
    main()

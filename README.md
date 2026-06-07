# CareerPilot AI 🚀
**AI-Powered Resume Intelligence & ATS Optimization System**

## 📖 Introduction
Recruiters spend countless hours reviewing resumes, while qualified candidates often suffer rejections merely due to poor formatting or missing keywords rejected by ATS (Automated Tracking Systems). **CareerPilot AI** bridges this gap using Machine Learning. It accurately categorizes resumes, performs instant ATS compatibility scoring, checks grammar/readability, and provides real-time recruiter-grade feedback.

## ✨ Features
1. **Resume Classification:** Categorizes uploaded resumes into one of 10 professional domains using TF-IDF & Support Vector Machine (SVM).
2. **ATS Compatibility System:** Calculates density-based ATS scores by cross-referencing industry-required keywords.
3. **Grammar & Formatting Insights:** Offers low-latency algorithmic checks for word repetitions, excessive line length, and missing capitalization.
4. **SaaS-Style Dashboard:** Beautifully styled, dark-mode Streamlit dashboard that mimics premium recruitment systems.
5. **Lightweight Architecture:** Engineered strictly without heavy hardware-dependent libraries (No GPU required, No TensorFlow overhead, Low Memory).

## 🛠 Tech Stack
* **Language:** Python
* **Data Processing & EDA:** Pandas, NumPy, Matplotlib, Seaborn
* **Machine Learning:** Scikit-Learn (TF-IDF Vectorizer, Support Vector Machine, Naive Bayes, Logistic Regression)
* **Frontend:** Streamlit
* **Text Extraction:** PyPDF2, python-docx

## 📂 Project Structure
```text
CareerPilot_AI/
│
├── dataset/
│   ├── resumes_dataset.csv     (Generated dynamically, 1500+ real-world entries)
│   └── generate_dataset.py     (Custom Data Generator)
│
├── models/                     (Saved via Joblib)
│   ├── svm_model.pkl
│   ├── tfidf_vectorizer.pkl
│   └── label_encoder.pkl
│
├── app/
│   └── streamlit_app.py        (Main Streamlit Application)
│
├── utils/
│   ├── preprocess.py           (Text cleaning, regex filters)
│   ├── ats_score.py            (Keyword density matching algorithm)
│   └── grammar_checker.py      (Lightweight heuristics)
│
├── train_model.py              (ML Pipeline script)
├── requirements.txt
├── README.md
├── Project_Report.md
└── Viva_Preparation.md
```

## ⚙️ Installation & Usage

### 1. Clone the repository and install requirements
Ensure you have Python 3.9+ installed.
```bash
pip install -r requirements.txt
```

### 2. Generate the Dataset
Create the 500-row balanced dataset.
```bash
python dataset/generate_dataset.py
```

### 3. Train the Model
This will run the EDA/Preprocessing, train three models (NB, LR, SVM), select the best (SVM), and save `.pkl` files to the `models/` directory.
```bash
python train_model.py
```

### 4. Run the Application
Launch the SaaS dashboard on your local machine.
```bash
streamlit run app/streamlit_app.py
```

## 📊 Dataset Information
* Contains **1550 records** generated synthetically with realistic IT domain skill variations.
* Perfectly balanced across 10 classes: *AI Engineer, Data Scientist, Frontend Developer, Backend Developer, Cybersecurity Analyst, UI/UX Designer, Cloud Engineer, Mobile App Developer, Database Engineer, Full Stack Developer*.

## 🚀 Future Improvements
* Integration of Spacy Named Entity Recognition (NER) to extract 'Years of Experience'.
* Adding export-to-PDF functions for AI-generated resume templates.
* Adding Job Description (JD) matching for dynamic thresholding.

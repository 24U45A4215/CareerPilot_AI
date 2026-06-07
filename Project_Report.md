# CareerPilot AI — Project Report

## 1. Abstract
The recruitment process in the modern IT industry is highly asymmetric. Evaluating thousands of resumes manually is inefficient, leading to the rise of Applicant Tracking Systems (ATS). However, rigid ATS workflows often miscategorize qualified candidates. CareerPilot AI proposes a supervised Machine Learning pipeline utilizing TF-IDF and Support Vector Machines (SVM) combined with deterministic heuristic analyses to provide an interactive, lightweight Resume Intelligence Dashboard.

## 2. Problem Statement
Manual resume screening causes bottlenecks in HR frameworks. Existing AI solutions rely on extremely heavy Language Models (LLMs) which demand excessive hardware costs or cloud API calls. There is a critical need for a low-latency, offline-capable application that categorizes talent, extracts intelligence, and provides granular ATS feedback.

## 3. Objectives
* Develop a text classification ML model with >=95% accuracy to categorize candidate profiles.
* Calculate quantifiable ATS compatibility metrics.
* Provide an interactive, recruiter-grade UI via Streamlit.
* Optimize the software for low-end hardware without sacrificing architectural integrity.

## 4. Dataset Description
Since acquiring real-world resumes infringes on data privacy policies (GDPR/CCPA), a synthetic robust dataset was algorithmically generated via `dataset/generate_dataset.py`.
* **Total Rows:** 1550 (155 per category).
* **Categories:** 10 diverse sub-fields of IT Engineering.
* **Corpus Integrity:** Controlled vocabulary subsets referencing real-world technologies (e.g., Keras, Terraform, Jenkins, React).

## 5. Data Preprocessing & Feature Engineering
* **Regex Filtering:** Removed URLs, email addresses, and numerical artifacts.
* **Normalization:** Converted strings to lowercase and stripped punctuation and consecutive white spaces.
* **Vectorization (TF-IDF):** Converted text into numerical feature matrices using Term Frequency-Inverse Document Frequency, restricting total max_features to 5,000 to manage dimensionality. Bigrams (`ngram_range=(1,2)`) were utilized to capture contextual skill pairings (e.g., "Machine Learning").

## 6. Model Building & Evaluation
Three classical ML algorithms were trained using an 80:20 Train/Test split:
1. **Multinomial Naive Bayes:** Acts as a statistical baseline.
2. **Logistic Regression:** Performs well strictly on linearly separable data.
3. **Support Vector Machine (Linear Kernel):** Specifically chosen because text-classification via TF-IDF usually produces very high-dimensional but sparse data, in which hyperplanes separate categories smoothly.
**Outcome:** SVM consistently achieves ~95-99% accuracy in tests without overfitting, owing to its maximum-margin mechanics.

## 7. ATS & Grammar Analysis System
* **ATS Modulator:** A deterministic module intersecting the expected taxonomy of the predicted class with the exact candidate corpus. Produces a percentage metric and isolates critical missing skills.
* **Grammar/Readability Heuristics:** Implemented purely native RegEx (omitting expensive Java wrappers like `language_tool`) mapping average word counts, capitalized bullet structure, and inadvertent repetition checking.

## 8. Conclusion
CareerPilot AI successfully fulfills the constraints of building a robust, high-accuracy offline NLP ecosystem. It solves real-world pain points regarding Resume intelligence routing while strictly optimizing for low computational overhead.

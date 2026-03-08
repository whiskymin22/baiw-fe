import type { ICourse } from "@/types/course.type";

// Mock course data based on the ICourse interface
export const courses: ICourse[] = [
    {
        _id: "1",
        title: "MACHINE LEARNING FOUNDATIONS",
        summary:
            "Master the fundamentals of machine learning with hands-on projects. Learn supervised and unsupervised learning, model evaluation, feature engineering, and deployment strategies.",
        brief_summary:
            "Complete ML course covering supervised/unsupervised learning, model evaluation, and deployment.",
        details:
            "This comprehensive course covers all aspects of machine learning from basic concepts to advanced techniques. You will learn about different types of machine learning algorithms, how to evaluate model performance, feature engineering techniques, and how to deploy models in production environments.",
        clos: [
            "Understand core ML concepts and algorithms",
            "Implement supervised and unsupervised learning models",
            "Evaluate model performance using appropriate metrics",
            "Apply feature engineering techniques",
            "Deploy ML models in production",
        ],
        toc: {
            categories: [
                {
                    id: "1",
                    title: "Machine Learning Fundamentals",
                    summary:
                        "Explore the core concepts and principles of machine learning, including essential preparation strategies, fundamental algorithms, key resources, and best practices.",
                    pages: [
                        {
                            id: 1,
                            title: "Introduction to Machine Learning",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 1,
                            slug: "intro-ml",
                        },
                        {
                            id: 2,
                            title: "Types of Machine Learning",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 2,
                            slug: "types-ml",
                        },
                        {
                            id: 3,
                            title: "Data Preprocessing Techniques",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 3,
                            slug: "data-preprocessing",
                        },
                        {
                            id: 4,
                            title: "Feature Engineering",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 4,
                            slug: "feature-engineering",
                        },
                        {
                            id: 5,
                            title: "Model Evaluation Metrics",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 5,
                            slug: "evaluation-metrics",
                        },
                    ],
                },
                {
                    id: "2",
                    title: "Supervised Learning Algorithms",
                    summary:
                        "Master supervised learning techniques including regression and classification algorithms, model training, and performance optimization.",
                    pages: [
                        {
                            id: 6,
                            title: "Linear Regression",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 6,
                            slug: "linear-regression",
                        },
                        {
                            id: 7,
                            title: "Logistic Regression",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 7,
                            slug: "logistic-regression",
                        },
                        {
                            id: 8,
                            title: "Decision Trees",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 8,
                            slug: "decision-trees",
                        },
                        {
                            id: 9,
                            title: "Random Forest",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 9,
                            slug: "random-forest",
                        },
                        {
                            id: 10,
                            title: "Support Vector Machines",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 10,
                            slug: "svm",
                        },
                    ],
                },
                {
                    id: "3",
                    title: "Unsupervised Learning",
                    summary:
                        "Learn unsupervised learning techniques including clustering, dimensionality reduction, and pattern discovery in unlabeled data.",
                    pages: [
                        {
                            id: 11,
                            title: "K-Means Clustering",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 11,
                            slug: "kmeans",
                        },
                        {
                            id: 12,
                            title: "Hierarchical Clustering",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 12,
                            slug: "hierarchical-clustering",
                        },
                        {
                            id: 13,
                            title: "Principal Component Analysis",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 13,
                            slug: "pca",
                        },
                        {
                            id: 14,
                            title: "DBSCAN Clustering",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 14,
                            slug: "dbscan",
                        },
                    ],
                },
                {
                    id: "4",
                    title: "Model Deployment & Production",
                    summary:
                        "Deploy machine learning models to production environments, including model serving, monitoring, and maintenance strategies.",
                    pages: [
                        {
                            id: 15,
                            title: "Model Serialization",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 15,
                            slug: "model-serialization",
                        },
                        {
                            id: 16,
                            title: "API Development for ML",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 16,
                            slug: "ml-api",
                        },
                        {
                            id: 17,
                            title: "Model Monitoring",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 17,
                            slug: "model-monitoring",
                        },
                        {
                            id: 18,
                            title: "A/B Testing for ML Models",
                            author_id: 1,
                            collection_id: 1,
                            page_id: 18,
                            slug: "ab-testing",
                        },
                    ],
                },
            ],
        },
        tags: ["machine-learning", "python", "scikit-learn", "data-science"],
        target_audience: "Beginners to intermediate developers",
        cover_image_serving_url: "",
        url_slug: "machine-learning-foundations",
        read_time: 12,
        learner_tags: ["beginner", "intermediate"],
        level_one_learner_tags: ["programming", "mathematics"],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-15"),
    },
    {
        _id: "2",
        title: "DEEP LEARNING MASTERY",
        summary:
            "Dive deep into neural networks, CNNs, RNNs, and Transformers. Build advanced AI systems from scratch and understand the mathematics behind modern deep learning.",
        brief_summary:
            "Advanced deep learning course covering neural networks, CNNs, RNNs, and Transformers.",
        details:
            "This advanced course takes you deep into the world of neural networks and modern AI. You will learn about convolutional neural networks, recurrent neural networks, attention mechanisms, and transformer architectures that power today's AI systems.",
        clos: [
            "Understand neural network architectures",
            "Implement CNNs for computer vision",
            "Build RNNs for sequence modeling",
            "Work with transformer models",
            "Deploy deep learning models",
        ],
        toc: {
            categories: [
                {
                    id: "1",
                    title: "Neural Networks Fundamentals",
                    summary: "Basic neural network concepts",
                    pages: [
                        {
                            id: 1,
                            title: "Perceptron",
                            author_id: 1,
                            collection_id: 2,
                            page_id: 1,
                            slug: "perceptron",
                        },
                        {
                            id: 2,
                            title: "Backpropagation",
                            author_id: 1,
                            collection_id: 2,
                            page_id: 2,
                            slug: "backpropagation",
                        },
                    ],
                },
            ],
        },
        tags: ["deep-learning", "neural-networks", "tensorflow", "pytorch"],
        target_audience: "Intermediate to advanced developers",
        cover_image_serving_url: "",
        url_slug: "deep-learning-mastery",
        read_time: 16,
        learner_tags: ["intermediate", "advanced"],
        level_one_learner_tags: ["machine-learning", "mathematics"],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-20"),
    },
    {
        _id: "3",
        title: "MLOPS PROFESSIONAL",
        summary:
            "Learn to deploy, monitor, and maintain machine learning systems in production. Master CI/CD for ML, model versioning, A/B testing, and scalable infrastructure.",
        brief_summary:
            "Professional MLOps course covering deployment, monitoring, and maintenance of ML systems.",
        details:
            "This professional course covers the essential practices for deploying and maintaining machine learning systems in production. Learn about model versioning, CI/CD pipelines, monitoring, and scaling ML infrastructure.",
        clos: [
            "Deploy ML models to production",
            "Implement CI/CD for ML pipelines",
            "Monitor model performance",
            "Manage model versioning",
            "Scale ML infrastructure",
        ],
        toc: {
            categories: [
                {
                    id: "1",
                    title: "MLOps Fundamentals",
                    summary: "Core MLOps concepts",
                    pages: [
                        {
                            id: 1,
                            title: "What is MLOps?",
                            author_id: 1,
                            collection_id: 3,
                            page_id: 1,
                            slug: "what-is-mlops",
                        },
                        {
                            id: 2,
                            title: "ML Lifecycle",
                            author_id: 1,
                            collection_id: 3,
                            page_id: 2,
                            slug: "ml-lifecycle",
                        },
                    ],
                },
            ],
        },
        tags: ["mlops", "deployment", "kubernetes", "docker"],
        target_audience: "ML Engineers and DevOps professionals",
        cover_image_serving_url: "",
        url_slug: "mlops-professional",
        read_time: 14,
        learner_tags: ["intermediate", "advanced"],
        level_one_learner_tags: ["machine-learning", "devops"],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-25"),
    },
    {
        _id: "4",
        title: "DATAOPS ENGINEERING",
        summary:
            "Build robust data pipelines and orchestration systems. Learn modern data engineering practices, ETL workflows, data quality, and real-time processing at scale.",
        brief_summary:
            "Data engineering course covering pipelines, ETL workflows, and real-time processing.",
        details:
            "This comprehensive course covers modern data engineering practices including building robust data pipelines, ETL workflows, data quality management, and real-time data processing at scale.",
        clos: [
            "Design and build data pipelines",
            "Implement ETL workflows",
            "Ensure data quality",
            "Process real-time data streams",
            "Scale data infrastructure",
        ],
        toc: {
            categories: [
                {
                    id: "1",
                    title: "Data Pipeline Design",
                    summary: "Fundamentals of data pipelines",
                    pages: [
                        {
                            id: 1,
                            title: "Pipeline Architecture",
                            author_id: 1,
                            collection_id: 4,
                            page_id: 1,
                            slug: "pipeline-architecture",
                        },
                        {
                            id: 2,
                            title: "ETL vs ELT",
                            author_id: 1,
                            collection_id: 4,
                            page_id: 2,
                            slug: "etl-vs-elt",
                        },
                    ],
                },
            ],
        },
        tags: ["data-engineering", "etl", "apache-spark", "kafka"],
        target_audience: "Data Engineers and Analysts",
        cover_image_serving_url: "",
        url_slug: "dataops-engineering",
        read_time: 12,
        learner_tags: ["intermediate", "advanced"],
        level_one_learner_tags: ["programming", "databases"],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-30"),
    },
    {
        _id: "5",
        title: "COMPUTER VISION PRO",
        summary:
            "Specialize in computer vision and image processing. From object detection to image segmentation, learn cutting-edge techniques used in autonomous vehicles and healthcare.",
        brief_summary:
            "Advanced computer vision course covering object detection and image segmentation.",
        details:
            "This specialized course covers advanced computer vision techniques including object detection, image segmentation, and modern deep learning approaches used in autonomous vehicles, healthcare, and other industries.",
        clos: [
            "Implement object detection models",
            "Build image segmentation systems",
            "Apply computer vision in real-world scenarios",
            "Work with medical imaging data",
            "Deploy computer vision models",
        ],
        toc: {
            categories: [
                {
                    id: "1",
                    title: "Computer Vision Basics",
                    summary: "Fundamental CV concepts",
                    pages: [
                        {
                            id: 1,
                            title: "Image Processing",
                            author_id: 1,
                            collection_id: 5,
                            page_id: 1,
                            slug: "image-processing",
                        },
                        {
                            id: 2,
                            title: "Feature Detection",
                            author_id: 1,
                            collection_id: 5,
                            page_id: 2,
                            slug: "feature-detection",
                        },
                    ],
                },
            ],
        },
        tags: ["computer-vision", "opencv", "yolo", "medical-imaging"],
        target_audience: "Computer Vision Engineers",
        cover_image_serving_url: "",
        url_slug: "computer-vision-pro",
        read_time: 10,
        learner_tags: ["intermediate", "advanced"],
        level_one_learner_tags: ["deep-learning", "mathematics"],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-02-01"),
    },
    {
        _id: "6",
        title: "NLP SPECIALIST",
        summary:
            "Master natural language processing and large language models. Build chatbots, sentiment analyzers, and text generation systems using transformers and LLMs.",
        brief_summary:
            "NLP course covering transformers, LLMs, and text processing applications.",
        details:
            "This comprehensive NLP course covers natural language processing techniques, transformer architectures, large language models, and practical applications like chatbots, sentiment analysis, and text generation.",
        clos: [
            "Implement NLP models",
            "Work with transformer architectures",
            "Build chatbots and text generators",
            "Perform sentiment analysis",
            "Deploy NLP applications",
        ],
        toc: {
            categories: [
                {
                    id: "1",
                    title: "NLP Fundamentals",
                    summary: "Basic NLP concepts",
                    pages: [
                        {
                            id: 1,
                            title: "Text Preprocessing",
                            author_id: 1,
                            collection_id: 6,
                            page_id: 1,
                            slug: "text-preprocessing",
                        },
                        {
                            id: 2,
                            title: "Word Embeddings",
                            author_id: 1,
                            collection_id: 6,
                            page_id: 2,
                            slug: "word-embeddings",
                        },
                    ],
                },
            ],
        },
        tags: ["nlp", "transformers", "hugging-face", "llm"],
        target_audience: "NLP Engineers and Researchers",
        cover_image_serving_url: "",
        url_slug: "nlp-specialist",
        read_time: 10,
        learner_tags: ["intermediate", "advanced"],
        level_one_learner_tags: ["deep-learning", "linguistics"],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-02-05"),
    },
];

export function getCourseById(id: string): ICourse | undefined {
    return courses.find((c) => c._id === id);
}

export function getRelatedCourses(
    courseId: string,
    tags: string[],
    limit = 3
): ICourse[] {
    const similarCourses = courses.filter(
        (c) => c._id !== courseId && c.tags.some((tag) => tags.includes(tag))
    );

    if (similarCourses.length >= limit) {
        return similarCourses.slice(0, limit);
    }

    const learnerTagCourses = courses.filter(
        (c) =>
            c._id !== courseId &&
            !similarCourses.includes(c) &&
            c.learner_tags.some((tag) => tags.includes(tag))
    );

    const combined = [...similarCourses, ...learnerTagCourses];
    return combined.slice(0, limit);
}

export function getCourseCategory(tags: string[]): string {
    const categoryMap: { [key: string]: string } = {
        "machine-learning": "Machine Learning",
        "deep-learning": "Deep Learning",
        mlops: "MLOps",
        "data-engineering": "DataOps",
        "computer-vision": "Computer Vision",
        nlp: "NLP",
    };

    for (const tag of tags) {
        if (categoryMap[tag]) {
            return categoryMap[tag];
        }
    }
    return "AI & Data Science";
}

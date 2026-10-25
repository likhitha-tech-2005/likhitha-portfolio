export type ProjectStatus = "Completed" | "In Progress" | "Concept";

export type ProjectMeta = {
  slug: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  summary: string;
  tech: string[];
  github: string | null;
  demo: string | null;
  impact: string[];
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const skills = {
  programming: ["Python", "SQL", "Java", "Go (basic)", "JavaScript"],
  computerScience: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
  ],
  dataEngineering: [
    "ETL / ELT pipelines",
    "Data products",
    "Data modeling",
    "Snowflake",
    "dbt",
    "Airflow / Astronomer",
    "Fivetran-style connectors",
    "Data warehouse design",
  ],
  aiAndMl: [
    "LLMs",
    "Generative AI",
    "RAG",
    "Prompt engineering",
    "Gemini",
    "Claude",
    "LangChain",
    "Embeddings",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "MLflow",
  ],
  backend: [
    "Flask",
    "REST APIs",
    "Authentication",
    "Input validation",
    "Error handling",
    "Docker",
    "CI / CD",
    "GitHub Actions",
  ],
  governance: [
    "Metadata",
    "Data catalog",
    "Data classification tagging",
    "Data masking",
    "Role-based access control",
    "Data quality",
    "SLOs",
    "Compliance",
  ],
} as const;

export const projects: ProjectMeta[] = [
  {
    slug: "smartdata-assist",
    title: "SmartData Assist",
    subtitle: "LLM-Powered Data Product Assistant",
    status: "Completed",
    summary:
      "A generative AI application that answers business questions over data products using grounded retrieval, SQL generation, and LLM-powered interpretation.",
    tech: ["Python", "Gemini API", "Claude API", "LangChain", "FAISS", "Flask", "PostgreSQL", "Docker"],
    github: null,
    demo: null,
    impact: [
      "Built a metadata-driven RAG flow grounded in data product descriptions, schema, and ownership metadata.",
      "Generated SQL from natural language with guardrails and PII masking before results reached the LLM.",
      "Containerized the app and shipped it with GitHub Actions and pytest-based validation checks.",
    ],
  },
  {
    slug: "datapulse",
    title: "DataPulse",
    subtitle: "ELT Data Pipeline and Data Products",
    status: "Completed",
    summary:
      "A modern data engineering project implementing ETL/ELT orchestration, warehouse modeling, and data governance guardrails for reliable data products.",
    tech: ["Python", "SQL", "Airflow", "dbt", "Snowflake", "Fivetran-style connectors", "Great Expectations"],
    github: null,
    demo: null,
    impact: [
      "Migrated a script-based ingestion flow into an Airflow-driven pipeline loading into Snowflake.",
      "Separated source-aligned and aggregate data products using dbt staging, intermediate, and mart layers.",
      "Added quality checks, freshness SLOs, catalog documentation, classification tags, and RBAC with column masking.",
    ],
  },
  {
    slug: "insightml",
    title: "InsightML",
    subtitle: "Predictive Analytics with MLOps",
    status: "Completed",
    summary:
      "An applied machine learning solution covering feature pipelines, model comparison, MLflow tracking, deployment, and dashboarding for business-ready insights.",
    tech: ["Python", "Pandas", "Scikit-learn", "MLflow", "Flask", "Docker", "GitHub Actions"],
    github: null,
    demo: null,
    impact: [
      "Built a feature pipeline and compared classification models with precision, recall, and F1-score.",
      "Tracked experiments, metrics, and model versions in MLflow, then registered the best-performing model.",
      "Exposed predictions via a Flask API and explained results through a dashboard for non-technical users.",
    ],
  },
];

export const projectDetails = {
  "smartdata-assist": {
    title: "SmartData Assist — LLM-Powered Data Product Assistant",
    overview:
      "SmartData Assist is a generative AI application designed to answer business questions over data products using retrieval-augmented generation (RAG), metadata grounding, and SQL generation with guardrails.",
    problem:
      "Business users often need fast, trustworthy answers over data products, but raw metadata and schema knowledge are not easy to navigate without a query layer that blends context, governance, and controlled data access.",
    goals: [
      "Create grounded answers from metadata-rich data product descriptions and schemas.",
      "Translate natural language questions into safe read-only SQL.",
      "Mask sensitive columns and validate schemas before exposing results to the model.",
      "Ship an application that supports iterative evaluation and CI/CD quality checks.",
    ],
    features: [
      "LLM-powered data exploration with grounded retrieval",
      "Metadata-driven FAISS index for product context and ownership tags",
      "SQL generation with read-only guardrails and schema validation",
      "PII masking before model input and response handling",
      "Dockerized deployment with GitHub Actions and pytest checks",
    ],
    stack: ["Python", "Gemini API", "Claude API", "LangChain", "FAISS", "Flask", "PostgreSQL", "Docker"],
    architecture: [
      "Business queries are converted into semantic retrieval requests against product metadata and schemas.",
      "The assistant validates the target data and safely generates read-only SQL with governance constraints.",
      "LLM responses are grounded in retrieved context and optional result snippets before being returned to users.",
    ],
    testing: [
      "Automated pytest checks cover critical app behavior and retrieval flow stability.",
      "Prompt evaluation and guardrail checks reduce unsupported or unsafe model responses.",
    ],
    lessons: [
      "Strong grounding beats model creativity when business trust matters.",
      "Governance and security controls are part of product experience, not afterthoughts.",
    ],
  },
  datapulse: {
    title: "DataPulse — ELT Data Pipeline and Data Products",
    overview:
      "DataPulse is a data engineering project focused on orchestrating ETL/ELT workflows, standardizing data products, and applying governance controls for reliable warehouse consumption.",
    problem:
      "Many data pipelines break down when ingestion, transformation, and governance evolve independently. The solution must unify these concerns around modular layers and clear ownership semantics.",
    goals: [
      "Replace script-based ingestion with a monitored orchestration flow.",
      "Model source-aligned and aggregate data products with dbt layering.",
      "Improve data quality, freshness, and governance with testing and classification metadata.",
    ],
    features: [
      "Airflow orchestration for ingestion and transformation workflows",
      "dbt staging, intermediate, and mart layers",
      "Fivetran-style connectors and custom Python adapters for REST and CSV sources",
      "Great Expectations-style data quality checks and freshness SLOs",
      "Data catalog documentation, RBAC, and masked columns for compliance",
    ],
    stack: ["Python", "SQL", "Airflow", "dbt", "Snowflake", "Fivetran-style connectors", "Great Expectations"],
    architecture: [
      "Source data is ingested into a staging layer before canonical transformations.",
      "dbt transforms structured data into product-ready marts with common keys and standardized identifiers.",
      "Governance metadata and masking policies protect sensitive values while keeping the data product usable.",
    ],
    testing: [
      "Quality checks validate freshness, completeness, and transformation assumptions.",
      "Catalog tags and policies ensure data reliability, ownership clarity, and compliance alignment.",
    ],
    lessons: [
      "Good data products need both technical quality and operational governance.",
      "Modular transformation layers reduce downstream surprises across business teams.",
    ],
  },
  insightml: {
    title: "InsightML — Predictive Analytics with MLOps",
    overview:
      "InsightML is a predictive analytics project that covers data preparation, model evaluation, experiment tracking, REST deployment, and communicating results clearly to decision-makers.",
    problem:
      "Analytics work is strongest when it is measurable, reusable, and explainable. This project focuses on building a reproducible ML workflow that goes beyond a notebook and becomes a deployable, monitored service.",
    goals: [
      "Prepare and evaluate a real classification workflow.",
      "Track experiments and model variants with MLflow.",
      "Serve predictions through a REST API and maintain deployment discipline.",
      "Explain results to non-technical stakeholders clearly.",
    ],
    features: [
      "Feature pipeline and data preprocessing",
      "Model comparison with precision, recall, and F1-score",
      "MLflow experiment tracking and model registry",
      "Flask API for predictions with validation",
      "Dashboard explaining model output and feature importance",
    ],
    stack: ["Python", "Pandas", "Scikit-learn", "MLflow", "Flask", "Docker", "GitHub Actions"],
    architecture: [
      "The project moves from raw feature preparation through training and evaluation into a registered model workflow.",
      "The best-performing model is served through a lightweight API and paired with business-facing explainability.",
    ],
    testing: [
      "Evaluation results are compared against relevant metrics rather than single-score optimism.",
      "Deployment checks and automated testing align the project with MLOps principles.",
    ],
    lessons: [
      "Practical ML depends as much on process as on algorithms.",
      "Clear explanation is part of model trustworthiness.",
    ],
  },
} as const;

export const profile = {
  name: "Likhitha Bandaru",
  title: "Software Engineer | Data & AI | Python | SQL | LLMs",
  location: "Bangalore / Tirupati, India",
  email: "likhithabandaru2005@gmail.com",
  phone: "+91 8341950658",
  linkedIn: "https://linkedin.com/in/likhitha-bandaru-33a160421",
  github: "https://github.com/likhitha-tech-2005",
  summary:
    "Software Engineer (B.Tech IT, 2026) and AWS Certified Cloud Practitioner with strong software, data, and AI/ML engineering skills. Builds data products and intelligent applications using Python, advanced SQL, ETL/ELT pipelines, and large language models such as Gemini and Claude.",
};

export const education = [
  {
    title: "B.Tech — Information Technology",
    institution: "Sri Venkateswara College of Engineering (SVCE), Tirupati",
    period: "2022–2026",
    gpa: "CGPA: 8.7/10",
  },
  {
    title: "Intermediate — MPC",
    institution: "Narayana Junior College",
    period: "2020–2022",
    gpa: "CGPA: 8.5/10",
  },
] as const;

export const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Oct 2025",
  },
  {
    name: "Tech Mahindra Nandi Certification",
    issuer: "Tech Mahindra",
    date: "Verified credential",
  },
] as const;

export const contactLinks = {
  email: "mailto:likhithabandaru2005@gmail.com",
  linkedin: "https://linkedin.com/in/likhitha-bandaru-33a160421",
  github: "https://github.com/likhitha-tech-2005",
  phone: "tel:+918341950658",
};

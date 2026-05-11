import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProjectDetailModal, { type FeaturedProject } from "@/components/ProjectDetailModal";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
}

const featuredProjects: FeaturedProject[] = [
  {
    title: "Ai-Career Platform",
    description:  "AI-powered career guidance platform that helps users explore career paths, skill requirements, and learning recommendations using intelligent APIs and personalized recommendations.",
    tech: ["React.js", "Node.js", "MongoDB", "API"],
    github: "https://github.com/aniket2804m/Ai-Career",
    highlights: [
       "Built responsive frontend using React and Tailwind CSS",
  "Implemented authentication and protected routes",
  "Integrated AI APIs for career recommendations",
  "Designed REST APIs for user and career data management",
  "Optimized database queries for faster response time",
    ],
    architecture: "Frontend built with React.js and Tailwind CSS for a responsive user experience. Node.js and Express.js handle REST API requests and business logic, while MongoDB stores user profiles, career data, and recommendations. AI-powered APIs are integrated to generate personalized career suggestions and learning guidance. Modular backend structure improves maintainability and scalability.",
    role:  "AI-powered career guidance platform that helps users explore career paths, skill requirements, and learning recommendations using intelligent APIs and personalized recommendations.",
    impact:  "Simplified career exploration by providing personalized AI-driven recommendations, helping users discover suitable career paths, required skills, and learning resources through an interactive and responsive platform.",
  },
  
  {
    title: "Doctor Appointment Management System",
    description:  "Full-stack healthcare appointment platform that enables patients to book appointments, manage schedules, and connect with doctors through a secure and responsive web application.",
    tech: ["React.js", "Node.js", "MongoDB", "API"],
    github: "https://github.com/aniket2804m/Doctor-APP",
    highlights: [
      "Built secure authentication and authorization system for doctors and patients",
  "Implemented appointment booking and scheduling workflows",
  "Designed responsive dashboard UI using React.js and Tailwind CSS",
  "Created modular REST APIs with Node.js and Express.js",
  "Optimized MongoDB queries for efficient appointment and user data handling",
    ],
    architecture:  "Built using a MERN-stack architecture with React.js frontend and Node.js/Express backend. MongoDB manages doctor, patient, and appointment data, while REST APIs handle authentication, scheduling, and user management workflows. Implemented modular backend routing, protected authentication flows, and responsive UI components for smooth healthcare appointment management.",
    role:  "Full-stack developer — designed the frontend UI, developed REST APIs, managed MongoDB schemas, implemented authentication and appointment workflows, and integrated responsive dashboard functionality.",
    impact:  "Streamlined the doctor appointment booking process through a centralized platform that simplifies scheduling, patient management, and doctor availability tracking with an intuitive user experience.",
  },


  {
    title: "StayEase - Vacation Rental Platform",
    description:  "MERN-stack Airbnb-inspired rental platform featuring property listings, booking management, authentication, image uploads, and responsive user dashboards for seamless travel accommodation experiences.",
    tech: ["React.js", "Node.js", "MongoDB", "API"],
    github: "https://github.com/aniket2804m/Major-Project---Copy",
    highlights: [
      "Built responsive UI with React.js and Tailwind CSS",
      "Developed REST APIs with Node.js and Express.js",
      "Implemented secure authentication and authorization system",
      "Created modular backend architecture for scalable development",
      "Optimized database queries for efficient property and booking data handling",
    ],
    architecture:  "Built using a MERN-stack architecture with React.js frontend and Node.js/Express backend. MongoDB manages property, booking, and user data, while REST APIs handle authentication, booking management, and user management workflows. Implemented modular backend routing, protected authentication flows, and responsive UI components for seamless vacation rental experiences.",
    role:  "Full-stack developer — designed the frontend UI, developed REST APIs, managed MongoDB schemas, implemented booking workflows, and integrated responsive dashboard functionality.",
    impact:  "Provided a user-friendly platform for users to discover, book, and manage vacation rentals with an intuitive interface and streamlined booking process.",
  },
      
  {
    title: "Credit Risk Analytics & Prediction",
    description: "Advanced credit risk prediction using stacked ensemble methods (LightGBM, XGBoost, CatBoost) achieving 94% accuracy on 20,000 records with SMOTE-based class balancing.",
    tech: ["LightGBM", "XGBoost", "CatBoost", "SMOTE", "Python"],
    github: "https://github.com/aniket2804m/Credit-Risk-Analytics",
    highlights: [
      "94% prediction accuracy with stacked ensemble outperforming single models by 8%",
      "Trained and evaluated on 20,000 financial records with 50+ engineered features",
      "SMOTE oversampling improved precision-recall AUC by 15% on minority class",
      "Reduced computation time by 20% through feature selection and pipeline optimization",
    ],
    architecture: "Feature engineering pipeline (50+ features from raw financial data) → SMOTE oversampling for class imbalance → Individual model training (LightGBM, XGBoost, CatBoost) → Stacking ensemble with logistic regression meta-learner.",
    role: "Data scientist — feature engineering, model selection and stacking, SMOTE integration, hyperparameter tuning, and pipeline optimization for 20% computation reduction.",
    impact: "Delivers transparent, high-accuracy credit scoring that outperforms single models by 8%, enabling faster and more reliable loan default risk assessment.",
  },
];

const fetchRepos = async (): Promise<Repo[]> => {
  const res = await fetch("https://api.github.com/users/aniket2804m/repos?sort=updated&per_page=100");
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
};

const FeaturedCard = ({ project, index, onClick }: { project: FeaturedProject; index: number; onClick: () => void }) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="glass rounded-xl p-6 gradient-border group hover:bg-card/60 transition-all duration-300 relative overflow-hidden cursor-pointer active:scale-[0.98]"
    >
      <div className="absolute top-3 right-3">
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <Sparkles className="w-3 h-3" /> Featured
        </span>
      </div>
      <h3 className="text-lg font-bold font-display text-foreground group-hover:text-primary transition-colors mb-3 pr-20">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
          <Button size="sm" variant="outline" className="gap-2 text-xs">
            <Github className="w-3.5 h-3.5" /> View Code
          </Button>
        </a>
        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Click for details →</span>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ repo, index }: { repo: Repo; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass rounded-xl p-5 gradient-border group hover:bg-card/60 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-bold font-display text-foreground group-hover:text-primary transition-colors">
          {repo.name.replace(/-/g, " ").replace(/_/g, " ")}
        </h3>
        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1"><Star className="w-3 h-3" />{repo.stargazers_count}</span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{repo.forks_count}</span>
          )}
        </div>
      </div>
      <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
        {repo.description || "An AI/ML & Full-Stack Development project by Aniket Suryawanshi."}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {repo.language && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
            {repo.language}
          </span>
        )}
        {repo.topics?.slice(0, 2).map((t) => (
          <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          <Button size="sm" variant="outline" className="gap-1.5 text-[10px] h-7 px-2.5">
            <Github className="w-3 h-3" /> Code
          </Button>
        </a>
        {repo.homepage && (
          <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="gap-1.5 text-[10px] h-7 px-2.5 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
              <ExternalLink className="w-3 h-3" /> Demo
            </Button>
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { ref, isVisible } = useScrollReveal();
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const { data: repos, isLoading } = useQuery({
    queryKey: ["github-repos"],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 10,
  });

  const displayRepos = showAll ? repos : repos?.slice(0, 12);

  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {featuredProjects.map((project, i) => (
            <FeaturedCard key={i} project={project} index={i} onClick={() => setSelectedProject(project)} />
          ))}
        </div>

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          open={!!selectedProject}
          onOpenChange={(open) => !open && setSelectedProject(null)}
        />

        {/* All GitHub Repos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-8"
        >
          <h3 className="text-xl font-bold font-display text-foreground">
            All <span className="gradient-text">28+ Repositories</span>
          </h3>
        </motion.div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass rounded-xl p-5 animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-3" />
                <div className="h-3 bg-muted rounded w-full mb-2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayRepos?.map((repo, i) => (
                <ProjectCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
            {repos && repos.length > 12 && !showAll && (
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  onClick={() => setShowAll(true)}
                  className="font-display gap-2"
                >
                  Show All {repos.length} Repositories
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;

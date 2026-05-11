import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Github, Star, GitFork, BookOpen, Activity } from "lucide-react";
import { useEffect, useState } from "react";

interface GHUser {
  public_repos: number;
  followers: number;
  following: number;
}

const fetchUser = async (): Promise<GHUser> => {
  const res = await fetch("https://api.github.com/users/aniket2804m");
  if (!res.ok) throw new Error("Failed");
  return res.json();
};

const fetchRepoStats = async () => {
  const res = await fetch("https://api.github.com/users/aniket2804m/repos?per_page=100");
  if (!res.ok) throw new Error("Failed");
  const repos = await res.json();
  const totalStars = repos.reduce((acc: number, r: any) => acc + r.stargazers_count, 0);
  const totalForks = repos.reduce((acc: number, r: any) => acc + r.forks_count, 0);
  const languages = [...new Set(repos.map((r: any) => r.language).filter(Boolean))];
  return { totalStars, totalForks, languages: languages.length };
};

const AnimatedCounter = ({ value, isVisible }: { value: number; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1500;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, value]);
  return <span>{count}</span>;
};

const GitHubStats = () => {
  const { ref, isVisible } = useScrollReveal();
  const { data: user } = useQuery({ queryKey: ["gh-user"], queryFn: fetchUser, staleTime: 600000 });
  const { data: stats } = useQuery({ queryKey: ["gh-stats"], queryFn: fetchRepoStats, staleTime: 600000 });

  const statCards = [
    { icon: BookOpen, label: "Repositories", value: user?.public_repos ?? 0 },
    { icon: Star, label: "Total Stars", value: stats?.totalStars ?? 0 },
    { icon: GitFork, label: "Total Forks", value: stats?.totalForks ?? 0 },
    { icon: Activity, label: "Languages", value: stats?.languages ?? 0 },
  ];

  return (
    <section id="github" className="py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Open Source</p>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {statCards.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-6 text-center glow-border"
            >
              <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold font-display text-foreground mb-1">
                <AnimatedCounter value={s.value} isVisible={isVisible} />
              </p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass rounded-xl p-6 text-center"
        >
          <img
            src="https://ghchart.rshah.org/6366f1/aniket2804m"
            alt="GitHub Contribution Chart"
            className="mx-auto w-full max-w-3xl opacity-80"
            loading="lazy"
          />
          <a
            href="https://github.com/aniket2804m"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-primary hover:underline font-display text-sm"
          >
            <Github className="w-4 h-4" /> View Full Profile on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;

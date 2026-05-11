import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Sparkles, Zap, Layers, User, TrendingUp } from "lucide-react";

export interface FeaturedProject {
  title: string;
  description: string;
  tech: string[];
  github: string;
  highlights: string[];
  architecture: string;
  role: string;
  impact: string;
}

interface Props {
  project: FeaturedProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectDetailModal = ({ project, open, onOpenChange }: Props) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto glass border-primary/20 p-0 gap-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 pb-4 border-b border-primary/10">
          <div className="flex items-start justify-between mb-2">
            <DialogTitle className="text-xl font-bold font-display text-foreground pr-8">
              {project.title}
            </DialogTitle>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground shrink-0">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          </div>
          <p className="text-muted-foreground text-sm">{project.description}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Key Achievements */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold font-display text-foreground mb-3">
              <Zap className="w-4 h-4 text-primary" /> Key Achievements
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {h}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Architecture */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold font-display text-foreground mb-2">
              <Layers className="w-4 h-4 text-primary" /> Architecture
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.architecture}</p>
          </div>

          {/* Role */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold font-display text-foreground mb-2">
              <User className="w-4 h-4 text-primary" /> My Role
            </h4>
            <p className="text-sm text-muted-foreground">{project.role}</p>
          </div>

          {/* Impact */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold font-display text-foreground mb-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Impact
            </h4>
            <p className="text-sm text-muted-foreground">{project.impact}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-bold font-display text-foreground mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* GitHub Link */}
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2 w-full">
              <Github className="w-4 h-4" /> View Source Code
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;

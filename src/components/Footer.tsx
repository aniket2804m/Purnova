import { Github, Linkedin, Mail, Heart, Phone } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12 px-4">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="font-display font-bold text-xl gradient-text">Aniket Suryawanshi</div>
      <p className="text-sm text-muted-foreground flex items-center gap-1">
        Built with <Heart className="w-3.5 h-3.5 text-destructive" /> using React & TailwindCSS
      </p>
      <div className="flex items-center gap-4">
        <a href="https://github.com/aniket2804m" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://linkedin.com/in/aniket-suryawanshi-74a90a257" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="mailto:suryawanshianiket7576@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
          <Mail className="w-5 h-5" />
        </a>
        <a href="tel:+919307736352" className="text-muted-foreground hover:text-foreground transition-colors">
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
    <div className="text-center mt-8 text-xs text-muted-foreground">
      © {new Date().getFullYear()} Aniket Suryawanshi. All rights reserved.
    </div>
  </footer>
);

export default Footer;

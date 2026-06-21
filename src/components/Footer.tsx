import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

          {/* Company */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Purnova Digital
              </span>
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              Helping businesses grow through SEO, Social Media Marketing,
              Performance Ads, Branding and Website Development.
            </p>

            <div className="flex gap-4 mt-6">

              <a
                href="#"
                className="p-3 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:scale-110 transition"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                className="p-3 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:scale-110 transition"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                className="p-3 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:scale-110 transition"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {[
                "Home",
                "About",
                "Services",
                "Portfolio",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-white transition"
                  >
                    <ArrowUpRight size={14} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-5">
              Our Services
            </h3>

            <ul className="space-y-3 text-muted-foreground">
              <li>SEO Optimization</li>
              <li>Social Media Marketing</li>
              <li>Google Ads</li>
              <li>Meta Ads</li>
              <li>Website Development</li>
              <li>Brand Strategy</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-5">
              Contact Us
            </h3>

            <div className="space-y-4">

              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">
                  info@purnovadigital.com
                </span>
              </div>

              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">
                  +91 98765 43210
                </span>
              </div>

              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">
                  Pune, Maharashtra, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}

        <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center">

          <h3 className="text-3xl font-bold mb-3">
            Ready To Grow Your Business?
          </h3>

          <p className="text-muted-foreground mb-6">
            Let’s create data-driven marketing campaigns that deliver
            real results.
          </p>

          <button
            className="
              px-8 py-4
              rounded-full
              font-semibold
              bg-gradient-to-r
              from-blue-500
              to-purple-600
              hover:scale-105
              transition
            "
          >
            Get Free Consultation
          </button>
        </div>

        {/* Bottom */}

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Purnova Digital. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
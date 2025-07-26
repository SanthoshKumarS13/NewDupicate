import { Link } from "react-router-dom";
import logo from "@/assets/promptcraft-logo.png";

const Footer = () => {
  return (
    <footer className="dark-section border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="PromptCraft" className="h-6 w-6" />
              <span className="font-bold bg-gradient-primary bg-clip-text text-transparent">
                PromptCraft
              </span>
            </div>
            <p className="text-sm text-dark-section-foreground/70 max-w-xs">
              Craft the perfect AI prompt, instantly. Your free suite of advanced prompt generators.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-dark-section-foreground">Tools</h4>
            <div className="space-y-2">
              <Link to="/tools/image" className="block text-sm text-dark-section-foreground/70 hover:text-dark-section-foreground transition-colors">
                Image Generator
              </Link>
              <Link to="/tools/video" className="block text-sm text-dark-section-foreground/70 hover:text-dark-section-foreground transition-colors">
                Video Generator
              </Link>
              <Link to="/tools/music" className="block text-sm text-dark-section-foreground/70 hover:text-dark-section-foreground transition-colors">
                Music Generator
              </Link>
              <Link to="/tools/app-builder" className="block text-sm text-dark-section-foreground/70 hover:text-dark-section-foreground transition-colors">
                App Builder
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-dark-section-foreground">Resources</h4>
            <div className="space-y-2">
              <Link to="/guides" className="block text-sm text-dark-section-foreground/70 hover:text-dark-section-foreground transition-colors">
                Guides
              </Link>
              <Link to="/examples" className="block text-sm text-dark-section-foreground/70 hover:text-dark-section-foreground transition-colors">
                Examples
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-dark-section-foreground">Company</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-dark-section-foreground/70 hover:text-dark-section-foreground transition-colors">
                About
              </Link>
              <Link to="/pricing" className="block text-sm text-dark-section-foreground/70 hover:text-dark-section-foreground transition-colors">
                Pricing
              </Link>
              <Link to="/contact" className="block text-sm text-dark-section-foreground/70 hover:text-dark-section-foreground transition-colors">
                Contact
              </Link>
              <Link to="/privacy" className="block text-sm text-dark-section-foreground/70 hover:text-dark-section-foreground transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-section-foreground/20 mt-8 pt-8 text-center text-sm text-dark-section-foreground/70">
          <p>&copy; 2024 PromptCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
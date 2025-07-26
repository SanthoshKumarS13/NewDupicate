import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { UserMenu } from "@/components/auth/UserMenu";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/promptcraft-logo.png";

const Navigation = () => {
  const { user, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const openSignIn = () => {
    setAuthMode('signin');
    setAuthModalOpen(true);
  };

  const openSignUp = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="PromptCraft" className="h-8 w-8" />
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            PromptCraft
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/tools/image" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Image
          </Link>
          <Link to="/tools/video" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Video
          </Link>
          <Link to="/tools/music" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Music
          </Link>
          <Link to="/tools/app-builder" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Apps
          </Link>
          <Link to="/guides" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Guides
          </Link>
          <Link to="/examples" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Examples
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          {loading ? (
            <div className="h-8 w-16 bg-muted animate-pulse rounded" />
          ) : user ? (
            <UserMenu />
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={openSignIn}>
                Sign In
              </Button>
              <Button size="sm" className="bg-gradient-primary hover:shadow-glow transition-all duration-300" onClick={openSignUp}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
      </nav>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Navigation;
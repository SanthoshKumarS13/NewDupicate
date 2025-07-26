import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Image, Video, Music, Smartphone, ArrowRight, Sparkles, Zap, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HomePage = () => {
  const tools = [
    {
      title: "AI Image Generator",
      description: "Create stunning visuals with Midjourney, DALL-E 3, and Stable Diffusion prompts.",
      icon: Image,
      href: "/tools/image",
      color: "text-purple-500",
      limit: "10 prompts/day"
    },
    {
      title: "AI Video Generator", 
      description: "Craft cinematic videos with Sora, Veo, and Runway Gen-3 prompts.",
      icon: Video,
      href: "/tools/video",
      color: "text-blue-500",
      limit: "4 prompts/day"
    },
    {
      title: "AI Music Generator",
      description: "Compose perfect tracks with Suno, Udio, and Stable Audio prompts.",
      icon: Music,
      href: "/tools/music", 
      color: "text-green-500",
      limit: "5 prompts/day"
    },
    {
      title: "AI App Builder",
      description: "Build amazing apps with Replit AI, Bolt, and Lovable prompts.",
      icon: Smartphone,
      href: "/tools/app-builder",
      color: "text-orange-500",
      limit: "3 prompts/day"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Select Your Tool",
      description: "Choose from our four specialized prompt generators based on what you want to create."
    },
    {
      number: "02", 
      title: "Refine Your Vision",
      description: "Use our intuitive controls to fine-tune every aspect of your creative vision."
    },
    {
      number: "03",
      title: "Generate & Create",
      description: "Get your perfectly crafted prompt and watch AI bring your ideas to life."
    }
  ];

  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools-section');
    toolsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur border rounded-full px-4 py-2 mb-6 animate-slide-up">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Free AI Prompt Suite</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-slide-up">
              Craft the Perfect AI Prompt, Instantly
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up">
              Your free suite of advanced prompt generators for AI image, video, music, and apps.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button 
                size="lg" 
                variant="hero" 
                className="text-lg px-8 py-4"
                onClick={scrollToTools}
              >
                Start Crafting for Free
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Link to="/examples">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  View Examples
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools-section" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Four Powerful Generators
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Each tool is specifically designed for its AI platform, with optimized controls and expert-level prompting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Card key={tool.title} className="group hover:shadow-elegant transition-all duration-500 border bg-card backdrop-blur animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-muted border ${tool.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold">{tool.title}</h3>
                          <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                            {tool.limit}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-4">{tool.description}</p>
                        <Link to={tool.href}>
                          <Button variant="ghost" className="group-hover:text-accent transition-colors p-0 h-auto">
                            Try it now
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get professional-quality prompts in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center group animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-accent opacity-30"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Why Choose PromptCraft?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {[
                "Expert-level prompts without the learning curve",
                "Optimized for the latest AI models and platforms", 
                "Daily limits ensure fair access for everyone",
                "Completely free to use with no hidden costs",
                "Intuitive controls designed for creators",
                "Regular updates with new features and models"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Button size="lg" variant="hero" className="text-lg px-8 py-4" onClick={scrollToTools}>
                <Zap className="h-5 w-5" />
                Start Crafting Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const guides = [
  {
    title: "A Beginner's Guide to Writing Your First AI Image Prompt",
    excerpt: "Learn the core formula for writing effective AI image prompts to get stunning results.",
    slug: "beginner-ai-image-prompt",
  },
  {
    title: "5 Easy Tricks to Get Cinematic Shots from AI Video Generators",
    excerpt: "Discover five specific, actionable tips to create professional-looking videos with AI.",
    slug: "cinematic-ai-video-tricks",
  },
  {
    title: "How to Create Your First AI Song with Suno: A Step-by-Step Guide",
    excerpt: "A simple walkthrough to get started with AI music generation using structured prompts.",
    slug: "first-ai-song-suno-guide",
  },
  {
    title: "What is an AI App Builder? A Simple Explanation",
    excerpt: "Understand how AI app builders work and learn to create better prompts.",
    slug: "what-is-ai-app-builder",
  },
  {
    title: "The Top 5 Free AI Image Generators You Should Try in 2025",
    excerpt: "A review of the best free AI image generation tools available today.",
    slug: "top-5-free-ai-image-generators-2025",
  }
];

const GuidesPage = () => {
  const guidesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "PromptCraft Guides & Blog",
    "description": "Your ultimate resource for mastering generative AI. Find expert guides, tutorials, and tips for writing better prompts.",
    "url": "https://promptcraft.ai/guides"
  };

  return (
    <>
      <Helmet>
        <title>PromptCraft Guides & Blog | Master AI Prompt Engineering</title>
        <meta name="description" content="Your ultimate resource for mastering generative AI. Find expert guides, tutorials, and tips for writing better prompts for Midjourney, Sora, Suno, and more." />
        <script type="application/ld+json">{JSON.stringify(guidesSchema)}</script>
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-background">
        <Navigation />
        
        <main className="flex-1 container py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              PromptCraft Guides: Master the Art of AI Creation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your ultimate resource for mastering generative AI. Find expert guides, tutorials, and tips for writing better prompts for Midjourney, Sora, Suno, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((post) => (
              <Card key={post.slug} className="group transition-all duration-300 border bg-card hover:border-primary flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl font-heading group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Link to={`/guides/${post.slug}`}>
                    <Button variant="ghost" className="group-hover:text-primary transition-colors p-0 h-auto">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default GuidesPage;
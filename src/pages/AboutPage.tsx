import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About PromptCraft | Our Mission to Simplify Creative AI</title>
        <meta name="description" content="Learn about PromptCraft's mission to make advanced AI prompting accessible to everyone. Discover why we built our free suite of prompt engineering tools." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-background">
        <Navigation />
        
        <main className="flex-1 container py-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-heading font-bold">
                We Believe Great Tools Should Be for Everyone
              </h1>
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
                <p>
                  The world of generative AI is moving at lightning speed. Every day, new tools emerge that can create stunning images, cinematic videos, and original music. But turning a creative idea into a masterpiece often requires learning a complex new language of technical commands, parameters, and keywords.
                </p>
                <p>
                  We started PromptCraft to solve this problem.
                </p>
                <p>
                  Our mission is simple: to build powerful, intuitive, and free tools that bridge the gap between your vision and the AI's understanding. We handle the complexity so you can focus on what you do best—creating. Whether you're a professional artist, a curious hobbyist, or a developer building the next great app, PromptCraft is your creative co-pilot. Welcome aboard.
                </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <>
      <head>
        <title>About PromptCraft | Our Mission to Simplify Creative AI</title>
        <meta name="description" content="Learn about PromptCraft's mission to make advanced AI prompting accessible to everyone. Discover why we built our free suite of prompt engineering tools." />
      </head>
      
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                We Believe Great Tools Should Be for Everyone
              </h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-card rounded-lg p-8 md:p-12 shadow-sm border">
                <p className="text-lg leading-relaxed mb-6">
                  The world of generative AI is moving at lightning speed. Every day, new tools emerge that can create stunning images, cinematic videos, and original music. But turning a creative idea into a masterpiece often requires learning a complex new language of technical commands, parameters, and keywords.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  <strong className="text-primary">We started PromptCraft to solve this problem.</strong>
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Our mission is simple: to build powerful, intuitive, and free tools that bridge the gap between your vision and the AI's understanding. We handle the complexity so you can focus on what you do best—creating.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Whether you're a professional artist, a curious hobbyist, or a developer building the next great app, PromptCraft is your creative co-pilot. <strong className="text-primary">Welcome aboard.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
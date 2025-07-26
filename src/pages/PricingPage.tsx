import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PricingPage = () => {
  const limits = [
    {
      tool: "Image Prompt Generator",
      limit: "10 prompts per day",
      icon: "🎨"
    },
    {
      tool: "Video Prompt Generator", 
      limit: "4 prompts per day",
      icon: "🎬"
    },
    {
      tool: "Music Prompt Generator",
      limit: "5 prompts per day", 
      icon: "🎵"
    },
    {
      tool: "App Builder Prompt",
      limit: "3 prompts per day",
      icon: "📱"
    }
  ];

  return (
    <>
      <head>
        <title>Pricing | Free to Use | PromptCraft</title>
        <meta name="description" content="PromptCraft is free to use. Learn about our generous daily limits for our suite of AI prompt generators for image, video, music, and app building." />
      </head>
      
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent, and Free
            </h1>
            
            <div className="bg-card rounded-lg p-8 md:p-12 mb-12 shadow-sm border">
              <p className="text-lg leading-relaxed mb-8">
                PromptCraft is committed to making powerful creative tools accessible to everyone. Our entire suite of prompt builders is free to use, every day. To ensure fair access for everyone, we have generous daily limits on our generators.
              </p>
              
              <h2 className="text-2xl font-bold mb-8 text-primary">Your Daily Free Limits:</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {limits.map((item, index) => (
                  <Card key={index} className="bg-muted/30 border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{item.icon}</div>
                        <div className="text-left">
                          <h3 className="font-semibold text-lg">{item.tool}</h3>
                          <p className="text-primary font-medium">{item.limit}</p>
                        </div>
                        <CheckCircle className="w-6 h-6 text-primary ml-auto" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <p className="text-lg leading-relaxed mb-8">
                Simply create a free account to start crafting. Your limits reset every 24 hours.
              </p>
              
              <Button size="lg" variant="hero" className="text-lg px-8 py-4">
                Create Free Account
              </Button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default PricingPage;
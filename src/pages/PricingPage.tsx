import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { AuthModal } from '@/components/auth/AuthModal';

const PricingPage = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const openSignUpModal = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Pricing | Free to Use | PromptCraft</title>
        <meta name="description" content="PromptCraft is free to use. Learn about our generous daily limits for our suite of AI prompt generators for image, video, music, and app building." />
      </Helmet>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
      
      <div className="flex flex-col min-h-screen bg-background">
        <Navigation />
        
        <main className="flex-1 container py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Simple, Transparent, and Free
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none mx-auto text-muted-foreground">
              <p>
                PromptCraft is committed to making powerful creative tools accessible to everyone. Our entire suite of prompt builders is free to use, every day. To ensure fair access for everyone, we have generous daily limits on our generators.
              </p>
              
              <h3 className="text-2xl font-heading font-bold text-foreground mt-12 mb-4">Your Daily Free Limits:</h3>
              
              <ul className="list-disc list-inside text-left max-w-md mx-auto mb-8">
                <li>Image Prompt Generator: <span className="font-bold text-primary">10 prompts per day</span></li>
                <li>Video Prompt Generator: <span className="font-bold text-primary">4 prompts per day</span></li>
                <li>Music Prompt Generator: <span className="font-bold text-primary">5 prompts per day</span></li>
                <li>App Builder Prompt: <span className="font-bold text-primary">3 prompts per day</span></li>
              </ul>
              
              <p>
                Simply{' '}
                <button
                  onClick={openSignUpModal}
                  className="font-bold text-primary hover:underline"
                >
                  create a free account
                </button>
                {' '}to start crafting. Your limits reset every 24 hours.
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PricingPage;
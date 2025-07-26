import React from 'react';
import { Mail } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ContactPage = () => {
  return (
    <>
      <head>
        <title>Contact Us | PromptCraft</title>
        <meta name="description" content="Have a question or need support? Get in touch with the PromptCraft team. We're here to help." />
      </head>
      
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            
            <div className="bg-card rounded-lg p-8 md:p-12 shadow-sm border">
              <p className="text-lg leading-relaxed mb-8">
                Have a question, a feature idea, or need help with one of our tools? We'd love to hear from you.
              </p>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">For Support & General Inquiries:</h2>
                <p className="text-lg leading-relaxed mb-6">
                  The best way to reach us is by email. Our team monitors our inbox closely and will get back to you as soon as possible.
                </p>
                
                <div className="inline-flex items-center space-x-3 bg-primary/10 border border-primary/20 rounded-lg px-6 py-4">
                  <Mail className="w-6 h-6 text-primary" />
                  <a 
                    href="mailto:support@promptcraft.ai" 
                    className="text-lg font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    support@promptcraft.ai
                  </a>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed text-muted-foreground">
                We look forward to connecting with you!
              </p>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
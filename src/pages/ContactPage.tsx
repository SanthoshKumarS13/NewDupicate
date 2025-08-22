import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Mail } from 'lucide-react';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | PromptCraft</title>
        <meta name="description" content="Have a question or need support? Get in touch with the PromptCraft team. We're here to help." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-background">
        <Navigation />
        
        <main className="flex-1 container py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Get in Touch
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none mx-auto text-muted-foreground">
              <p>
                Have a question, a feature idea, or need help with one of our tools? We'd love to hear from you.
              </p>
              <p>
                <strong>For Support & General Inquiries:</strong><br />
                The best way to reach us is by email. Our team monitors our inbox closely and will get back to you as soon as possible.
              </p>
              <p>
                Email us at:{' '}
                <a href="mailto:support@promptcraft.ai" className="text-primary hover:underline">
                  support@promptcraft.ai
                </a>
              </p>
              <p>
                We look forward to connecting with you!
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
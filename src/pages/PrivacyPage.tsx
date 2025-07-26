import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PrivacyPage = () => {
  return (
    <>
      <head>
        <title>Privacy Policy | PromptCraft</title>
        <meta name="description" content="Read the PromptCraft Privacy Policy to understand how we collect, use, and protect your data." />
      </head>
      
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Privacy Policy
            </h1>
            
            <div className="bg-card rounded-lg p-8 md:p-12 shadow-sm border">
              <div className="prose prose-lg max-w-none">
                <p className="text-sm text-muted-foreground mb-8">Last Updated: July 22, 2025</p>
                
                <h2 className="text-2xl font-bold mb-4 text-primary">1. Our Commitment to Your Privacy</h2>
                <p className="mb-6">
                  PromptCraft is committed to protecting your privacy. This policy explains what information we collect and how we use it.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-primary">2. Information We Collect</h2>
                <ul className="mb-6 space-y-2">
                  <li><strong>Account Information:</strong> When you sign up, we collect your email address. This is stored securely via our authentication provider, Supabase. We do not handle your password directly.</li>
                  <li><strong>Usage Data:</strong> To enforce our daily limits, we track the number of prompts you generate each day. We do not store the content of the prompts you create.</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4 text-primary">3. How We Use Your Information</h2>
                <ul className="mb-6 space-y-2">
                  <li>To provide you with access to our services.</li>
                  <li>To manage your account and enforce our fair-use daily limits.</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4 text-primary">4. Data Storage and Security</h2>
                <p className="mb-6">
                  All user data is managed and secured by Supabase. We employ industry-standard security measures to protect our platform.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-primary">5. Your Rights</h2>
                <p className="mb-6">
                  You have the right to delete your account at any time. If you wish to do so, please contact us at <a href="mailto:support@promptcraft.ai" className="text-primary hover:text-primary/80">support@promptcraft.ai</a>.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-primary">6. Changes to This Policy</h2>
                <p className="mb-6">
                  We may update this policy from time to time. Any changes will be posted on this page.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-primary">7. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@promptcraft.ai" className="text-primary hover:text-primary/80">support@promptcraft.ai</a>.
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

export default PrivacyPage;
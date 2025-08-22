import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | PromptCraft</title>
        <meta name="description" content="Read the PromptCraft Privacy Policy to understand how we collect, use, and protect your data." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-background">
        <Navigation />
        
        <main className="flex-1 container py-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-heading font-bold">
                Privacy Policy
              </h1>
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
              <p>Last Updated: July 22, 2025</p>

              <h3>1. Our Commitment to Your Privacy</h3>
              <p>PromptCraft is committed to protecting your privacy. This policy explains what information we collect and how we use it.</p>

              <h3>2. Information We Collect</h3>
              <ul>
                <li><strong>Account Information:</strong> When you sign up, we collect your email address. This is stored securely via our authentication provider, Supabase. We do not handle your password directly.</li>
                <li><strong>Usage Data:</strong> To enforce our daily limits, we track the number of prompts you generate each day. We do not store the content of the prompts you create.</li>
              </ul>

              <h3>3. How We Use Your Information</h3>
              <ul>
                <li>To provide you with access to our services.</li>
                <li>To manage your account and enforce our fair-use daily limits.</li>
              </ul>

              <h3>4. Data Storage and Security</h3>
              <p>All user data is managed and secured by Supabase. We employ industry-standard security measures to protect our platform.</p>

              <h3>5. Your Rights</h3>
              <p>You have the right to delete your account at any time. If you wish to do so, please contact us at <a href="mailto:support@promptcraft.ai" className="text-primary hover:underline">support@promptcraft.ai</a>.</p>

              <h3>6. Changes to This Policy</h3>
              <p>We may update this policy from time to time. Any changes will be posted on this page.</p>

              <h3>7. Contact Us</h3>
              <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@promptcraft.ai" className="text-primary hover:underline">support@promptcraft.ai</a>.</p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPage;
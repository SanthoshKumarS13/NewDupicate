import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const BeginnerAiImagePrompt = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "A Beginner's Guide to Writing Your First AI Image Prompt",
    "description": "Learn the basic formula for writing effective AI image prompts to get stunning results from tools like Midjourney.",
    "step": [
      { "@type": "HowToStep", "name": "Define Your Subject", "text": "Start with the main character or focal point of your image." },
      { "@type": "HowToStep", "name": "Add an Action or Pose", "text": "Describe what the subject is doing to bring your scene to life." },
      { "@type": "HowToStep", "name": "Choose a Style", "text": "Select an artistic style like 'photorealistic' or 'oil painting' to set the medium." },
      { "@type": "HowToStep", "name": "Set the Lighting", "text": "Define the lighting to create a specific mood and atmosphere." }
    ]
  };

  return (
    <>
      <Helmet>
        <title>A Beginner's Guide to Writing Your First AI Image Prompt</title>
        <meta name="description" content="Learn the simple 4-part formula to write better AI image prompts. Our tutorial for beginners will help you get stunning results from tools like Midjourney." />
        <meta name="keywords" content="beginner AI image prompt, how to write prompts, Midjourney prompt tutorial" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-background">
        <Navigation />
        
        <main className="flex-1 container py-16">
          <div className="max-w-3xl mx-auto">
            <Link to="/guides" className="inline-flex items-center text-primary hover:underline mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Guides
            </Link>

            <article className="prose prose-invert prose-lg max-w-none text-muted-foreground">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8">
                A Beginner's Guide to Writing Your First AI Image Prompt
              </h1>

              <p>Start by explaining the core formula: [SUBJECT] + [ACTION/POSE] + [STYLE] + [LIGHTING]. Use a simple example like "a cat." Show how adding "a calico cat" is better. Then add "a calico cat sleeping in a sunbeam." Then add "a calico cat sleeping in a sunbeam, oil painting style." Finally, add "a calico cat sleeping in a sunbeam, oil painting style, warm lighting."</p>
              <p>Conclude by encouraging users to try these steps in the <Link to="/tools/image" className="text-primary hover:underline">PromptCraft Image Builder</Link>.</p>
            </article>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default BeginnerAiImagePrompt;
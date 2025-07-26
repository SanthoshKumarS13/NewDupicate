import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const BeginnerAiImagePrompt = () => {
  return (
    <>
      <head>
        <title>A Beginner's Guide to Writing Your First AI Image Prompt</title>
        <meta name="description" content="Learn the simple 4-part formula to write better AI image prompts. Our tutorial for beginners will help you get stunning results from tools like Midjourney." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "A Beginner's Guide to Writing Your First AI Image Prompt",
            "description": "Learn the basic formula for writing effective AI image prompts to get stunning results from tools like Midjourney.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Define Your Subject",
                "text": "Start with the main character or focal point of your image."
              },
              {
                "@type": "HowToStep",
                "name": "Add an Action or Pose",
                "text": "Describe what the subject is doing to bring your scene to life."
              },
              {
                "@type": "HowToStep",
                "name": "Choose a Style",
                "text": "Select an artistic style like 'photorealistic' or 'oil painting' to set the medium."
              },
              {
                "@type": "HowToStep",
                "name": "Set the Lighting",
                "text": "Define the lighting to create a specific mood and atmosphere."
              }
            ]
          })}
        </script>
      </head>
      
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Link to="/guides" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Guides
            </Link>

            <article className="prose prose-lg max-w-none">
              <div className="bg-card rounded-lg p-8 md:p-12 shadow-sm border">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  A Beginner's Guide to Writing Your First AI Image Prompt
                </h1>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-8">
                  <span>By PromptCraft Team</span>
                  <span>•</span>
                  <span>5 min read</span>
                  <span>•</span>
                  <span>Image Generation</span>
                </div>

                <h2 className="text-2xl font-bold mb-4 text-primary">Introduction</h2>
                <p className="text-lg leading-relaxed mb-6">
                  Welcome to the incredible world of AI image generation! You've seen the stunning art online, and you're ready to create your own. But where do you start? The secret to getting amazing results lies in writing a great prompt. This beginner AI image prompt tutorial will teach you a simple but powerful formula to transform your ideas into beautiful visuals.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-primary">The Core Formula: The 4 Building Blocks of a Great Prompt</h2>
                <p className="text-lg leading-relaxed mb-6">
                  Forget complex commands for a moment. At its heart, a good prompt is just a clear description. We can break this down into four simple parts: <strong>Subject + Action/Pose + Style + Environment/Lighting</strong>.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Let's see how to write prompts using this formula with a basic idea: "a cat."
                </p>

                <h3 className="text-xl font-bold mb-3 text-primary">Step 1: Define Your Subject</h3>
                <p className="text-lg leading-relaxed mb-4">
                  "Cat" is okay, but it's too generic. The AI has to guess what kind of cat. Let's be more specific.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <p className="font-mono text-sm mb-2"><strong>Initial Idea:</strong> a cat</p>
                  <p className="font-mono text-sm"><strong>Better Subject:</strong> a fluffy calico cat</p>
                </div>
                <p className="text-lg leading-relaxed mb-6">
                  Being specific gives the AI clear direction.
                </p>

                <h3 className="text-xl font-bold mb-3 text-primary">Step 2: Add an Action or Pose</h3>
                <p className="text-lg leading-relaxed mb-4">
                  What is your subject doing? A static subject is boring. Let's bring it to life.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <p className="font-mono text-sm mb-2"><strong>Previous Prompt:</strong> a fluffy calico cat</p>
                  <p className="font-mono text-sm"><strong>With Action:</strong> a fluffy calico cat sleeping peacefully in a sunbeam</p>
                </div>
                <p className="text-lg leading-relaxed mb-6">
                  Now we have a scene, not just a subject.
                </p>

                <h3 className="text-xl font-bold mb-3 text-primary">Step 3: Choose an Artistic Style</h3>
                <p className="text-lg leading-relaxed mb-4">
                  Do you want a photo or a painting? The style is the most powerful way to change the entire feel of your image.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <p className="font-mono text-sm mb-2"><strong>Previous Prompt:</strong> a fluffy calico cat sleeping peacefully in a sunbeam</p>
                  <p className="font-mono text-sm"><strong>With Style:</strong> a fluffy calico cat sleeping peacefully in a sunbeam, detailed oil painting style</p>
                </div>
                <p className="text-lg leading-relaxed mb-6">
                  We've just told the AI how to render the scene.
                </p>

                <h3 className="text-xl font-bold mb-3 text-primary">Step 4: Set the Environment & Lighting</h3>
                <p className="text-lg leading-relaxed mb-4">
                  The final step is to control the atmosphere. Lighting is key to creating mood.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <p className="font-mono text-sm mb-2"><strong>Previous Prompt:</strong> a fluffy calico cat sleeping peacefully in a sunbeam, detailed oil painting style</p>
                  <p className="font-mono text-sm"><strong>With Lighting:</strong> a fluffy calico cat sleeping peacefully in a sunbeam inside a cozy library, warm and soft lighting, detailed oil painting style</p>
                </div>

                <h2 className="text-2xl font-bold mb-4 text-primary">Putting It All Together</h2>
                <p className="text-lg leading-relaxed mb-6">
                  Look at the difference! We went from a vague idea to a rich, detailed scene that the AI can understand perfectly. This simple formula is the foundation for almost every great prompt you'll write.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-primary">Ready to try it yourself?</h2>
                <p className="text-lg leading-relaxed mb-8">
                  You now have the knowledge to create something amazing. Open up our <Link to="/tools/image" className="text-primary hover:text-primary/80 underline">Free AI Image Prompt Generator</Link> and try building your own prompt using this 4-step method. Experiment with different styles, actions, and lighting to see what you can create!
                </p>

                <div className="border-t pt-8">
                  <Link to="/tools/image">
                    <Button size="lg" className="text-lg px-8 py-4">
                      Try the Image Prompt Generator
                      <ArrowRight className="w-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default BeginnerAiImagePrompt;
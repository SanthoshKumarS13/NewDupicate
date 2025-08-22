import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Copy, Eye } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

// Type definition for an example
interface Example {
  category: string;
  model: string;
  title: string;
  description: string;
  visual: string;
  prompt: string;
}

// Data for the four specified examples
const examples: Example[] = [
  {
    category: "Image",
    model: "Midjourney",
    title: "Cyberpunk Mercenary Portrait",
    description: "A detailed prompt for creating a photorealistic, character-focused image with specific technical parameters for Midjourney.",
    visual: "A stunning, hyper-detailed portrait of a female cyborg in a neon-lit, rainy alleyway.",
    prompt: "photorealistic portrait of a female cyborg mercenary with glowing optic nerves, standing in a rain-slicked cyberpunk alleyway, reflection in puddles, cinematic lighting from neon signs, insanely detailed, intricate mechanical parts, 8k, shot on Sony A7IV --ar 2:3 --s 250 --style raw --no blurry, ugly, text",
  },
  {
    category: "Video",
    model: "Sora",
    title: "The Enchanted Library",
    description: "A narrative prompt designed for OpenAI's Sora, focusing on scene, atmosphere, and camera movement to create a magical video clip.",
    visual: "A video thumbnail showing a majestic, ancient library with floating books and swirling dust motes.",
    prompt: "A cinematic, sweeping crane shot moving slowly through a vast, ancient library. Dust motes dance in rays of golden hour light filtering through cathedral-like windows. Books float gently off shelves, pages turning by themselves in mid-air. The mood is magical, awe-inspiring, and slightly mysterious. The scene is hyper-realistic with intricate details on the book bindings and wooden architecture.",
  },
  {
    category: "Music",
    model: "Suno",
    title: "Retro Highway Anthem",
    description: "A structured prompt for Suno AI to generate an instrumental synthwave track with a clear mood and instrumentation.",
    visual: "An album art-style graphic with a retro, 1980s aesthetic featuring a sunset and a sports car.",
    prompt: "An instrumental synthwave track, 1980s influence, driving and nostalgic mood, 120 BPM. Featuring analog synth pads, a powerful electric guitar solo, gated reverb on the snare drum, and a driving bassline. [Intro] [Verse] [Chorus] [Guitar Solo] [Outro]",
  },
  {
    category: "App",
    model: "Replit AI",
    title: "SaaS Pricing Table Component",
    description: "A highly-structured prompt for an AI assistant like Replit AI, detailing the exact requirements to build a responsive pricing table component.",
    visual: "A clean, modern graphic showing a three-tiered pricing table component.",
    prompt: `**Component Task:** Create a pricing table with three tiers: 'Free', 'Pro', and 'Team'.

**Structural Requirements:**
* The 'Pro' tier should be visually highlighted as the "most popular" option (e.g., with a different border color or a small badge).
* Each tier card should contain:
    1.  The Tier Name (e.g., "Pro").
    2.  The Price (e.g., "$15 / month").
    3.  A short description.
    4.  A bulleted list of features.
    5.  A Call-to-Action button.

**Content Requirements:**
* **Tier 1 (Free):** Price: "$0 / month", Description: "For individuals and hobbyists", Features: "10 Image Prompts/day", "Community Access", Button Text: "Start for Free".
* **Tier 2 (Pro):** Price: "$10 / month", Description: "For professionals and power users", Features: "Unlimited Prompts", "Advanced Video & Audio Tools", "Priority Support", Button Text: "Upgrade to Pro".


**Styling Requirements:**
* Use the dark theme colors from the project guidelines.
* The highlighted 'Pro' tier should have a border in the primary accent color (\`#34D399\`).
* The CTA button for the 'Pro' tier should be solid (\`bg-emerald-500\`), while the others are outlined.`,
  }
];

const ExamplesPage = () => {
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied to clipboard!");
  };

  return (
    <>
      <Helmet>
        <title>Inspiration Gallery: Masterful Prompt Examples | PromptCraft</title>
        <meta name="description" content="Discover what's possible with PromptCraft. Browse our curated gallery of masterful prompt examples for image, video, music, and app generation." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-background">
        <Navigation />
        
        <main className="flex-1 container py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Inspiration Gallery: Masterful Prompt Examples
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover what's possible. Every creation in this gallery was made using prompts generated by our tools. This gallery is hand-picked by our staff to showcase best-in-class results. Click any example to see the full prompt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {examples.map((example) => (
              <Card
                key={example.title}
                className="group transition-all duration-300 border bg-card hover:border-primary cursor-pointer"
                onClick={() => setSelectedExample(example)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge variant="secondary">{example.category}</Badge>
                    <Badge variant="outline">{example.model}</Badge>
                  </div>
                  <p className="text-sm italic text-muted-foreground mb-4">
                    Visual: {example.visual}
                  </p>
                  <h3 className="text-xl font-heading font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {example.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {example.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        
        <Footer />
      </div>

      {selectedExample && (
        <Dialog open={!!selectedExample} onOpenChange={(isOpen) => !isOpen && setSelectedExample(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <span>{selectedExample.title}</span>
                <Badge variant="secondary">{selectedExample.model}</Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto pr-4 -mr-4">
              <pre className="text-sm whitespace-pre-wrap font-mono bg-muted p-4 rounded-md">
                {selectedExample.prompt}
              </pre>
            </div>
            <Button
              onClick={() => handleCopyPrompt(selectedExample.prompt)}
              className="mt-4"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Prompt
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ExamplesPage;
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Copy, Eye, Filter } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ExamplesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const examples = [
    // IMAGE EXAMPLES
    {
      id: 1,
      category: "Image",
      model: "Midjourney",
      title: "Cyberpunk Mercenary Portrait",
      description: "A detailed prompt for creating a photorealistic, character-focused image with specific technical parameters for Midjourney.",
      visual: "A hyper-detailed portrait of a female cyborg in a neon-lit, rainy alleyway.",
      prompt: "photorealistic portrait of a female cyborg mercenary with glowing optic nerves, standing in a rain-slicked cyberpunk alleyway, reflection in puddles, cinematic lighting from neon signs, insanely detailed, intricate mechanical parts, 8k, shot on Sony A7IV --ar 2:3 --s 250 --style raw --no blurry, ugly, text",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      category: "Image",
      model: "Stable Diffusion",
      title: "Enchanted Forest Creature",
      description: "A whimsical prompt showcasing Stable Diffusion's ability to create magical, fantasy creatures with specific negative prompts.",
      visual: "A whimsical, glowing, fox-like creature with luminescent fur, curled up at the base of a giant, mossy tree.",
      prompt: "(masterpiece, best quality), a whimsical magical fox creature with bioluminescent fur, sleeping in an enchanted forest, dappled moonlight, fantasy, intricate details, art by Hayao Miyazaki and Brian Froud, (Negative prompt: ugly, deformed, blurry)",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      category: "Image",
      model: "DALL-E 3",
      title: "Watercolor Parisian Cafe",
      description: "A prompt designed for DALL-E 3's natural language processing, focusing on artistic style and scene composition.",
      visual: "A vibrant and loose watercolor painting of a charming Parisian street cafe, with people enjoying coffee at outdoor tables.",
      prompt: "A vibrant watercolor painting of a bustling Parisian street cafe scene in the spring. Tables and chairs are outside on the cobblestone street. The style should be loose and expressive, with splashes of color. A couple is seen laughing over coffee.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 4,
      category: "Image",
      model: "Midjourney",
      title: "Minimalist Architectural Detail",
      description: "A technical prompt showcasing Midjourney's architectural photography capabilities with specific aspect ratio and style parameters.",
      visual: "A clean, black and white photograph focusing on the sharp lines and repeating patterns of a modern building's facade.",
      prompt: "black and white architectural photography, minimalist, focusing on the repeating geometric patterns and harsh shadows of a modern brutalist building facade, high contrast, clean lines, sharp focus --ar 16:9 --style raw",
      gradient: "from-gray-500 to-slate-500"
    },
    // VIDEO EXAMPLES
    {
      id: 5,
      category: "Video",
      model: "Sora",
      title: "The Enchanted Library",
      description: "A narrative prompt designed for OpenAI's Sora, focusing on scene, atmosphere, and camera movement to create a magical video clip.",
      visual: "A video thumbnail showing a majestic, ancient library with floating books and swirling dust motes.",
      prompt: "A cinematic, sweeping crane shot moving slowly through a vast, ancient library. Dust motes dance in rays of golden hour light filtering through cathedral-like windows. Books float gently off shelves, pages turning by themselves in mid-air. The mood is magical and awe-inspiring. The scene is hyper-realistic with intricate details on the book bindings and wooden architecture.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      id: 6,
      category: "Video",
      model: "Google Veo",
      title: "Coral Reef Time-lapse",
      description: "A nature-focused prompt for Google Veo, emphasizing time-lapse photography and underwater cinematography.",
      visual: "A vibrant, sped-up video of a coral reef, showing corals and sea anemones pulsing and moving over time.",
      prompt: "A stunning time-lapse video of a vibrant coral reef. Show the polyps of different corals pulsing and sea anemones waving in the current. The water is crystal clear and sunlight filters down from the surface. Many colorful tropical fish swim quickly through the frame.",
      gradient: "from-teal-500 to-blue-500"
    },
    {
      id: 7,
      category: "Video",
      model: "Runway Gen-3",
      title: "Hacker's Desk POV",
      description: "A first-person perspective prompt for Runway Gen-3, focusing on atmosphere and technical details for a cyberpunk aesthetic.",
      visual: "A first-person view of a messy desk with multiple monitors displaying scrolling code, a half-empty coffee mug, and mechanical keyboards.",
      prompt: "First-person POV shot of a computer hacker's desk at night. The only light comes from three monitors displaying rapidly scrolling green code. The desk is cluttered with wires, an old coffee mug, and a mechanical keyboard. The feeling is tense and focused. Handheld camera feel.",
      gradient: "from-green-500 to-lime-500"
    },
    // MUSIC EXAMPLES
    {
      id: 8,
      category: "Music",
      model: "Suno",
      title: "Retro Highway Anthem",
      description: "A structured prompt for Suno AI to generate an instrumental synthwave track with a clear mood and instrumentation.",
      visual: "An album art-style graphic with a 1980s aesthetic featuring a sunset and a sports car.",
      prompt: "An instrumental synthwave track, 1980s influence, driving and nostalgic mood, 120 BPM. Featuring analog synth pads, a powerful electric guitar solo, gated reverb on the snare drum, and a driving bassline. [Intro] [Verse] [Chorus] [Guitar Solo] [Outro]",
      gradient: "from-pink-500 to-purple-500"
    },
    {
      id: 9,
      category: "Music",
      model: "Udio",
      title: "Rainy Day Lo-fi",
      description: "A mood-focused prompt for Udio, emphasizing the lo-fi hip hop genre with specific atmospheric elements.",
      visual: "An animated illustration of a person looking out a window at a rainy city street.",
      prompt: "Lo-fi hip hop, calm, studying, rainy day vibes, 90 BPM. Featuring a gentle piano melody, vinyl crackle, a simple boom-bap drum loop, and a smooth jazz saxophone sample.",
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      id: 10,
      category: "Music",
      model: "Suno",
      title: "Folk Tale Ballad",
      description: "A storytelling prompt for Suno with specific lyrical structure and folk instrumentation.",
      visual: "A simple, rustic drawing of a guitar leaning against a tree.",
      prompt: "A melancholic folk ballad, 1960s folk influence, storytelling. Gentle acoustic guitar, a haunting male vocal, and a subtle harmonica. [Verse] The old man walked the lonely road... [Chorus] And the wind did call his name...",
      gradient: "from-amber-600 to-yellow-500"
    },
    // APP BUILDER EXAMPLE
    {
      id: 11,
      category: "App",
      model: "Replit AI",
      title: "SaaS Pricing Table Component",
      description: "A highly-structured prompt for an AI assistant like Replit AI, detailing the exact requirements to build a responsive pricing table component.",
      visual: "A clean, modern graphic showing a three-tiered pricing table component.",
      prompt: `**Component Task:** Create a pricing table with three tiers: 'Free', 'Pro', and 'Team'.

**Structural Requirements:**
* The 'Pro' tier should be visually highlighted with a different border color and a "Most Popular" badge.
* Each card must contain: Tier Name, Price, Description, Feature List, and a CTA Button.

**Content Requirements:**
* **Tier 1 (Free):** Price: "$0 / month", Description: "For individuals", Features: ["10 Image Prompts/day", "Community Access"], Button Text: "Start for Free".
* **Tier 2 (Pro):** Price: "$15 / month", Description: "For professionals", Features: ["Unlimited Prompts", "Advanced Video Tools", "Priority Support"], Button Text: "Upgrade to Pro".
* **Tier 3 (Team):** Price: "Contact Us", Description: "For agencies", Features: ["All Pro Features", "Shared Workspaces"], Button Text: "Contact Sales".

**Styling Requirements:**
* Use a light theme. The highlighted 'Pro' tier border should be the primary accent color (\`#10B981\`). The 'Pro' CTA button should be solid, while the others are outlined.`,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const categories = ['All', 'Image', 'Video', 'Music', 'App'];

  const filteredExamples = selectedCategory === 'All' 
    ? examples 
    : examples.filter(example => example.category === selectedCategory);

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied to clipboard!");
  };

  return (
    <>
      <head>
        <title>Inspiration Gallery: Masterful Prompt Examples | PromptCraft</title>
        <meta name="description" content="Discover what's possible with PromptCraft. Browse our curated gallery of masterful prompt examples for image, video, music, and app generation." />
      </head>
      
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Inspiration Gallery: Masterful Prompt Examples
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover what's possible. Every creation in this gallery was made using prompts generated by our tools. This gallery is hand-picked by our staff to showcase best-in-class results. Click any example to see the full prompt.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-200"
              >
                <Filter className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredExamples.map((example) => (
              <Card key={example.id} className="group hover:shadow-elegant transition-all duration-300 border bg-card backdrop-blur overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${example.gradient}`}></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {example.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {example.model}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {example.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm italic">
                    {example.visual}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {example.description}
                  </p>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full group-hover:border-primary transition-colors">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Prompt
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <span>{example.title}</span>
                          <Badge variant="secondary">{example.model}</Badge>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed">
                            {example.prompt}
                          </pre>
                        </div>
                        <Button 
                          onClick={() => handleCopyPrompt(example.prompt)}
                          className="w-full"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Prompt
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default ExamplesPage;
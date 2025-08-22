import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const FirstAiSongSunoGuide = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Create Your First AI Song with Suno",
    "description": "A step-by-step guide to creating your first AI song using structured prompts for tools like Suno.",
    "step": [
      { "@type": "HowToStep", "name": "Write a Chorus", "text": "Start with a simple chorus to define the main theme of your song." },
      { "@type": "HowToStep", "name": "Use Structural Tags", "text": "Use tags like [Chorus] and [Verse] to structure your song." },
      { "@type": "HowToStep", "name": "Choose a Genre", "text": "Specify a genre like 'Lo-fi Hip Hop' or 'Synthwave'." },
      { "@type": "HowToStep", "name": "Add a Mood", "text": "Include a mood like 'peaceful' or 'energetic' to guide the AI." },
      { "@type": "HowToStep", "name": "Specify Instruments", "text": "Mention key instruments like 'electric piano' or 'acoustic guitar'." }
    ]
  };

  return (
    <>
      <Helmet>
        <title>How to Create Your First AI Song with Suno: A Step-by-Step Guide</title>
        <meta name="description" content="A simple walkthrough to get started with AI music generation using structured prompts and tags for Suno AI." />
        <meta name="keywords" content="Suno AI prompts, AI music tutorial, how to use Suno" />
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
                How to Create Your First AI Song with Suno: A Step-by-Step Guide
              </h1>

              <p>Creating music with AI might seem complicated, but tools like Suno make it incredibly accessible. You don't need to be a musician to create a full song. This guide provides a simple walkthrough to get you started.</p>

              <h3>Step 1: Write a Simple Chorus</h3>
              <p>You don't need to be a poet. Start with a simple line or two for a chorus, like "City lights in the falling rain, finding peace in the gentle pain." This gives the AI the core lyrical and emotional theme of your song.</p>

              <h3>Step 2: Use Structural Tags</h3>
              <p>To give your song a proper structure, use tags like <code>[Chorus]</code>, <code>[Verse]</code>, <code>[Intro]</code>, and <code>[Outro]</code>. This tells the AI how to arrange the different parts of your song. You can even add lyrics after a <code>[Verse]</code> tag to write more of the song yourself.</p>

              <h3>Step 3: Choose a Genre</h3>
              <p>What kind of song do you want to make? Be specific. "Pop" is okay, but "Lo-fi Hip Hop" or "80s Synthwave" gives the AI much clearer instructions on the style, tempo, and instrumentation to use.</p>

              <h3>Step 4: Add a Mood</h3>
              <p>Describe the emotional feel of the song. Is it "peaceful and contemplative," "energetic and upbeat," or "melancholic and thoughtful"? The mood will influence the melody, tempo, and instrumentation the AI chooses.</p>

              <h3>Step 5: Specify an Instrument</h3>
              <p>Mention one or two key instruments to guide the sound. Adding "with a prominent electric piano" or "driven by an acoustic guitar" can make a huge difference and help the AI zero in on the sound you're imagining.</p>

              <p className="mt-8">It's that easy to get started. Create your first track today with the <Link to="/tools/music" className="text-primary hover:underline">PromptCraft Music Builder</Link>.</p>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FirstAiSongSunoGuide;

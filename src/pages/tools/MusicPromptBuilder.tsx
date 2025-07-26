import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { ModelSelector } from '@/components/shared/ModelSelector';
import { FormField } from '@/components/shared/FormField';
import { TagInput } from '@/components/shared/TagInput';
import { PromptCanvas } from '@/components/shared/PromptCanvas';
import { toast } from 'sonner';
import { usePromptLimits } from '@/hooks/usePromptLimits';
import { AuthModal } from '@/components/auth/AuthModal';

const modelOptions = ["Suno", "Udio", "Stable Audio", "Riffusion"];
const genreOptions = ["Synthwave", "Lo-fi Hip Hop", "Epic Orchestral", "Folk", "Hard Rock", "Pop", "Jazz", "Blues"];
const moodOptions = ["Triumphant", "Melancholic", "Aggressive", "Peaceful", "Unsettling", "Romantic", "Energetic"];
const vocalStyleOptions = ["Male Vocal", "Female Vocal", "Instrumental", "Choir", "Rapping", "Whispered Vocals"];
const structureTags = ["[Verse]", "[Chorus]", "[Bridge]", "[Guitar Solo]", "[Hook]"];

export const MusicPromptBuilder: React.FC = () => {
  const { checkAndDecrementLimit, getRemainingCount, isAuthenticated } = usePromptLimits();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedModel, setSelectedModel] = useState("");
  const [coreIdea, setCoreIdea] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [eraInfluence, setEraInfluence] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [instrumentation, setInstrumentation] = useState<string[]>([]);
  const [vocalStyle, setVocalStyle] = useState("");
  const [tempo, setTempo] = useState([120]);
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const generatePrompt = async () => {
    if (!isAuthenticated) {
      setAuthMode('signup');
      setAuthModalOpen(true);
      return;
    }

    const canGenerate = await checkAndDecrementLimit('music');
    if (!canGenerate) {
      return;
    }

    const promptParts = [];
    
    if (coreIdea) promptParts.push(coreIdea);
    if (selectedGenres.length > 0) promptParts.push(`Genre: ${selectedGenres.join(', ')}`);
    if (eraInfluence.length > 0) promptParts.push(`Style: ${eraInfluence.join(', ')}`);
    if (selectedMoods.length > 0) promptParts.push(`Mood: ${selectedMoods.join(', ')}`);
    if (instrumentation.length > 0) promptParts.push(`Instruments: ${instrumentation.join(', ')}`);
    if (vocalStyle) promptParts.push(`Vocals: ${vocalStyle}`);
    promptParts.push(`Tempo: ${tempo[0]} BPM`);

    const prompt = promptParts.join(', ');
    setGeneratedPrompt(prompt);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast.success("Prompt copied to clipboard!");
  };

  const insertStructureTag = (tag: string) => {
    setCoreIdea(prev => prev + (prev ? '\n' : '') + tag + '\n');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Free AI Music Prompt Generator</h1>
          <p className="text-muted-foreground">
            {isAuthenticated 
              ? `Daily Limit: ${getRemainingCount('music')} prompts remaining today`
              : 'Daily Limit: 5 prompts per user per day'
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Control Panel */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <ModelSelector 
                  value={selectedModel}
                  onChange={setSelectedModel}
                  options={modelOptions}
                />

                <FormField 
                  label="Core Idea / Lyrics"
                  helperText="A song about a lonely astronaut, or paste your lyrics here..."
                >
                  <Textarea
                    value={coreIdea}
                    onChange={(e) => setCoreIdea(e.target.value)}
                    placeholder="A song about a lonely astronaut, or paste your lyrics here..."
                    className="min-h-[120px]"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {structureTags.map(tag => (
                      <Button
                        key={tag}
                        variant="outline"
                        size="sm"
                        onClick={() => insertStructureTag(tag)}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Use these tags to structure your lyrics for the AI.
                  </p>
                </FormField>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="genre-style">
                    <AccordionTrigger>Genre & Style</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <FormField
                        label="Genre(s)"
                        helperText="Combine multiple genres to create unique, fused styles."
                      >
                        <TagInput
                          value={selectedGenres}
                          onChange={setSelectedGenres}
                          placeholder="Type genres or select from: Synthwave, Lo-fi Hip Hop, Epic Orchestral..."
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                          {genreOptions.map(genre => (
                            <Button
                              key={genre}
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (!selectedGenres.includes(genre)) {
                                  setSelectedGenres([...selectedGenres, genre]);
                                }
                              }}
                            >
                              {genre}
                            </Button>
                          ))}
                        </div>
                      </FormField>

                      <FormField
                        label="Era / Influence"
                        helperText="Guide the AI toward a specific time period or iconic sound."
                      >
                        <TagInput
                          value={eraInfluence}
                          onChange={setEraInfluence}
                          placeholder="e.g., 1980s influence, 1960s folk, Motown sound"
                        />
                      </FormField>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="mood-instrumentation">
                    <AccordionTrigger>Mood & Instrumentation</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <FormField
                        label="Mood & Emotion"
                        helperText="Set the emotional tone of the piece."
                      >
                        <TagInput
                          value={selectedMoods}
                          onChange={setSelectedMoods}
                          placeholder="Select moods..."
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                          {moodOptions.map(mood => (
                            <Button
                              key={mood}
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (!selectedMoods.includes(mood)) {
                                  setSelectedMoods([...selectedMoods, mood]);
                                }
                              }}
                            >
                              {mood}
                            </Button>
                          ))}
                        </div>
                      </FormField>

                      <FormField
                        label="Instrumentation"
                        helperText="Specify the exact instruments you want to hear in the final track."
                      >
                        <TagInput
                          value={instrumentation}
                          onChange={setInstrumentation}
                          placeholder="e.g., electric piano, slap bass, string orchestra, 808 drums"
                        />
                      </FormField>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="vocals-tempo">
                    <AccordionTrigger>Vocals & Tempo</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <FormField
                        label="Vocal Style"
                        helperText="Choose the type of vocals, or select 'Instrumental' for none."
                      >
                        <Select value={vocalStyle} onValueChange={setVocalStyle}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vocal style" />
                          </SelectTrigger>
                          <SelectContent>
                            {vocalStyleOptions.map(style => (
                              <SelectItem key={style} value={style}>{style}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField
                        label="Tempo (BPM)"
                        helperText="Control the speed of your song, from a slow ballad to an upbeat track."
                      >
                        <div className="space-y-2">
                          <Slider
                            value={tempo}
                            onValueChange={setTempo}
                            max={180}
                            min={60}
                            step={5}
                            className="w-full"
                          />
                          <div className="text-center text-sm text-muted-foreground">
                            {tempo[0]} BPM
                          </div>
                        </div>
                      </FormField>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button 
                  onClick={generatePrompt} 
                  size="lg" 
                  className="w-full"
                  disabled={!coreIdea}
                >
                  {isAuthenticated ? 'CRAFT PROMPT' : 'SIGN UP TO CRAFT PROMPT'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Canvas */}
          <div>
            <PromptCanvas
              prompt={generatedPrompt}
              onCopy={handleCopy}
            />
          </div>
        </div>
      </div>

     <AuthModal
       isOpen={authModalOpen}
       onClose={() => setAuthModalOpen(false)}
       mode={authMode}
       onModeChange={setAuthMode}
     />
    </div>
  );
};
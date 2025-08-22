import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ModelSelector } from '@/components/shared/ModelSelector';
import { FormField } from '@/components/shared/FormField';
import { TagInput } from '@/components/shared/TagInput';
import { PromptCanvas } from '@/components/shared/PromptCanvas';
import { toast } from 'sonner';
import { usePromptLimits } from '@/hooks/usePromptLimits';
import { AuthModal } from '@/components/auth/AuthModal';

const modelOptions = ["Midjourney", "DALL-E 3", "Stable Diffusion", "Ideogram", "Leonardo AI"];
const styleOptions = ["Photorealistic", "Anime", "Oil Painting", "3D Render", "Watercolor", "Line Art", "Cyberpunk", "Steampunk"];
const artistOptions = ["Greg Rutkowski", "Alphonse Mucha", "Wes Anderson", "Hayao Miyazaki", "Van Gogh", "Picasso", "Monet"];
const colorPaletteOptions = ["Vibrant & Saturated", "Muted Earth Tones", "Monochrome", "Pastel Tones", "Neon"];
const lightingOptions = ["Cinematic Lighting", "Golden Hour", "Studio Light", "Neon Glow", "Backlit", "Moody"];
const cameraAngleOptions = ["Portrait", "Close-up", "Wide Shot", "Aerial View", "Low-Angle Shot"];
const aspectRatioOptions = ["1:1 (Square)", "2:3 (Portrait)", "3:2 (Landscape)", "16:9 (Widescreen)"];
const qualityEnhancers = ["4K", "8K", "Highly Detailed", "Intricate Details", "UHD"];

export const ImagePromptBuilder: React.FC = () => {
  const { checkAndDecrementLimit, getRemainingCount, isAuthenticated } = usePromptLimits();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedModel, setSelectedModel] = useState("");
  const [coreIdea, setCoreIdea] = useState("");
  const [primarySubjects, setPrimarySubjects] = useState<string[]>([]);
  const [actionPose, setActionPose] = useState<string[]>([]);
  const [environment, setEnvironment] = useState("");
  const [primaryStyle, setPrimaryStyle] = useState("");
  const [artistReference, setArtistReference] = useState("");
  const [colorPalette, setColorPalette] = useState("");
  const [lightingStyle, setLightingStyle] = useState("");
  const [cameraAngle, setCameraAngle] = useState("");
  const [aspectRatio, setAspectRatio] = useState("");
  const [selectedQualityEnhancers, setSelectedQualityEnhancers] = useState<string[]>([]);
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const generatePrompt = async () => {
    // Step 1: Check if the user is authenticated. If not, open the sign-up modal.
    if (!isAuthenticated) {
      setAuthMode('signup');
      setAuthModalOpen(true);
      toast.error("Please sign up or sign in to generate a prompt.");
      return;
    }

    // Step 2: Check the user's remaining prompts and decrement the limit.
    // The usePromptLimits hook handles the RPC call and error notifications.
    const canGenerate = await checkAndDecrementLimit('image');
    if (!canGenerate) {
      return; // Stop if the user has no prompts left or an error occurred.
    }

    // Step 3: If checks pass, proceed with generating the prompt string.
    const promptParts = [];
    if (coreIdea) promptParts.push(coreIdea);
    if (primarySubjects.length > 0) promptParts.push(`featuring ${primarySubjects.join(', ')}`);
    if (actionPose.length > 0) promptParts.push(`${actionPose.join(', ')}`);
    if (environment) promptParts.push(`in ${environment}`);
    if (primaryStyle) promptParts.push(`${primaryStyle} style`);
    if (artistReference) promptParts.push(`in the style of ${artistReference}`);
    if (colorPalette) promptParts.push(`${colorPalette.toLowerCase()} color palette`);
    if (lightingStyle) promptParts.push(`${lightingStyle.toLowerCase()}`);
    if (cameraAngle) promptParts.push(`${cameraAngle.toLowerCase()}`);
    if (aspectRatio) promptParts.push(`--ar ${aspectRatio.split(' ')[0]}`);
    if (selectedQualityEnhancers.length > 0) promptParts.push(selectedQualityEnhancers.join(', '));

    const prompt = promptParts.join(', ');
    setGeneratedPrompt(prompt);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast.success("Prompt copied to clipboard!");
  };

  const toggleQualityEnhancer = (enhancer: string) => {
    setSelectedQualityEnhancers(prev => 
      prev.includes(enhancer) 
        ? prev.filter(e => e !== enhancer)
        : [...prev, enhancer]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Free AI Image Prompt Generator</h1>
          <p className="text-muted-foreground">
            {isAuthenticated 
              ? `Daily Limit: ${getRemainingCount('image')} prompts remaining today`
              : 'Daily Limit: 10 prompts per user per day'
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
                  label="Core Idea"
                  helperText="Describe the main concept of your image"
                >
                  <Textarea
                    value={coreIdea}
                    onChange={(e) => setCoreIdea(e.target.value)}
                    placeholder="e.g., A wise old wizard in a mystical library."
                    className="min-h-[100px]"
                  />
                </FormField>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="subject-details">
                    <AccordionTrigger>Subject Details</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <FormField
                        label="Primary Subject(s)"
                        helperText="The main character or focal point of the image. Be descriptive."
                      >
                        <TagInput
                          value={primarySubjects}
                          onChange={setPrimarySubjects}
                          placeholder="e.g., ancient wizard, futuristic cyborg, calico cat"
                        />
                      </FormField>

                      <FormField
                        label="Action / Pose"
                        helperText="What is the subject doing? Describe their action or posture."
                      >
                        <TagInput
                          value={actionPose}
                          onChange={setActionPose}
                          placeholder="e.g., casting a spell, running through a field, sleeping in a sunbeam"
                        />
                      </FormField>

                      <FormField
                        label="Environment / Setting"
                        helperText="Describe the background and location of the scene."
                      >
                        <Input
                          value={environment}
                          onChange={(e) => setEnvironment(e.target.value)}
                          placeholder="e.g., inside a grand, dusty library, on a neon-lit cyberpunk street"
                        />
                      </FormField>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="artistic-style">
                    <AccordionTrigger>Artistic Style</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <FormField
                        label="Primary Style"
                        helperText="Sets the overall visual look and medium of your image."
                      >
                        <Select value={primaryStyle} onValueChange={setPrimaryStyle}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            {styleOptions.map(style => (
                              <SelectItem key={style} value={style}>{style}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField
                        label="Artist Reference"
                        helperText="Emulate the iconic style of a famous artist."
                      >
                        <Select value={artistReference} onValueChange={setArtistReference}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select artist" />
                          </SelectTrigger>
                          <SelectContent>
                            {artistOptions.map(artist => (
                              <SelectItem key={artist} value={artist}>{artist}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField
                        label="Color Palette"
                        helperText="Choose the dominant color scheme for your image."
                      >
                        <Select value={colorPalette} onValueChange={setColorPalette}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select color palette" />
                          </SelectTrigger>
                          <SelectContent>
                            {colorPaletteOptions.map(palette => (
                              <SelectItem key={palette} value={palette}>{palette}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="camera-lighting">
                    <AccordionTrigger>Camera & Lighting</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <FormField
                        label="Lighting Style"
                        helperText="Define the lighting to create a specific mood and atmosphere."
                      >
                        <Select value={lightingStyle} onValueChange={setLightingStyle}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select lighting" />
                          </SelectTrigger>
                          <SelectContent>
                            {lightingOptions.map(lighting => (
                              <SelectItem key={lighting} value={lighting}>{lighting}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField
                        label="Camera Angle"
                        helperText="Choose the camera's vantage point for a different perspective."
                      >
                        <Select value={cameraAngle} onValueChange={setCameraAngle}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select camera angle" />
                          </SelectTrigger>
                          <SelectContent>
                            {cameraAngleOptions.map(angle => (
                              <SelectItem key={angle} value={angle}>{angle}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="technical-parameters">
                    <AccordionTrigger>Technical Parameters</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <FormField
                        label="Aspect Ratio"
                        helperText="Set the final dimensions of your image."
                      >
                        <Select value={aspectRatio} onValueChange={setAspectRatio}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select aspect ratio" />
                          </SelectTrigger>
                          <SelectContent>
                            {aspectRatioOptions.map(ratio => (
                              <SelectItem key={ratio} value={ratio}>{ratio}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField
                        label="Quality Enhancers"
                        helperText="Add these keywords to increase the level of detail and sharpness."
                      >
                        <div className="flex flex-wrap gap-2">
                          {qualityEnhancers.map(enhancer => (
                            <Button
                              key={enhancer}
                              variant={selectedQualityEnhancers.includes(enhancer) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleQualityEnhancer(enhancer)}
                            >
                              {enhancer}
                            </Button>
                          ))}
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
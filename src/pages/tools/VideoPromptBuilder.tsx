import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ModelSelector } from '@/components/shared/ModelSelector';
import { FormField } from '@/components/shared/FormField';
import { PromptCanvas } from '@/components/shared/PromptCanvas';
import { toast } from 'sonner';
import { usePromptLimits } from '@/hooks/usePromptLimits';
import { AuthModal } from '@/components/auth/AuthModal';

const modelOptions = ["Sora", "Google Veo", "Kling", "Runway Gen-3", "Pika"];
const visualStyleOptions = ["Cinematic", "Photorealistic", "3D Animation", "Vintage Film (1950s)", "Archival Footage", "Anime"];
const lightingMoodOptions = ["Golden Hour", "Dramatic Contrast", "Neon Noir", "Eerie & Foggy", "Bright & Cheerful"];
const colorPaletteOptions = ["Vibrant & Saturated", "Muted Earth Tones", "Monochrome", "Pastel"];
const cameraPerspectiveOptions = ["Eye-Level Shot", "Low-Angle Shot", "High-Angle Shot", "Aerial View", "Point of View (POV)"];
const cameraMovementOptions = ["Static Shot", "Slow Pan Left", "Rapid Tracking Shot", "Dolly Zoom", "Crane Shot"];
const lensShotOptions = ["Wide Angle (24mm)", "Standard (50mm)", "Telephoto (135mm)", "Macro (Extreme Close-up)"];
const paceSpeedOptions = ["Real-time", "Slow Motion", "Time-lapse", "Fast-paced"];

export const VideoPromptBuilder: React.FC = () => {
  const { checkAndDecrementLimit, getRemainingCount, isAuthenticated } = usePromptLimits();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedModel, setSelectedModel] = useState("");
  const [coreScene, setCoreScene] = useState("");
  const [visualStyle, setVisualStyle] = useState("");
  const [lightingMood, setLightingMood] = useState("");
  const [colorPalette, setColorPalette] = useState("");
  const [cameraPerspective, setCameraPerspective] = useState("");
  const [cameraMovement, setCameraMovement] = useState("");
  const [lensShot, setLensShot] = useState("");
  const [keySubjects, setKeySubjects] = useState("");
  const [coreAction, setCoreAction] = useState("");
  const [paceSpeed, setPaceSpeed] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const generatePrompt = async () => {
    if (!isAuthenticated) {
      setAuthMode('signup');
      setAuthModalOpen(true);
      return;
    }

    const canGenerate = await checkAndDecrementLimit('video');
    if (!canGenerate) {
      return;
    }

    const promptParts = [];
    
    if (coreScene) promptParts.push(coreScene);
    if (keySubjects) promptParts.push(`featuring ${keySubjects}`);
    if (coreAction) promptParts.push(coreAction);
    if (visualStyle) promptParts.push(`${visualStyle} style`);
    if (lightingMood) promptParts.push(`${lightingMood.toLowerCase()} lighting`);
    if (colorPalette) promptParts.push(`${colorPalette.toLowerCase()} colors`);
    if (cameraPerspective) promptParts.push(`shot from ${cameraPerspective.toLowerCase()}`);
    if (cameraMovement) promptParts.push(`${cameraMovement.toLowerCase()}`);
    if (lensShot) promptParts.push(`using ${lensShot.toLowerCase()}`);
    if (paceSpeed) promptParts.push(`${paceSpeed.toLowerCase()} pace`);

    const prompt = promptParts.join(', ');
    setGeneratedPrompt(prompt);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast.success("Prompt copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Free AI Video Prompt Generator</h1>
          <p className="text-muted-foreground">
            {isAuthenticated 
              ? `Daily Limit: ${getRemainingCount('video')} prompts remaining today`
              : 'Daily Limit: 4 prompts per user per day'
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
                  label="Core Scene & Narrative"
                  helperText="Describe the main action and story of your video"
                >
                  <Textarea
                    value={coreScene}
                    onChange={(e) => setCoreScene(e.target.value)}
                    placeholder="e.g., A majestic dragon majestically soars over a futuristic city as the sun sets, searching for its hidden lair."
                    className="min-h-[100px]"
                  />
                </FormField>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="visual-style">
                    <AccordionTrigger>Visual Style & Mood</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <FormField
                        label="Visual Style"
                        helperText="Sets the fundamental look of your video."
                      >
                        <Select value={visualStyle} onValueChange={setVisualStyle}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visual style" />
                          </SelectTrigger>
                          <SelectContent>
                            {visualStyleOptions.map(style => (
                              <SelectItem key={style} value={style}>{style}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField
                        label="Lighting & Mood"
                        helperText="Define the emotional tone and lighting conditions."
                      >
                        <Select value={lightingMood} onValueChange={setLightingMood}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select lighting & mood" />
                          </SelectTrigger>
                          <SelectContent>
                            {lightingMoodOptions.map(mood => (
                              <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField
                        label="Color Palette"
                        helperText="Control the dominant colors to enhance the mood."
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

                  <AccordionItem value="cinematography">
                    <AccordionTrigger>Cinematography</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <FormField
                        label="Camera Perspective"
                        helperText="The vantage point of the camera."
                      >
                        <Select value={cameraPerspective} onValueChange={setCameraPerspective}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select camera perspective" />
                          </SelectTrigger>
                          <SelectContent>
                            {cameraPerspectiveOptions.map(perspective => (
                              <SelectItem key={perspective} value={perspective}>{perspective}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField
                        label="Camera Movement"
                        helperText="Add motion to your scene for a dynamic result."
                      >
                        <Select value={cameraMovement} onValueChange={setCameraMovement}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select camera movement" />
                          </SelectTrigger>
                          <SelectContent>
                            {cameraMovementOptions.map(movement => (
                              <SelectItem key={movement} value={movement}>{movement}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField
                        label="Lens & Shot Type"
                        helperText="Simulate different camera lenses to control the field of view."
                      >
                        <Select value={lensShot} onValueChange={setLensShot}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select lens & shot type" />
                          </SelectTrigger>
                          <SelectContent>
                            {lensShotOptions.map(lens => (
                              <SelectItem key={lens} value={lens}>{lens}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="scene-action">
                    <AccordionTrigger>Scene & Action Details</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <FormField
                        label="Key Subject(s)"
                        helperText="The main character(s) or object(s) in the scene."
                      >
                        <Input
                          value={keySubjects}
                          onChange={(e) => setKeySubjects(e.target.value)}
                          placeholder="e.g., a female astronaut, a robotic dog"
                        />
                      </FormField>

                      <FormField
                        label="Core Action"
                        helperText="Describe the primary action the subject is performing."
                      >
                        <Input
                          value={coreAction}
                          onChange={(e) => setCoreAction(e.target.value)}
                          placeholder="e.g., planting a flag on Mars, chasing a glowing butterfly"
                        />
                      </FormField>

                      <FormField
                        label="Pace / Speed"
                        helperText="Control the speed of the action in the video."
                      >
                        <Select value={paceSpeed} onValueChange={setPaceSpeed}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select pace/speed" />
                          </SelectTrigger>
                          <SelectContent>
                            {paceSpeedOptions.map(pace => (
                              <SelectItem key={pace} value={pace}>{pace}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button 
                  onClick={generatePrompt} 
                  size="lg" 
                  className="w-full"
                  disabled={!coreScene}
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
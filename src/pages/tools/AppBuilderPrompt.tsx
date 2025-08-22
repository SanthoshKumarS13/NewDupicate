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

const modelOptions = ["Replit AI", "Bolt", "Lovable"];
const brandPersonalityOptions = ["Professional & Sleek", "Playful & Creative", "Minimalist & Modern", "Friendly & Welcoming"];
const fontOptions = ["Inter", "Poppins", "Roboto", "Lato", "Montserrat", "Open Sans", "Source Sans Pro"];

export const AppBuilderPrompt: React.FC = () => {
  const { checkAndDecrementLimit, getRemainingCount, isAuthenticated } = usePromptLimits();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedModel, setSelectedModel] = useState("");
  const [projectGoal, setProjectGoal] = useState("");
  const [projectName, setProjectName] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [brandPersonality, setBrandPersonality] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [secondaryColor, setSecondaryColor] = useState("#F59E0B");
  const [headingFont, setHeadingFont] = useState("");
  const [bodyFont, setBodyFont] = useState("");
  const [headline, setHeadline] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [ctaButtonText, setCtaButtonText] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
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
    const canGenerate = await checkAndDecrementLimit('app');
    if (!canGenerate) {
      return; // Stop if the user has no prompts left or an error occurred.
    }

    // Step 3: If checks pass, proceed with generating the structured Markdown prompt.
    let prompt = `**Task:**\n${projectGoal}\n\n`;

    if (projectName || targetAudience || brandPersonality) {
      prompt += `**Project Foundation:**\n`;
      if (projectName) prompt += `*   **Project Name:** ${projectName}\n`;
      if (targetAudience) prompt += `*   **Target Audience:** ${targetAudience}\n`;
      if (brandPersonality) prompt += `*   **Brand Personality:** ${brandPersonality}\n`;
      prompt += `\n`;
    }

    prompt += `**Design System:**\n`;
    prompt += `*   **Primary Color:** ${primaryColor}\n`;
    prompt += `*   **Secondary Color:** ${secondaryColor}\n`;
    if (headingFont) prompt += `*   **Heading Font:** ${headingFont}\n`;
    if (bodyFont) prompt += `*   **Body Font:** ${bodyFont}\n`;
    prompt += `\n`;

    if (headline || bodyText || ctaButtonText || features.length > 0) {
      prompt += `**Content & Components:**\n`;
      if (headline) prompt += `*   **Headline:** "${headline}"\n`;
      if (bodyText) prompt += `*   **Body Text:** "${bodyText}"\n`;
      if (ctaButtonText) prompt += `*   **Call-to-Action Text:** "${ctaButtonText}"\n`;
      if (features.length > 0) {
        prompt += `*   **Features/Items List:**\n`;
        features.forEach(feature => {
          prompt += `    *   ${feature}\n`;
        });
      }
    }

    setGeneratedPrompt(prompt.trim());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast.success("Prompt copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Free AI App Builder Prompt Generator</h1>
          <p className="text-muted-foreground">
            {isAuthenticated 
              ? `Daily Limit: ${getRemainingCount('app')} prompts remaining today`
              : 'Daily Limit: 3 prompts per user per day'
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
                  label="What do you want to build?"
                  helperText="Describe your project goal clearly"
                >
                  <Textarea
                    value={projectGoal}
                    onChange={(e) => setProjectGoal(e.target.value)}
                    placeholder="e.g., A homepage for a coffee shop, a portfolio gallery component, a three-tier pricing table."
                    className="min-h-[100px]"
                  />
                </FormField>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="project-foundation">
                    <AccordionTrigger>Project Foundation</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <FormField
                        label="Project Name"
                        helperText="The name of your project, used in headlines and titles."
                      >
                        <Input
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          placeholder="e.g., 'Cozy Corner Cafe'"
                        />
                      </FormField>

                      <FormField
                        label="Target Audience"
                        helperText="Describe who this is for so the AI can adjust its tone and complexity."
                      >
                        <Textarea
                          value={targetAudience}
                          onChange={(e) => setTargetAudience(e.target.value)}
                          placeholder="e.g., Local residents and students, tech-savvy developers, small business owners."
                          className="min-h-[80px]"
                        />
                      </FormField>

                      <FormField
                        label="Brand Personality"
                        helperText="This influences the AI's choice of colors, fonts, and language."
                      >
                        <Select value={brandPersonality} onValueChange={setBrandPersonality}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select brand personality" />
                          </SelectTrigger>
                          <SelectContent>
                            {brandPersonalityOptions.map(personality => (
                              <SelectItem key={personality} value={personality}>{personality}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="design-system">
                    <AccordionTrigger>Design System</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <FormField
                        label="Primary Color"
                        helperText="The main color for buttons and important links."
                      >
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="w-12 h-10 border border-input rounded-md"
                          />
                          <Input
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            placeholder="#3B82F6"
                            className="flex-1"
                          />
                        </div>
                      </FormField>

                      <FormField
                        label="Secondary / Accent Color"
                        helperText="A second color for highlights or special call-to-action buttons."
                      >
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="w-12 h-10 border border-input rounded-md"
                          />
                          <Input
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            placeholder="#F59E0B"
                            className="flex-1"
                          />
                        </div>
                      </FormField>

                      <FormField
                        label="Heading Font"
                      >
                        <Select value={headingFont} onValueChange={setHeadingFont}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select heading font" />
                          </SelectTrigger>
                          <SelectContent>
                            {fontOptions.map(font => (
                              <SelectItem key={font} value={font}>{font}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField
                        label="Body Font"
                      >
                        <Select value={bodyFont} onValueChange={setBodyFont}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select body font" />
                          </SelectTrigger>
                          <SelectContent>
                            {fontOptions.map(font => (
                              <SelectItem key={font} value={font}>{font}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="content-components">
                    <AccordionTrigger>Content & Components</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <FormField
                        label="Headline / H1 Text"
                      >
                        <Input
                          value={headline}
                          onChange={(e) => setHeadline(e.target.value)}
                          placeholder="e.g., Your Daily Dose of Delicious"
                        />
                      </FormField>

                      <FormField
                        label="Key Paragraph / Body Text"
                      >
                        <Textarea
                          value={bodyText}
                          onChange={(e) => setBodyText(e.target.value)}
                          placeholder="e.g., Hand-roasted, ethically sourced coffee made with love..."
                          className="min-h-[80px]"
                        />
                      </FormField>

                      <FormField
                        label="Call-to-Action Button Text"
                      >
                        <Input
                          value={ctaButtonText}
                          onChange={(e) => setCtaButtonText(e.target.value)}
                          placeholder="e.g., View Our Menu"
                        />
                      </FormField>

                      <FormField
                        label="List of Features/Items"
                        helperText="For creating feature lists, pricing tiers, or navigation links."
                      >
                        <TagInput
                          value={features}
                          onChange={setFeatures}
                          placeholder="e.g., 'Ethically Sourced Beans', 'Free Wi-Fi', 'Cozy Ambiance'"
                        />
                      </FormField>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button 
                  onClick={generatePrompt} 
                  size="lg" 
                  className="w-full"
                  disabled={!projectGoal}
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
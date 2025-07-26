import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';

interface PromptCanvasProps {
  prompt: string;
  onCopy: () => void;
  onDownload?: () => void;
}

export const PromptCanvas: React.FC<PromptCanvasProps> = ({
  prompt,
  onCopy,
  onDownload
}) => {
  return (
    <Card className="h-fit sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg">Generated Prompt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-lg min-h-[200px]">
          {prompt ? (
            <p className="text-sm leading-relaxed">{prompt}</p>
          ) : (
            <p className="text-muted-foreground text-sm italic">
              Your generated prompt will appear here...
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={onCopy} 
            variant="outline" 
            size="sm" 
            className="flex-1"
            disabled={!prompt}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          {onDownload && (
            <Button 
              onClick={onDownload} 
              variant="outline" 
              size="sm"
              disabled={!prompt}
            >
              <Download className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
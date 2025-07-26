import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  value,
  onChange,
  options
}) => {
  return (
    <div className="mb-6">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select AI Model" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
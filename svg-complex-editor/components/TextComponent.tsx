"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Type } from "lucide-react";
import { useState } from "react";

interface TextComponentProps {
  onSelect: (properties: any) => void;
  isSelected?: boolean;
}

const TextComponent = ({ onSelect, isSelected }: TextComponentProps) => {
  const [textFont, setTextFont] = useState('Arial');
  const [textContent, setTextContent] = useState('Название зоны');
  const [textColor, setTextColor] = useState('#000000');

  const handlePropertyChange = () => {
    onSelect({
      font: textFont,
      content: textContent,
      color: textColor
    });
  };

  return (
    <Card role="region" aria-labelledby="text-component-title" className="gap-0 p-2">
      <CardHeader className="p-2 pb-1" id="text-component-title">
        <CardTitle className="text-sm flex items-center gap-2">
          <Type className="h-4 w-4" />
          Text
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 space-y-3">
        {/* Text Preview */}
        <div className="p-2 bg-muted rounded-md text-center" aria-label="Text preview">
          <p 
            style={{ 
              fontSize: `16px`, 
              fontFamily: textFont,
              color: textColor
            }}
            className="truncate text-sm"
            aria-live="polite"
          >
            {textContent}
          </p>
        </div>

        {/* Text Content */}
        <div>
          <Label htmlFor="text-content-input" className="text-xs">Текст</Label>
          <Input
            id="text-content-input"
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            className="text-xs mt-1 h-8"
            placeholder="Enter text"
            aria-label="Text content input"
          />
        </div>

        {/* Font Family */}
        <div>
          <Label htmlFor="text-font-family-select" className="text-xs">Шрифт</Label>
          <Select 
            value={textFont} 
            onValueChange={setTextFont}
          >
            <SelectTrigger className="w-full h-8 text-xs select-none mt-[4px]" aria-label="Выбор шрифта" id="text-font-family-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Helvetica">Helvetica</SelectItem>
              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
              <SelectItem value="Georgia">Georgia</SelectItem>
              <SelectItem value="Verdana">Verdana</SelectItem>
              <SelectItem value="Courier New">Courier New</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Text Color */}
        <div>
          <Label htmlFor="text-color-input" className="text-xs">Цвет текста</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="color"
              id="text-color-input"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-16 h-8 p-1"
              aria-label="Text color picker"
            />
            <Input
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="text-xs flex-1 h-8"
              placeholder="#000000"
              aria-label="Text color hex value"
            />
          </div>
        </div>

        {/* Text Selection Button */}
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className="h-9 flex flex-col items-center justify-center"
          onClick={handlePropertyChange}
          role="radio"
          aria-checked={!!isSelected}
          aria-label="Select text component"
        >
          Выбрать
        </Button>
      </CardContent>
    </Card>
  );
};

export default TextComponent;
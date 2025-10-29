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
}

const TextComponent = ({ onSelect }: TextComponentProps) => {
  const [textSize, setTextSize] = useState(16);
  const [textFont, setTextFont] = useState('Arial');
  const [textContent, setTextContent] = useState('Sample Text');
  const [textColor, setTextColor] = useState('#000000');

  const handlePropertyChange = () => {
    onSelect({
      size: textSize,
      font: textFont,
      content: textContent,
      color: textColor
    });
  };

  return (
    <Card role="region" aria-labelledby="text-component-title">
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
              fontSize: `${textSize}px`, 
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
          <Label htmlFor="text-content-input" className="text-xs">Text Content</Label>
          <Input
            id="text-content-input"
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            className="text-xs mt-1"
            placeholder="Enter text"
            onInput={handlePropertyChange}
            aria-label="Text content input"
          />
        </div>

        {/* Text Size */}
        <div>
          <Label htmlFor="text-size-slider" className="text-xs">Font Size: {textSize}px</Label>
          <Slider
            id="text-size-slider"
            min={8}
            max={72}
            step={1}
            value={[textSize]}
            onValueChange={(value) => setTextSize(value[0])}
            onValueCommit={handlePropertyChange}
            className="mt-1.5"
            aria-valuetext={`Font size: ${textSize}px`}
          />
        </div>

        {/* Font Family */}
        <div>
          <Label className="text-xs">Font Family</Label>
          <Select 
            value={textFont} 
            onValueChange={(value) => {
              setTextFont(value);
              handlePropertyChange();
            }}
          >
            <SelectTrigger className="w-full h-7 text-xs" aria-label="Font family selection">
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
          <Label htmlFor="text-color-input" className="text-xs">Text Color</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="color"
              id="text-color-input"
              value={textColor}
              onChange={(e) => {
                setTextColor(e.target.value);
                handlePropertyChange();
              }}
              className="w-16 h-7 p-1"
              aria-label="Text color picker"
            />
            <Input
              value={textColor}
              onChange={(e) => {
                setTextColor(e.target.value);
                handlePropertyChange();
              }}
              className="text-xs flex-1"
              placeholder="#000000"
              aria-label="Text color hex value"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextComponent;
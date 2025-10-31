"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Square,
  Circle,
  Settings
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ZoneComponentProps {
  onSelect: (type: string, properties: any) => void;
  isSelected?: boolean;
}

const ZoneComponent = ({ onSelect, isSelected }: ZoneComponentProps) => {
  const [zoneType, setZoneType] = useState<'polygon' | 'ellipse'>('polygon');
  const [sides, setSides] = useState(4);
  const [sidesString, setSidesString] = useState('4'); // Track the input value as string
  const [zoneText, setZoneText] = useState('Zone');
  const [borderColor, setBorderColor] = useState('#228B22'); // Default green for zone border
  const [fillColor, setFillColor] = useState('none'); // Default no fill

  // Refs to track current values to avoid closure issues
  const borderColorRef = useRef(borderColor);
  const fillColorRef = useRef(fillColor);
  const zoneTextRef = useRef(zoneText);

  // Update refs when state changes
  useEffect(() => {
    borderColorRef.current = borderColor;
  }, [borderColor]);

  useEffect(() => {
    fillColorRef.current = fillColor;
  }, [fillColor]);

  useEffect(() => {
    zoneTextRef.current = zoneText;
  }, [zoneText]);

  // Initialize sidesString when component mounts
  useEffect(() => {
    setSidesString(sides.toString());
  }, []);

  // Function to check if input is valid
  const isInputValid = (): boolean => {
    if (sidesString === '') return true; // Empty is allowed during typing

    // Check if it's a valid integer
    if (!/^\d+$/.test(sidesString)) return false;

    const value = parseInt(sidesString);
    return value >= 3 && value <= 100;
  };

  const handleZoneTypeSelect = (type: 'polygon' | 'ellipse') => {
    setZoneType(type);
    onSelect(type, {
      type,
      sides: type === 'polygon' ? (sidesString !== '' ? parseInt(sidesString) || 4 : 4) : undefined,
      text: zoneTextRef.current,
      borderColor: borderColorRef.current,
      fillColor: fillColorRef.current,
    });
  };

  const handlePropertyChange = () => {
    const validSides = sidesString !== '' ? parseInt(sidesString) || 4 : 4;
    onSelect(zoneType, {
      type: zoneType,
      sides: zoneType === 'polygon' ? validSides : undefined,
      text: zoneTextRef.current,
      borderColor: borderColorRef.current,
      fillColor: fillColorRef.current,
    });
    console.log(`zone property changed; border color = ${borderColorRef.current}`)
  };

  return (
    <Card role="region" aria-labelledby="zone-component-title" className="gap-0 p-2">
      <CardHeader className="p-2 pb-1" id="zone-component-title">
        <CardTitle className="text-sm flex items-center gap-2">
          <Square className="h-4 w-4" />
          Зоны
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 space-y-3">
        {/* Zone Type Selection */}
        <div>
          <h4 className="text-xs font-medium mb-1">Тип зоны</h4>
          <div
            className="grid grid-cols-2 gap-2"
            role="radiogroup"
            aria-label="Zone shape selection"
          >
            <Button
              variant={zoneType === 'polygon' ? 'secondary' : 'outline'}
              size="sm"
              className="h-9"
              onClick={() => handleZoneTypeSelect('polygon')}
              role="radio"
              aria-checked={zoneType === 'polygon'}
              aria-label="Polygon zone"
            >
              <Square className="h-4 w-4 mr-2" aria-hidden="true" />
              Полигон
            </Button>
            <Button
              variant={zoneType === 'ellipse' ? 'secondary' : 'outline'}
              size="sm"
              className="h-9"
              onClick={() => handleZoneTypeSelect('ellipse')}
              role="radio"
              aria-checked={zoneType === 'ellipse'}
              aria-label="Ellipse zone"
            >
              <Circle className="h-4 w-4 mr-2" aria-hidden="true" />
              Эллипс
            </Button>
          </div>
        </div>

        {/* Polygon Sides */}
        {zoneType === 'polygon' && (
          <div>
            <Label htmlFor="sides-input" className={`text-xs ${!isInputValid() ? 'text-red-500' : ''}`}>Количество вершин: {sidesString !== '' && /^\d+$/.test(sidesString) ? parseInt(sidesString) : sides} (3-100)</Label>
            <Input
              id="sides-input"
              type="number"
              min={3}
              max={100}
              value={sidesString}
              onChange={(e) => {
                const value = e.target.value;
                setSidesString(value);

                // Check if the value is a valid integer between 3 and 100
                if (value !== '') {
                  const numValue = parseInt(value);
                  if (!isNaN(numValue) && numValue >= 3 && numValue <= 100) {
                    setSides(numValue);
                    handlePropertyChange();
                  }
                }
              }}
              onBlur={(e) => {
                let value = e.target.value;
                if (value === '') {
                  // If field is empty on blur, set to minimum value
                  value = '3';
                  setSidesString(value);
                  setSides(3);
                } else {
                  const numValue = parseInt(value);
                  if (isNaN(numValue) || numValue < 3 || numValue > 100) {
                    // Invalid value, reset to a valid default
                    const correctedValue = Math.max(3, Math.min(100, parseInt(value) || 3));
                    value = correctedValue.toString();
                    setSidesString(value);
                    setSides(correctedValue);
                  } else {
                    // Valid value, but make sure it's properly formatted
                    setSidesString(numValue.toString());
                  }
                }
                // Call handlePropertyChange with the corrected value
                handlePropertyChange();
              }}
              className={`text-xs mt-1.5 h-8 ${!isInputValid() ? 'border-red-500' : 'border-input'} ${!isInputValid() ? 'text-red-500' : ""}`}
            />
          </div>
        )}


        {/* Zone Text */}
        <div>
          <Label htmlFor="zone-text-input" className="text-xs">Название зоны</Label>
          <Input
            id="zone-text-input"
            value={zoneText}
            onChange={(e) => setZoneText(e.target.value)}
            className="text-xs mt-1 h-8"
            placeholder="Enter zone name"
            onInput={handlePropertyChange}
            aria-label="Zone label text"
          />
        </div>

        {/* Border Color */}
        <div>
          <Label htmlFor="border-color-input" className="text-xs">Цвет контура</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="color"
              id="border-color-input"
              value={borderColor}
              onChange={(e) => {
                setBorderColor(e.target.value);
                borderColorRef.current = e.target.value;
                console.log(`border color 1: ${borderColor}`);
                handlePropertyChange();
              }}
              className="w-16 h-8 p-1"
              aria-label="Border color picker"
            />
            <Input
              value={borderColor}
              onChange={(e) => {
                setBorderColor(e.target.value);
                borderColorRef.current = e.target.value;
                console.log(`border color 2: ${borderColor}`);
                handlePropertyChange();
              }}
              className="text-xs flex-1 h-8"
              placeholder="#000000"
              aria-label="Border color hex value"
            />
          </div>
        </div>

        {/* Fill Color */}
        <div>
          <Label htmlFor="fill-color-input" className="text-xs">Цвет заливки</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="color"
              id="fill-color-input"
              value={fillColor}
              onChange={(e) => {
                const newFillColor = e.target.value === '#00000000' ? 'none' : e.target.value;
                setFillColor(newFillColor); 
                fillColorRef.current = newFillColor;
                handlePropertyChange();
              }}
              className="w-16 h-8 p-1"
              aria-label="Fill color picker"
            />
            <Input
              value={fillColor}
              onChange={(e) => {
                const newFillColor = e.target.value === '#00000000' ? 'none' : e.target.value;
                setFillColor(newFillColor); 
                fillColorRef.current = newFillColor;
                handlePropertyChange();
              }}
              className="text-xs flex-1 h-8"
              placeholder="none"
              aria-label="Fill color hex value"
            />
          </div>
        </div>
        
        {/* Zone Selection Button */}
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className="h-9 flex flex-col items-center justify-center"
          onClick={() => handlePropertyChange()}
          role="radio"
          aria-checked={!!isSelected}
          aria-label="Select zone component"
        >
          Выбрать
        </Button>
      </CardContent>
    </Card>
  );
};

export default ZoneComponent;
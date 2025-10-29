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
import { useState } from "react";

interface ZoneComponentProps {
  onSelect: (type: string, properties: any) => void;
}

const ZoneComponent = ({ onSelect }: ZoneComponentProps) => {
  const [zoneType, setZoneType] = useState<'polygon' | 'ellipse'>('polygon');
  const [sides, setSides] = useState(4);
  const [zoneText, setZoneText] = useState('Zone');

  const handleZoneTypeSelect = (type: 'polygon' | 'ellipse') => {
    setZoneType(type);
    onSelect(type, {
      type,
      sides: type === 'polygon' ? sides : undefined,
      text: zoneText,
    });
  };

  const handlePropertyChange = () => {
    onSelect(zoneType, {
      type: zoneType,
      sides: zoneType === 'polygon' ? sides : undefined,
      text: zoneText,
    });
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
              Polygon
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
              Ellipse
            </Button>
          </div>
        </div>

        {/* Polygon Sides */}
        {zoneType === 'polygon' && (
          <div>
            <Label htmlFor="sides-slider" className="text-xs">Number of Sides: {sides} (3-100)</Label>
            <Slider
              id="sides-slider"
              min={3}
              max={100}
              step={1}
              value={[sides]}
              onValueChange={(value) => setSides(value[0])}
              className="mt-1.5"
              onValueCommit={handlePropertyChange}
              aria-valuetext={`Number of sides: ${sides}`}
            />
          </div>
        )}


        {/* Zone Text */}
        <div>
          <Label htmlFor="zone-text-input" className="text-xs">Zone Label</Label>
          <Input
            id="zone-text-input"
            value={zoneText}
            onChange={(e) => setZoneText(e.target.value)}
            className="text-xs mt-1"
            placeholder="Enter zone name"
            onInput={handlePropertyChange}
            aria-label="Zone label text"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoneComponent;
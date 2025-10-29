"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Square,
  Circle,
  Settings,
  Plus,
  Minus
} from "lucide-react";
import { useState } from "react";

interface WallComponentProps {
  onSelect: (type: string, properties: any) => void;
}

const WallComponent = ({ onSelect }: WallComponentProps) => {
  const [wallWidth, setWallWidth] = useState(10);
  const [wallLength, setWallLength] = useState(100);
  const [wallRadius, setWallRadius] = useState(50);
  const [curveSegments, setCurveSegments] = useState(10);

  const handleWallTypeSelect = (type: string) => {
    const properties = 
      type === 'line' 
        ? { width: wallWidth, length: wallLength } 
        : { width: wallWidth, radius: wallRadius, segments: curveSegments };
    
    onSelect(type, properties);
  };

  return (
    <Card role="region" aria-labelledby="wall-component-title">
      <CardHeader className="p-3" id="wall-component-title">
        <CardTitle className="text-sm flex items-center gap-2">
          <Square className="h-4 w-4" />
          Walls
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 space-y-4">
        {/* Wall Type Selection */}
        <div>
          <h4 className="text-xs font-medium mb-2">Wall Type</h4>
          <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Wall type selection">
            <Button
              variant="outline"
              size="sm"
              className="h-10 flex flex-col items-center justify-center"
              onClick={() => handleWallTypeSelect('line')}
              role="radio"
              aria-checked={false}
              aria-label="Line wall"
            >
              <Square className="h-4 w-4 mb-1" aria-hidden="true" />
              <span className="text-xs">Line</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-10 flex flex-col items-center justify-center"
              onClick={() => handleWallTypeSelect('curve')}
              role="radio"
              aria-checked={false}
              aria-label="Curve wall"
            >
              <Circle className="h-4 w-4 mb-1" aria-hidden="true" />
              <span className="text-xs">Curve</span>
            </Button>
          </div>
        </div>

        {/* Wall Width */}
        <div>
          <Label htmlFor="wall-width-slider" className="text-xs">Wall Width: {wallWidth}px</Label>
          <Slider
            id="wall-width-slider"
            min={1}
            max={50}
            step={1}
            value={[wallWidth]}
            onValueChange={(value) => setWallWidth(value[0])}
            className="mt-2"
            aria-valuetext={`Wall width: ${wallWidth}px`}
          />
        </div>

        {/* Line Wall Properties */}
        <div className="space-y-2">
          <Label htmlFor="wall-length-slider" className="text-xs">Line Length: {wallLength}px</Label>
          <Slider
            id="wall-length-slider"
            min={10}
            max={500}
            step={5}
            value={[wallLength]}
            onValueChange={(value) => setWallLength(value[0])}
            aria-valuetext={`Line length: ${wallLength}px`}
          />
        </div>

        {/* Curve Wall Properties */}
        <div className="space-y-2">
          <Label htmlFor="curve-radius-slider" className="text-xs">Curve Radius: {wallRadius}px</Label>
          <Slider
            id="curve-radius-slider"
            min={10}
            max={200}
            step={5}
            value={[wallRadius]}
            onValueChange={(value) => setWallRadius(value[0])}
            aria-valuetext={`Curve radius: ${wallRadius}px`}
          />
          <Label htmlFor="curve-segments-slider" className="text-xs">Curve Segments: {curveSegments}</Label>
          <Slider
            id="curve-segments-slider"
            min={3}
            max={50}
            step={1}
            value={[curveSegments]}
            onValueChange={(value) => setCurveSegments(value[0])}
            aria-valuetext={`Curve segments: ${curveSegments}`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WallComponent;
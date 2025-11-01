"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

interface CanvasElement {
  id: string;
  type: string;
  zoneProperties?: any;
  properties?: any;
  x?: number;
  y?: number;
}

interface PropertyPanelProps {
  selectedElement: CanvasElement | null;
  onPropertiesChange: (id: string, properties: any) => void;
  onClose: () => void;
}

const PropertyPanel = ({ selectedElement, onPropertiesChange, onClose }: PropertyPanelProps) => {
  if (!selectedElement) {
    return null; // Don't render anything when no element is selected
  }

  // Initialize properties based on the element's stored properties and zoneProperties
  const [properties, setProperties] = useState<any>(() => {
    // Combine zoneProperties and properties for a complete view
    return {
      ...(selectedElement.zoneProperties || {}),
      ...(selectedElement.properties || {})
    };
  });

  useEffect(() => {
    // Update properties when selected element changes
    setProperties({
      ...(selectedElement.zoneProperties || {}),
      ...(selectedElement.properties || {})
    });
  }, [selectedElement]);

  const handlePropertyChange = (key: string, value: any) => {
    const newProperties = { ...properties, [key]: value };
    setProperties(newProperties);
    onPropertiesChange(selectedElement.id, newProperties);
  };

  const renderPropertiesForType = () => {
    switch (selectedElement.type) {
      case 'wall':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="wall-stroke">Border Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="wall-stroke"
                  type="color"
                  value={properties.borderColor || '#8B4513'}
                  onChange={(e) => handlePropertyChange('borderColor', e.target.value)}
                  className="w-16 h-8 p-1"
                />
                <Input
                  value={properties.borderColor || '#8B4513'}
                  onChange={(e) => handlePropertyChange('borderColor', e.target.value)}
                  className="text-xs flex-1 h-8"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="wall-stroke-width">Border Width</Label>
              <Slider
                id="wall-stroke-width"
                min={1}
                max={10}
                step={0.5}
                value={[properties.borderWidth || 2]}
                onValueChange={(value) => handlePropertyChange('borderWidth', value[0])}
                className="mt-1"
              />
              <div className="text-xs text-gray-500 mt-1">
                Current: {properties.borderWidth || 2}px
              </div>
            </div>
          </div>
        );
      
      case 'zone':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="zone-type">Zone Type</Label>
              <Select 
                value={properties.type || 'ellipse'} 
                onValueChange={(value) => handlePropertyChange('type', value)}
              >
                <SelectTrigger id="zone-type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ellipse">Ellipse</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {properties.type === 'polygon' && (
              <div>
                <Label htmlFor="zone-sides">Number of Sides</Label>
                <Slider
                  id="zone-sides"
                  min={3}
                  max={50}
                  value={[properties.sides || 4]}
                  onValueChange={(value) => handlePropertyChange('sides', value[0])}
                  className="mt-1"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Current: {properties.sides || 4}
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="zone-fill">Fill Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="zone-fill"
                  type="color"
                  value={properties.fillColor || '#00000000'} // Using transparent color as 'none'
                  onChange={(e) => {
                    const value = e.target.value === '#00000000' ? 'none' : e.target.value;
                    handlePropertyChange('fillColor', value);
                  }}
                  className="w-16 h-8 p-1"
                />
                <Input
                  value={properties.fillColor || 'none'}
                  onChange={(e) => {
                    const value = e.target.value === 'none' ? 'none' : e.target.value;
                    handlePropertyChange('fillColor', value);
                  }}
                  className="text-xs flex-1 h-8"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="zone-border">Border Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="zone-border"
                  type="color"
                  value={properties.borderColor || '#228B22'}
                  onChange={(e) => handlePropertyChange('borderColor', e.target.value)}
                  className="w-16 h-8 p-1"
                />
                <Input
                  value={properties.borderColor || '#228B22'}
                  onChange={(e) => handlePropertyChange('borderColor', e.target.value)}
                  className="text-xs flex-1 h-8"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="zone-stroke-width">Border Width</Label>
              <Slider
                id="zone-stroke-width"
                min={1}
                max={10}
                step={0.5}
                value={[properties.borderWidth || 2]}
                onValueChange={(value) => handlePropertyChange('borderWidth', value[0])}
                className="mt-1"
              />
              <div className="text-xs text-gray-500 mt-1">
                Current: {properties.borderWidth || 2}px
              </div>
            </div>

            <div>
              <Label htmlFor="zone-text">Zone Text</Label>
              <Input
                id="zone-text"
                value={properties.text || 'Zone'}
                onChange={(e) => handlePropertyChange('text', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-content">Text Content</Label>
              <Input
                id="text-content"
                value={properties.text || 'Sample Text'}
                onChange={(e) => handlePropertyChange('text', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="text-color">Text Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="text-color"
                  type="color"
                  value={properties.textColor || properties.fillColor || '#000000'}
                  onChange={(e) => handlePropertyChange('textColor', e.target.value)}
                  className="w-16 h-8 p-1"
                />
                <Input
                  value={properties.textColor || properties.fillColor || '#000000'}
                  onChange={(e) => handlePropertyChange('textColor', e.target.value)}
                  className="text-xs flex-1 h-8"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="text-size">Font Size</Label>
              <Slider
                id="text-size"
                min={8}
                max={72}
                value={[properties.fontSize || properties.size || 16]}
                onValueChange={(value) => handlePropertyChange('fontSize', value[0])}
                className="mt-1"
              />
              <div className="text-xs text-gray-500 mt-1">
                Current: {properties.fontSize || properties.size || 16}px
              </div>
            </div>
          </div>
        );

      case 'icon':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="icon-fill">Fill Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="icon-fill"
                  type="color"
                  value={properties.fillColor || '#FFD700'}
                  onChange={(e) => handlePropertyChange('fillColor', e.target.value)}
                  className="w-16 h-8 p-1"
                />
                <Input
                  value={properties.fillColor || '#FFD700'}
                  onChange={(e) => handlePropertyChange('fillColor', e.target.value)}
                  className="text-xs flex-1 h-8"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="icon-border">Border Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="icon-border"
                  type="color"
                  value={properties.borderColor || '#000000'}
                  onChange={(e) => handlePropertyChange('borderColor', e.target.value)}
                  className="w-16 h-8 p-1"
                />
                <Input
                  value={properties.borderColor || '#000000'}
                  onChange={(e) => handlePropertyChange('borderColor', e.target.value)}
                  className="text-xs flex-1 h-8"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="icon-stroke-width">Border Width</Label>
              <Slider
                id="icon-stroke-width"
                min={1}
                max={10}
                step={0.5}
                value={[properties.borderWidth || 2]}
                onValueChange={(value) => handlePropertyChange('borderWidth', value[0])}
                className="mt-1"
              />
              <div className="text-xs text-gray-500 mt-1">
                Current: {properties.borderWidth || 2}px
              </div>
            </div>
          </div>
        );

      case 'background':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bg-fill">Fill Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="bg-fill"
                  type="color"
                  value={properties.fillColor || '#f0f0f0'}
                  onChange={(e) => handlePropertyChange('fillColor', e.target.value)}
                  className="w-16 h-8 p-1"
                />
                <Input
                  value={properties.fillColor || '#f0f0f0'}
                  onChange={(e) => handlePropertyChange('fillColor', e.target.value)}
                  className="text-xs flex-1 h-8"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bg-opacity">Opacity</Label>
              <Slider
                id="bg-opacity"
                min={0}
                max={1}
                step={0.1}
                value={[properties.opacity !== undefined ? properties.opacity : 0.5]}
                onValueChange={(value) => handlePropertyChange('opacity', value[0])}
                className="mt-1"
              />
              <div className="text-xs text-gray-500 mt-1">
                Current: {Math.round(((properties.opacity !== undefined ? properties.opacity : 0.5)) * 100)}%
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-500">
            Properties for this element type are not yet supported
          </div>
        );
    }
  };

  return (
    <Card className="w-64 absolute top-4 right-4 z-10 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm select-none">Properties</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            aria-label="Close properties panel"
          >
            ✕
          </Button>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-xs font-medium text-gray-500 truncate">
          Element ID: {selectedElement.id}
        </div>
        <div className="text-xs text-gray-500 capitalize">
          Type: {selectedElement.type}
        </div>
        {renderPropertiesForType()}
      </CardContent>
    </Card>
  );
};

export default PropertyPanel;
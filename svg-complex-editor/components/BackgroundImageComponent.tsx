"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  RotateCw, 
  ZoomIn, 
  ZoomOut 
} from "lucide-react";
import { useState, useRef } from "react";

interface BackgroundImageComponentProps {
  onSelect: (properties: any) => void;
}

interface BackgroundImage {
  id: string;
  name: string;
  url: string;
  scale: number;
  rotation: number;
  opacity: number;
}

const BackgroundImageComponent = ({ onSelect }: BackgroundImageComponentProps) => {
  const [images, setImages] = useState<BackgroundImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage: BackgroundImage = {
          id: `bg-${Date.now()}`,
          name: file.name,
          url: event.target?.result as string,
          scale: 1,
          rotation: 0,
          opacity: 1
        };
        setImages([...images, newImage]);
        setSelectedImage(newImage.id);
        onSelect(newImage);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
    if (selectedImage === id) {
      setSelectedImage(null);
    }
  };

  const handleImagePropertyChange = (id: string, property: keyof BackgroundImage, value: any) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, [property]: value } : img
    ));
    
    if (selectedImage === id) {
      const updatedImage = images.find(img => img.id === id);
      if (updatedImage) {
        onSelect({ ...updatedImage, [property]: value });
      }
    }
  };

  const selectedImg = images.find(img => img.id === selectedImage);

  return (
    <Card role="region" aria-labelledby="bg-image-component-title">
      <CardHeader className="p-3" id="bg-image-component-title">
        <CardTitle className="text-sm flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          Background Images
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 space-y-4">
        {/* Upload Button */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload background image"
        >
          <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
          Upload Background Image
        </Button>
        <Input
          type="file"
          ref={fileInputRef}
          id="bg-image-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileUpload}
          aria-label="Background image upload"
        />

        {/* Image List */}
        <div>
          <Label htmlFor="bg-image-list" className="text-xs">Uploaded Images</Label>
          <ScrollArea 
            id="bg-image-list"
            className="h-32 mt-2 border rounded-md"
            aria-label="List of uploaded background images"
          >
            <div className="p-2">
              {images.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">No images uploaded</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {images.map((img) => (
                    <div 
                      key={img.id} 
                      className={`border rounded p-2 cursor-pointer flex flex-col items-center ${
                        selectedImage === img.id ? 'border-primary bg-primary/10' : ''
                      }`}
                      onClick={() => {
                        setSelectedImage(img.id);
                        onSelect(img);
                      }}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedImage(img.id);
                          onSelect(img);
                        }
                      }}
                      role="button"
                      aria-label={`Select ${img.name}`}
                      aria-selected={selectedImage === img.id}
                    >
                      <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
                        <img 
                          src={img.url} 
                          alt={img.name} 
                          className="object-contain max-w-full max-h-full"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-xs mt-1 truncate w-full">{img.name}</span>
                      <div className="flex gap-1 mt-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(img.id);
                          }}
                          aria-label={`Remove ${img.name}`}
                        >
                          <Trash2 className="h-3 w-3" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Image Properties */}
        {selectedImg && (
          <div className="space-y-3" role="group" aria-labelledby="image-properties-title">
            <Label id="image-properties-title" className="text-xs">Properties for: {selectedImg.name}</Label>
            
            <div>
              <Label htmlFor="scale-slider" className="text-xs">Scale: {Math.round(selectedImg.scale * 100)}%</Label>
              <Slider
                id="scale-slider"
                min={0.1}
                max={3}
                step={0.01}
                value={[selectedImg.scale]}
                onValueChange={(value) => handleImagePropertyChange(selectedImg.id, 'scale', value[0])}
                className="mt-1"
                aria-valuetext={`Scale: ${Math.round(selectedImg.scale * 100)}%`}
              />
            </div>
            
            <div>
              <Label htmlFor="rotation-slider" className="text-xs">Rotation: {selectedImg.rotation}°</Label>
              <Slider
                id="rotation-slider"
                min={0}
                max={360}
                step={1}
                value={[selectedImg.rotation]}
                onValueChange={(value) => handleImagePropertyChange(selectedImg.id, 'rotation', value[0])}
                className="mt-1"
                aria-valuetext={`Rotation: ${selectedImg.rotation} degrees`}
              />
            </div>
            
            <div>
              <Label htmlFor="opacity-slider" className="text-xs">Opacity: {Math.round(selectedImg.opacity * 100)}%</Label>
              <Slider
                id="opacity-slider"
                min={0}
                max={1}
                step={0.01}
                value={[selectedImg.opacity]}
                onValueChange={(value) => handleImagePropertyChange(selectedImg.id, 'opacity', value[0])}
                className="mt-1"
                aria-valuetext={`Opacity: ${Math.round(selectedImg.opacity * 100)}%`}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BackgroundImageComponent;
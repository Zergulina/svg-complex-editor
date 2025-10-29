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

  const selectedImg = images.find(img => img.id === selectedImage);

  return (
    <Card role="region" aria-labelledby="bg-image-component-title" className="gap-0 p-2 h-full flex flex-col">
      <CardHeader className="p-2 pb-1" id="bg-image-component-title">
        <CardTitle className="text-sm flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          Изображения
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 space-y-3 h-full flex flex-col">
        {/* Upload Button */}
        <Button 
          variant="outline" 
          className="w-full h-8"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload background image"
        >
          <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
          Загрузить изображения
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
        <div className="flex-1 flex flex-col">
          <Label htmlFor="bg-image-list" className="text-xs">Загруженные изображеня</Label>
          <ScrollArea 
            id="bg-image-list"
            className="h-24 mt-1 border rounded-md flex-1"
            aria-label="List of uploaded background images"
          >
            <div className="p-2 h-full">
              {images.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-2">Изображения не загружены</p>
              ) : (
                <div className="grid grid-cols-2 gap-2 h-full">
                  {images.map((img) => (
                    <div 
                      key={img.id} 
                      className={`border rounded p-1 cursor-pointer flex flex-col items-center ${
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
                      <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                        <img 
                          src={img.url} 
                          alt={img.name} 
                          className="object-contain max-w-full max-h-full"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-[10px] mt-0.5 truncate w-full">{img.name}</span>
                      <div className="flex gap-1 mt-0.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-5 w-5 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(img.id);
                          }}
                          aria-label={`Remove ${img.name}`}
                        >
                          <Trash2 className="h-2.5 w-2.5" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default BackgroundImageComponent;
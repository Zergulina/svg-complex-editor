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
  Minus,
  BrickWall
} from "lucide-react";
import { useState } from "react";

interface WallComponentProps {
  onSelect: ( properties: any) => void;
  isSelected?: boolean;
}

const WallComponent = ({ onSelect, isSelected }: WallComponentProps) => {

  const handleWallTypeSelect = () => {
    const properties = null;
    onSelect( properties);
  };

  return (
    <Card role="region" aria-labelledby="wall-component-title" className="gap-0 p-2">
      <CardHeader className="p-2 pb-1" id="wall-component-title">
        <CardTitle className="text-sm flex items-center gap-2">
          <BrickWall className="h-4 w-4" />
          Стены
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 space-y-3">
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className="h-9 flex flex-col items-center justify-center"
          onClick={() => handleWallTypeSelect()}
          role="radio"
          aria-checked={!!isSelected}
          aria-label="Line wall">
            Выбрать
        </Button>
      </CardContent>
    </Card>
  );
};

export default WallComponent;
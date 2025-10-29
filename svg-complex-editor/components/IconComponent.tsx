"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Palette, Leaf, AlertTriangle, AlertOctagon, Sprout } from "lucide-react";
import { useState } from "react";

interface IconComponentProps {
  onSelect: (icon: any) => void;
}

interface Icon {
  id: string;
  name: string;
  component: React.ReactNode;
}

const IconComponent = ({ onSelect }: IconComponentProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('vegetables');

  // Sample icon data
  const icons: Icon[] = [
    { id: 'carrot', name: 'Carrot', component: <Sprout className="h-5 w-5" /> },
    { id: 'tomato', name: 'Tomato', component: <Palette className="h-5 w-5" style={{ color: '#ff4444' }} /> },
    { id: 'lettuce', name: 'Lettuce', component: <Leaf className="h-5 w-5" style={{ color: '#4caf50' }} /> },
  ];

  const filteredIcons = icons.filter(icon =>
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card role="region" aria-labelledby="icon-component-title" className="gap-0 p-2 h-full">
      <CardHeader className="p-2 pb-1" id="icon-component-title">
        <CardTitle className="text-sm flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Иконки
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 space-y-3 h-full flex flex-col">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            id="icon-search"
            type="text"
            placeholder="Поиск иконок..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 text-xs h-8"
            aria-label="Search icons"
          />
        </div>

        {/* Icons Grid */}
        <ScrollArea
          className="h-40 flex-1"
          role="tabpanel"
        >
          <div className="grid grid-cols-4 gap-2">
            {filteredIcons.map((icon) => (
              <Button
                key={icon.id}
                variant="outline"
                size="sm"
                className="h-14 flex flex-col items-center justify-center gap-1 p-1"
                onClick={() => onSelect({ ...icon, category: activeCategory })}
                aria-label={icon.name}
              >
                <div className="flex items-center justify-center h-5 w-5" aria-hidden="true">
                  {icon.component}
                </div>
                <span className="text-[11px] mt-0.5 truncate w-full select-none">{icon.name}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default IconComponent;
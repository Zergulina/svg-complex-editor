"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Palette, Leaf, AlertTriangle, AlertOctagon, Sprout } from "lucide-react";
import { useState } from "react";

interface IconComponentProps {
  onSelect: (icon: any) => void;
}

interface IconCategory {
  id: string;
  name: string;
  icons: {
    id: string;
    name: string;
    component: React.ReactNode;
  }[];
}

const IconComponent = ({ onSelect }: IconComponentProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('vegetables');

  // Sample icon data
  const iconCategories: IconCategory[] = [
    {
      id: 'vegetables',
      name: 'Vegetables',
      icons: [
        { id: 'carrot', name: 'Carrot', component: <Sprout className="h-5 w-5" /> },
        { id: 'tomato', name: 'Tomato', component: <Palette className="h-5 w-5" style={{ color: '#ff4444' }} /> },
        { id: 'lettuce', name: 'Lettuce', component: <Leaf className="h-5 w-5" style={{ color: '#4caf50' }} /> },
        { id: 'corn', name: 'Corn', component: <Palette className="h-5 w-5" style={{ color: '#FFD700' }} /> },
      ]
    },
    {
      id: 'warnings',
      name: 'Warnings',
      icons: [
        { id: 'warning1', name: 'Warning 1', component: <AlertTriangle className="h-5 w-5" /> },
        { id: 'warning2', name: 'Warning 2', component: <AlertTriangle className="h-5 w-5" style={{ color: '#ff9800' }} /> },
      ]
    },
    {
      id: 'alerts',
      name: 'Alerts',
      icons: [
        { id: 'alert1', name: 'Alert 1', component: <AlertOctagon className="h-5 w-5" /> },
        { id: 'alert2', name: 'Alert 2', component: <AlertOctagon className="h-5 w-5" style={{ color: '#f44336' }} /> },
      ]
    },
    {
      id: 'culture',
      name: 'Culture',
      icons: [
        { id: 'culture1', name: 'Culture 1', component: <Palette className="h-5 w-5" style={{ color: '#9c27b0' }} /> },
        { id: 'culture2', name: 'Culture 2', component: <Palette className="h-5 w-5" style={{ color: '#e91e63' }} /> },
      ]
    }
  ];

  const currentCategory = iconCategories.find(cat => cat.id === activeCategory) || iconCategories[0];

  // Filter icons based on search term
  const filteredIcons = currentCategory.icons.filter(icon =>
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card role="region" aria-labelledby="icon-component-title">
      <CardHeader className="p-3" id="icon-component-title">
        <CardTitle className="text-sm flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Icons
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            id="icon-search"
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 text-xs"
            aria-label="Search icons"
          />
        </div>

        {/* Category Tabs */}
        <div 
          className="flex flex-wrap gap-1"
          role="tablist"
          aria-label="Icon category tabs"
        >
          {iconCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'secondary' : 'outline'}
              size="sm"
              className="text-xs h-7"
              onClick={() => setActiveCategory(category.id)}
              role="tab"
              aria-selected={activeCategory === category.id}
              aria-controls={`panel-${category.id}`}
              id={`tab-${category.id}`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Icons Grid */}
        <ScrollArea 
          className="h-48"
          role="tabpanel"
          id={`panel-${activeCategory}`}
          aria-labelledby={`tab-${activeCategory}`}
        >
          <div className="grid grid-cols-4 gap-2">
            {filteredIcons.map((icon) => (
              <Button
                key={icon.id}
                variant="outline"
                size="sm"
                className="h-16 flex flex-col items-center justify-center gap-1 p-2"
                onClick={() => onSelect({ ...icon, category: activeCategory })}
                aria-label={icon.name}
              >
                <div className="flex items-center justify-center h-6 w-6" aria-hidden="true">
                  {icon.component}
                </div>
                <span className="text-xs mt-1 truncate w-full">{icon.name}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default IconComponent;
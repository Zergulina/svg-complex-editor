"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  PanelLeft, 
  PanelRight, 
  Square, 
  Circle, 
  Type, 
  Image as ImageIcon, 
  Palette,
  Plus,
  Search,
  ChevronsUpDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import WallComponent from "./WallComponent";
import ZoneComponent from "./ZoneComponent";
import TextComponent from "./TextComponent";
import IconComponent from "./IconComponent";
import BackgroundImageComponent from "./BackgroundImageComponent";
import { ZoneProperties } from "./Canvas";

interface ComponentItem {
  id: string;
  type: string;
  name: string;
  description: string;
  icon?: string;
  properties?: Record<string, any>;
}

interface SidebarState {
  collapsed: boolean;
  activeTab: 'primitives' | 'backgrounds' | 'zones' | 'icons';
  selectedTool: string | null;
  componentItems: ComponentItem[];
}

interface SidebarProps {
  state: SidebarState;
  onToggleCollapse: () => void;
  onTabChange: (tab: 'primitives' | 'backgrounds' | 'zones' | 'icons') => void;
  onComponentSelect: (component: ComponentItem) => void;
  onZonePropertiesChange?: (properties: ZoneProperties) => void; // Add function to update zone properties
}

const Sidebar = ({ 
  state, 
  onToggleCollapse, 
  onTabChange,
  onComponentSelect,
  onZonePropertiesChange
}: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Sample component data based on the plan
  const componentData = {
    primitives: {
      walls: [
        {
          id: 'wall',
          type: 'wall',
          name: 'Wall',
          description: 'Create a wall with variable width',
          icon: 'brick-wall',
          properties: { width: 10, length: 100 }
        }
      ],
      zones: [
        {
          id: 'zone-polygon',
          type: 'zone',
          name: 'Zone (Polygon)',
          description: 'Create a polygonal zone with text and icon support',
          icon: 'square',
          properties: { sides: 4, text: 'Zone' }
        },
        {
          id: 'zone-ellipse',
          type: 'zone',
          name: 'Zone (Ellipse)',
          description: 'Create an elliptical zone with text and icon support',
          icon: 'circle',
          properties: { text: 'Zone' }
        }
      ],
      texts: [
        {
          id: 'text-basic',
          type: 'text',
          name: 'Text',
          description: 'Add text annotation to the canvas',
          icon: 'type',
          properties: { content: 'Sample text', size: 14 }
        }
      ]
    },
    icons: [
      {
        id: 'icon-vegetables',
        type: 'icon',
        name: 'Vegetables',
        description: 'Collection of vegetable icons',
        properties: { category: 'vegetables' }
      },
      {
        id: 'icon-warnings',
        type: 'icon',
        name: 'Warnings',
        description: 'Collection of warning icons',
        properties: { category: 'warnings' }
      },
      {
        id: 'icon-alerts',
        type: 'icon',
        name: 'Alerts',
        description: 'Collection of alert icons',
        properties: { category: 'alerts' }
      },
      {
        id: 'icon-culture',
        type: 'icon',
        name: 'Culture',
        description: 'Collection of culture indicators',
        properties: { category: 'culture' }
      }
    ],
    backgrounds: [
      {
        id: 'bg-upload',
        type: 'background',
        name: 'Upload Image',
        description: 'Upload a background image',
        icon: 'image',
        properties: {}
      }
    ]
  };

  // Filter components based on search term
  const filteredComponents = {
    primitives: {
      walls: componentData.primitives.walls.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
      zones: componentData.primitives.zones.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
      texts: componentData.primitives.texts.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    },
    icons: componentData.icons.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    backgrounds: componentData.backgrounds.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  };

  // Function to render component icon based on type
  const renderComponentIcon = (iconType?: string) => {
    switch (iconType) {
      case 'square':
        return <Square className="h-5 w-5" />;
      case 'circle':
        return <Circle className="h-5 w-5" />;
      case 'type':
        return <Type className="h-5 w-5" />;
      case 'image':
        return <ImageIcon className="h-5 w-5" />;
      default:
        return <Palette className="h-5 w-5" />;
    }
  };

  // Handle selection of different components
  const handleWallSelect = ( properties: any) => {
    
    const component = componentData.primitives.walls.find(w => w.id === "wall");
    if (component) {
      const updatedComponent = {
        ...component,
        properties: { ...component.properties, ...properties }
      };
      onComponentSelect(updatedComponent);
    }
  };

  const handleZoneSelect = (type: string, properties: any) => {
    const componentType = type === 'polygon' ? 'zone-polygon' : 'zone-ellipse';
    const component = componentData.primitives.zones.find(z => z.id === componentType);
    if (component) {
      const updatedComponent = {
        ...component,
        properties: { ...component.properties, ...properties }
      };
      setSelectedComponent(componentType);
      onComponentSelect(updatedComponent);
    }
    
    // Update zone properties if the callback is provided
    if (onZonePropertiesChange) {
      // Ensure properties has the correct structure for ZoneProperties
      const zoneProps: ZoneProperties = {
        type: type as 'polygon' | 'ellipse',
        sides: properties.sides,
        text: properties.text,
        borderColor: properties.borderColor || '#228B22',
        fillColor: properties.fillColor || 'none'
      };

      console.log(`hi from sidebar ${zoneProps.borderColor}`);
      
      onZonePropertiesChange(zoneProps);
    }
  };

  const handleTextSelect = (properties: any) => {
    const component = componentData.primitives.texts[0]; // Text component
    if (component) {
      const updatedComponent = {
        ...component,
        properties: { ...component.properties, ...properties }
      };
      onComponentSelect(updatedComponent);
    }
  };

  const handleIconSelect = (icon: any) => {
    const component = componentData.icons.find(i => i.properties?.category === icon.category);
    if (component) {
      const updatedComponent = {
        ...component,
        properties: { ...component.properties, ...icon }
      };
      setSelectedComponent('icon-' + icon.category);
      onComponentSelect(updatedComponent);
    }
  };

  const handleBackgroundSelect = (properties: any) => {
    const component = componentData.backgrounds[0]; // Background component
    if (component) {
      const updatedComponent = {
        ...component,
        properties: { ...properties }
      };
      setSelectedComponent('bg-upload');
      onComponentSelect(updatedComponent);
    }
  };

  // Keyboard navigation within the sidebar
  useEffect(() => {
    if (state.collapsed) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus management for accessibility
      if (e.key === 'Tab') {
        // When tabbing away from sidebar, we need to handle focus properly
        if (document.activeElement?.closest('[data-sidebar]') !== sidebarRef.current) {
          // If focus is moving away and sidebar is expanded, we might want to handle this specially
        }
      }

      // Navigation shortcuts for the sidebar
      if (e.altKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            onTabChange('primitives');
            break;
          case '2':
            e.preventDefault();
            onTabChange('icons');
            break;
          case '3':
            e.preventDefault();
            onTabChange('backgrounds');
            break;
          case 'c':
            e.preventDefault();
            document.querySelector<HTMLInputElement>('input[placeholder="Search components..."]')?.focus();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.collapsed, onTabChange]);

  return (
    <div 
      ref={sidebarRef}
      data-sidebar
      className={cn(
        "h-full bg-background border-r flex flex-col transition-all duration-300 overflow-hidden",
        state.collapsed ? "w-14" : "w-78" // Increased from w-64 to w-72 for better content display without horizontal scroll
      )}
      role="region"
      aria-label="Components sidebar"
      tabIndex={-1}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-12 px-3 border-b">
        {!state.collapsed && (
          <h2 
            className="text-lg font-semibold"
            id="sidebar-title"
          >
            Компоненты
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onToggleCollapse}
          aria-label={state.collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!state.collapsed}
        >
          {state.collapsed ? 
            <PanelRight className="h-5 w-5" aria-hidden="true" /> : 
            <PanelLeft className="h-5 w-5" aria-hidden="true" />
          }
        </Button>
      </div>

      {!state.collapsed && (
        <div className="flex-1 overflow-auto p-2.5 flex flex-col">
          {/* Tabs */}
          <div 
            className="flex space-x-1 mb-3"
            role="tablist"
            aria-label="Component categories"
          >
            <Button
              variant={state.activeTab === 'primitives' ? 'default' : 'outline'}
              size="sm"
              className="flex-1 text-xs flex-shrink-0"
              onClick={() => onTabChange('primitives')}
              role="tab"
              aria-selected={state.activeTab === 'primitives'}
              aria-controls="primitives-panel"
              id="primitives-tab"
            >
              Примитивы
            </Button>
            <Button
              variant={state.activeTab === 'icons' ? 'default' : 'outline'}
              size="sm"
              className="flex-1 text-xs flex-shrink-0"
              onClick={() => onTabChange('icons')}
              role="tab"
              aria-selected={state.activeTab === 'icons'}
              aria-controls="icons-panel"
              id="icons-tab"
            >
              Иконки
            </Button>
            <Button
              variant={state.activeTab === 'backgrounds' ? 'default' : 'outline'}
              size="sm"
              className="flex-1 text-xs flex-shrink-0"
              onClick={() => onTabChange('backgrounds')}
              role="tab"
              aria-selected={state.activeTab === 'backgrounds'}
              aria-controls="backgrounds-panel"
              id="backgrounds-tab"
            >
              Изображения
            </Button>
          </div>

          {/* Components Content */}
          <div 
            className="space-y-3 flex-1"
            role="tabpanel"
            id={`${state.activeTab}-panel`}
            aria-labelledby={`${state.activeTab}-tab`}
          >
            {state.activeTab === 'primitives' && (
              <>
                <WallComponent 
                  onSelect={handleWallSelect} 
                  isSelected={state.selectedTool === 'wall'}
                />
                
                <ZoneComponent 
                  onSelect={handleZoneSelect} 
                  isSelected={state.selectedTool === 'zone-polygon' || state.selectedTool === 'zone-ellipse'}
                />
                
                <TextComponent 
                  onSelect={handleTextSelect} 
                  isSelected={state.selectedTool === 'text-basic'}
                />
              </>
            )}

            {state.activeTab === 'icons' && (
              <IconComponent 
                onSelect={handleIconSelect} 
                isSelected={state.selectedTool && state.selectedTool.startsWith('icon-')}
              />
            )}

            {state.activeTab === 'backgrounds' && (
              <BackgroundImageComponent 
                onSelect={handleBackgroundSelect} 
                isSelected={state.selectedTool && state.selectedTool.startsWith('bg-')}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
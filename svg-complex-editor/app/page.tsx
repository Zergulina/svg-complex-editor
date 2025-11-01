"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Canvas from "@/components/Canvas";
import PropertyPanel from "@/components/PropertyPanel";
import { SidebarProvider, useSidebar } from "@/components/SidebarContext";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Undo2,
  Redo2,
  Save,
  Upload,
  FilePlus,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { ZoneProperties, CanvasElement } from "@/components/Canvas"; 
// Toolbar state interface
interface ToolbarState {
  canUndo: boolean;
  canRedo: boolean;
  hasUnsavedChanges: boolean;
}

// Component item interface
interface ComponentItem {
  id: string;
  type: string;
  name: string;
  description: string;
  icon?: string;
  properties?: Record<string, any>;
}

const HomePageContent = () => {
  const { state, dispatch } = useSidebar();
  const [content, setContent] = useState("Welcome to SVG Complex Editor");
  const [zoneProperties, setZoneProperties] = useState<ZoneProperties>({
    type: 'ellipse',
    borderColor: '#228B22',
    fillColor: 'none'
  });
  const [toolbarState, setToolbarState] = useState<ToolbarState>({
    canUndo: true,
    canRedo: false,
    hasUnsavedChanges: false,
  });
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(null);
  const updateElementProperties = useRef<(elementId: string, properties: any) => void>(null);

  // Create a callback to pass the update function to Canvas
  const setUpdateFunction = useCallback((func: (elementId: string, properties: any) => void) => {
    updateElementProperties.current = func;
  }, []);

  useEffect(() => {
    console.log(`hi from page ${zoneProperties.borderColor}`)
  }, [zoneProperties]);

  const handleNewCanvas = () => {
    setContent("New canvas created");
    console.log("New canvas created");
    toast.success("New canvas created");
  };

  const handleSave = () => {
    console.log("Saving project...");
    toast.success("Project saved successfully!");
  };

  const handleLoad = (file: File) => {
    console.log("Loading file:", file.name);
    toast.success(`File ${file.name} loaded successfully!`);
  };

  const handleUndo = () => {
    console.log("Undo action");
    // In a real implementation, this would update the command history
    setToolbarState(prev => ({
      ...prev,
      canRedo: true,
      canUndo: prev.canUndo // This would be updated based on command history
    }));
  };

  const handleRedo = () => {
    console.log("Redo action");
    // In a real implementation, this would update the command history
    setToolbarState(prev => ({
      ...prev,
      canUndo: true,
      canRedo: prev.canRedo // This would be updated based on command history
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleLoad(file);
    }
    // Reset the input so the same file can be selected again
    e.target.value = '';
  };

  const handleNewCanvasClick = () => {
    if (toolbarState.hasUnsavedChanges) {
      const confirmNew = confirm("You have unsaved changes. Are you sure you want to create a new canvas? All changes will be lost.");
      if (confirmNew) {
        handleNewCanvas();
      }
    } else {
      handleNewCanvas();
    }
  };

  // Sidebar handlers
  const handleToggleCollapse = () => {
    dispatch({ type: 'TOGGLE_COLLAPSE' });
  };

  const handleTabChange = (tab: 'primitives' | 'backgrounds' | 'zones' | 'icons') => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };

  const handleComponentSelect = (component: ComponentItem) => {
    dispatch({ type: 'SET_SELECTED_TOOL', payload: component.id });
    // Here we would notify the canvas of the new tool selection
    // For now, just show a toast
    toast.success(`${component.name} selected!`);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header with keyboard shortcuts */}
      <Header 
        onUndo={handleUndo}
        onRedo={handleRedo}
        onSave={handleSave}
      />
      
      {/* Toolbar under the header */}
      <div className="h-10 border-b flex items-center px-4 gap-1">
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleUndo}
                  disabled={!toolbarState.canUndo}
                  aria-label="Undo"
                >
                  <Undo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Undo (Ctrl+Z)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleRedo}
                  disabled={!toolbarState.canRedo}
                  aria-label="Redo"
                >
                  <Redo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Redo (Ctrl+Y)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="w-px h-4 bg-border mx-1" />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleSave}
                  aria-label="Save"
                >
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save (Ctrl+S)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  aria-label="Load"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Load Project</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleNewCanvasClick}
                  aria-label="New Canvas"
                >
                  <FilePlus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>New Canvas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <input
          id="file-upload"
          type="file"
          accept=".svg,.json"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      
      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          state={state} 
          onToggleCollapse={handleToggleCollapse}
          onTabChange={handleTabChange}
          onComponentSelect={handleComponentSelect}
          onZonePropertiesChange={(properties: ZoneProperties) => {setZoneProperties(properties); console.log(properties)}}
        />
        
        {/* Canvas Area */}
        <main className="flex-1 overflow-hidden bg-muted relative">
          <Canvas 
            onSelectionChange={(elementId) => {
              console.log("Element selected:", elementId);
              if (elementId) {
                // We'll update this once we have the elements data
              } else {
                setSelectedElement(null);
              }
            }}
            onElementPropertiesChange={(elementId, properties) => {
              console.log(`Updating properties for element ${elementId}:`, properties);
              // This will be handled by the canvas directly
            }}
            onUpdateElementProperties={(func) => {
              updateElementProperties.current = func;
            }}
            onCanvasChange={(state) => {
              // console.log("Canvas state changed:", state);
              // Update selected element if one is selected
              if (state.selectedElementId) {
                const element = state.elements.find(el => el.id === state.selectedElementId);
                if (element) {
                  console.log(element.id);
                  setSelectedElement(element);
                }
              } else {
                setSelectedElement(null);
              }
            }}
            currentTool={state.selectedTool as any}
            zoneProperties={zoneProperties}
          />
        </main>
      </div>
      {/* Property Panel rendered at root level to avoid React rendering issues */}
      {selectedElement && (
        <PropertyPanel 
          selectedElement={selectedElement} 
          onPropertiesChange={(id, properties) => {
            console.log(`Property change for ${id}:`, properties);
            // Call the canvas method to update the element
            updateElementProperties.current?.(id, properties);
          }}
          onClose={() => {setSelectedElement(null); }}
        />
      )}
    </div>
  );
};

export default function HomePage() {
  return (
    <SidebarProvider>
      <HomePageContent />
    </SidebarProvider>
  );
}
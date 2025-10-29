"use client";

import Header from "@/components/Header";
import { useState } from "react";
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

// Toolbar state interface
interface ToolbarState {
  canUndo: boolean;
  canRedo: boolean;
  hasUnsavedChanges: boolean;
}

export default function HomePage() {
  const [content, setContent] = useState("Welcome to SVG Complex Editor");
  const [toolbarState, setToolbarState] = useState<ToolbarState>({
    canUndo: true,
    canRedo: false,
    hasUnsavedChanges: false,
  });

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
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">{content}</h1>
          <p>Use the toolbar above to manage your canvas.</p>
        </div>
      </main>
    </div>
  );
}
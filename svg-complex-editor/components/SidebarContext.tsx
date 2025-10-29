"use client";

import { createContext, useContext, useReducer } from "react";

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

type SidebarAction = 
  | { type: 'TOGGLE_COLLAPSE' }
  | { type: 'SET_ACTIVE_TAB'; payload: 'primitives' | 'backgrounds' | 'zones' | 'icons' }
  | { type: 'SET_SELECTED_TOOL'; payload: string | null }
  | { type: 'SET_COMPONENT_ITEMS'; payload: ComponentItem[] };

const initialState: SidebarState = {
  collapsed: false,
  activeTab: 'primitives',
  selectedTool: null,
  componentItems: []
};

const sidebarReducer = (state: SidebarState, action: SidebarAction): SidebarState => {
  switch (action.type) {
    case 'TOGGLE_COLLAPSE':
      return { ...state, collapsed: !state.collapsed };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_SELECTED_TOOL':
      return { ...state, selectedTool: action.payload };
    case 'SET_COMPONENT_ITEMS':
      return { ...state, componentItems: action.payload };
    default:
      return state;
  }
};

const SidebarContext = createContext<{
  state: SidebarState;
  dispatch: React.Dispatch<SidebarAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  return (
    <SidebarContext.Provider value={{ state, dispatch }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
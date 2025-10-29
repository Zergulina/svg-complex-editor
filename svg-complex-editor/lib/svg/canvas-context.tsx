import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { 
  CanvasState, 
  CanvasElement, 
  PrimitiveType, 
  Position,
  Viewport 
} from '@/lib/svg/svg-utils';

// Define action types for the reducer
type CanvasAction =
  | { type: 'ADD_ELEMENT'; element: CanvasElement }
  | { type: 'REMOVE_ELEMENT'; id: string }
  | { type: 'UPDATE_ELEMENT'; id: string; updates: Partial<CanvasElement> }
  | { type: 'SELECT_ELEMENT'; id: string | null }
  | { type: 'SET_CURRENT_TOOL'; tool: PrimitiveType | null }
  | { type: 'SET_VIEWPORT'; viewport: Viewport }
  | { type: 'SET_ELEMENTS'; elements: CanvasElement[] }
  | { type: 'MOVE_ELEMENT'; id: string; position: Position }
  | { type: 'SET_ELEMENT_VISIBILITY'; id: string; visible: boolean }
  | { type: 'SET_ELEMENT_LOCK'; id: string; locked: boolean };

// Initial state for the canvas
const initialState: CanvasState = {
  elements: [],
  viewport: {
    position: { x: 0, y: 0 },
    zoom: 1,
    rotation: 0,
  },
  selectedElement: null,
  currentTool: null,
};

// Reducer function to handle state changes
const canvasReducer = (state: CanvasState, action: CanvasAction): CanvasState => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return {
        ...state,
        elements: [...state.elements, action.element],
      };

    case 'REMOVE_ELEMENT':
      return {
        ...state,
        elements: state.elements.filter(element => element.id !== action.id),
        selectedElement: state.selectedElement === action.id ? null : state.selectedElement,
      };

    case 'UPDATE_ELEMENT':
      return {
        ...state,
        elements: state.elements.map(element =>
          element.id === action.id ? { ...element, ...action.updates } : element
        ),
      };

    case 'SELECT_ELEMENT':
      return {
        ...state,
        selectedElement: action.id,
      };

    case 'SET_CURRENT_TOOL':
      return {
        ...state,
        currentTool: action.tool,
      };

    case 'SET_VIEWPORT':
      return {
        ...state,
        viewport: action.viewport,
      };

    case 'SET_ELEMENTS':
      return {
        ...state,
        elements: action.elements,
      };

    case 'MOVE_ELEMENT':
      return {
        ...state,
        elements: state.elements.map(element =>
          element.id === action.id
            ? { ...element, position: action.position }
            : element
        ),
      };

    case 'SET_ELEMENT_VISIBILITY':
      return {
        ...state,
        elements: state.elements.map(element =>
          element.id === action.id
            ? { ...element, visible: action.visible }
            : element
        ),
      };

    case 'SET_ELEMENT_LOCK':
      return {
        ...state,
        elements: state.elements.map(element =>
          element.id === action.id
            ? { ...element, locked: action.locked }
            : element
        ),
      };

    default:
      return state;
  }
};

// Create context
interface CanvasContextType {
  state: CanvasState;
  dispatch: React.Dispatch<CanvasAction>;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

// Provider component
interface CanvasProviderProps {
  children: ReactNode;
  initialState?: CanvasState;
}

export const CanvasProvider: React.FC<CanvasProviderProps> = ({ 
  children, 
  initialState: customInitialState = initialState 
}) => {
  const [state, dispatch] = useReducer(canvasReducer, customInitialState);

  return (
    <CanvasContext.Provider value={{ state, dispatch }}>
      {children}
    </CanvasContext.Provider>
  );
};

// Custom hook to use the canvas context
export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
};

// Helper functions that dispatch actions
export const useCanvasActions = () => {
  const { dispatch } = useCanvas();

  const addElement = (element: CanvasElement) => {
    dispatch({ type: 'ADD_ELEMENT', element });
  };

  const removeElement = (id: string) => {
    dispatch({ type: 'REMOVE_ELEMENT', id });
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    dispatch({ type: 'UPDATE_ELEMENT', id, updates });
  };

  const selectElement = (id: string | null) => {
    dispatch({ type: 'SELECT_ELEMENT', id });
  };

  const setCurrentTool = (tool: PrimitiveType | null) => {
    dispatch({ type: 'SET_CURRENT_TOOL', tool });
  };

  const setViewport = (viewport: Viewport) => {
    dispatch({ type: 'SET_VIEWPORT', viewport });
  };

  const setElements = (elements: CanvasElement[]) => {
    dispatch({ type: 'SET_ELEMENTS', elements });
  };

  const moveElement = (id: string, position: Position) => {
    dispatch({ type: 'MOVE_ELEMENT', id, position });
  };

  const setElementVisibility = (id: string, visible: boolean) => {
    dispatch({ type: 'SET_ELEMENT_VISIBILITY', id, visible });
  };

  const setElementLock = (id: string, locked: boolean) => {
    dispatch({ type: 'SET_ELEMENT_LOCK', id, locked });
  };

  return {
    addElement,
    removeElement,
    updateElement,
    selectElement,
    setCurrentTool,
    setViewport,
    setElements,
    moveElement,
    setElementVisibility,
    setElementLock,
  };
};
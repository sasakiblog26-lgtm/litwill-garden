"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Context                                                                   */
/* -------------------------------------------------------------------------- */

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("Tabs compound components must be used within a <Tabs> parent.");
  }
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*  Tabs (root)                                                               */
/* -------------------------------------------------------------------------- */

/** Props accepted by the {@link Tabs} root component. */
export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  /** The initially selected tab value (uncontrolled). */
  defaultValue: string;
  /** Controlled value. When provided, the component is fully controlled. */
  value?: string;
  /** Callback fired when the active tab changes. */
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

/**
 * Root container for a tabbed interface.
 *
 * Manages active-tab state and provides it to {@link TabsList},
 * {@link TabsTrigger}, and {@link TabsContent} via context.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="weapons">
 *   <TabsList>
 *     <TabsTrigger value="weapons">Weapons</TabsTrigger>
 *     <TabsTrigger value="legends">Legends</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="weapons">Weapons panel</TabsContent>
 *   <TabsContent value="legends">Legends panel</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value: controlledValue, onValueChange, className, children, ...props }, ref) => {
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolled;

    const handleChange = (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
    };

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleChange }}>
        <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

/* -------------------------------------------------------------------------- */
/*  TabsList                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Horizontal container for {@link TabsTrigger} buttons.
 */
const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1 rounded-lg bg-[#27272A] p-1",
        className,
      )}
      {...props}
    />
  ),
);
TabsList.displayName = "TabsList";

/* -------------------------------------------------------------------------- */
/*  TabsTrigger                                                               */
/* -------------------------------------------------------------------------- */

/** Props accepted by the {@link TabsTrigger} component. */
export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The value this trigger activates. Must match a {@link TabsContent} value. */
  value: string;
}

/**
 * Button that activates its associated {@link TabsContent} panel.
 */
const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const { value: activeValue, onValueChange } = useTabsContext();
    const isActive = activeValue === value;

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        onClick={() => onValueChange(value)}
        className={cn(
          "inline-flex items-center justify-center rounded-md px-4 py-2",
          "text-sm font-semibold uppercase tracking-wider",
          "transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84CC16] focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B]",
          isActive
            ? "bg-[#84CC16] text-[#18181B] shadow-[0_0_12px_rgba(132,204,22,0.3)]"
            : "text-[#A1A1AA] hover:bg-[#FAFAFA]/5 hover:text-[#FAFAFA]",
          className,
        )}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

/* -------------------------------------------------------------------------- */
/*  TabsContent                                                               */
/* -------------------------------------------------------------------------- */

/** Props accepted by the {@link TabsContent} component. */
export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /** The value that controls this panel's visibility. */
  value: string;
}

/**
 * Content panel shown when its `value` matches the active tab.
 */
const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { value: activeValue } = useTabsContext();
    if (activeValue !== value) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        data-state="active"
        className={cn(
          "animate-in fade-in-0 duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84CC16] focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B]",
          className,
        )}
        tabIndex={0}
        {...props}
      />
    );
  },
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };

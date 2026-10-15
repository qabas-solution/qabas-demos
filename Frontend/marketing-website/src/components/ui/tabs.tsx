import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  content: ReactNode;
  id: string;
  label: ReactNode;
}

interface TabsProps {
  className?: string;
  defaultTabId?: string;
  items: readonly TabItem[];
}

export function Tabs({ className, defaultTabId, items }: TabsProps) {
  const generatedId = useId();
  const [activeId, setActiveId] = useState(defaultTabId ?? items[0]?.id);
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  if (!activeItem) {
    return null;
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="inline-flex rounded-control bg-surface-soft p-1" role="tablist">
        {items.map((item) => {
          const isActive = item.id === activeItem.id;
          return (
            <button
              aria-controls={`${generatedId}-${item.id}-panel`}
              aria-selected={isActive}
              className={cn("min-h-10 rounded-control px-4 text-sm font-semibold text-ink-muted", isActive && "bg-surface text-ink shadow-sm")}
              id={`${generatedId}-${item.id}-tab`}
              key={item.id}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              type="button"
              onClick={() => setActiveId(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div
        aria-labelledby={`${generatedId}-${activeItem.id}-tab`}
        className="mt-4"
        id={`${generatedId}-${activeItem.id}-panel`}
        role="tabpanel"
      >
        {activeItem.content}
      </div>
    </div>
  );
}

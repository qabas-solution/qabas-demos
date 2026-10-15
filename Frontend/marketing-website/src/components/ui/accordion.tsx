import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  answer: ReactNode;
  id: string;
  question: ReactNode;
}

interface AccordionProps {
  className?: string;
  defaultOpenId?: string;
  items: readonly AccordionItem[];
}

export function Accordion({ className, defaultOpenId, items }: AccordionProps) {
  const [openId, setOpenId] = useState(defaultOpenId);

  return (
    <div className={cn("divide-y divide-line", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                aria-controls={`${item.id}-panel`}
                aria-expanded={isOpen}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-start font-bold"
                type="button"
                onClick={() => setOpenId(isOpen ? undefined : item.id)}
              >
                {item.question}
                <span aria-hidden="true" className={cn("text-xl transition-transform", isOpen && "rotate-180")}>⌄</span>
              </button>
            </h3>
            <div
              className={cn("grid transition-[grid-template-rows] duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
              id={`${item.id}-panel`}
              role="region"
            >
              <div className="overflow-hidden">
                <div className="pb-5 text-ink-muted">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

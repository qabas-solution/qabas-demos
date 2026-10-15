import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ModalProps {
  children: ReactNode;
  className?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function Modal({ children, className, description, isOpen, onClose, title }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-6" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div aria-describedby={description ? "q-modal-description" : undefined} aria-labelledby="q-modal-title" aria-modal="true" className={cn("relative max-h-[calc(100vh-3rem)] w-full max-w-xl overflow-auto rounded-section border border-line bg-surface p-6 shadow-lg", className)} role="dialog">
        <button ref={closeButtonRef} aria-label="Close" className="absolute end-4 top-4 size-11 rounded-control text-ink-muted hover:bg-surface-soft hover:text-ink" type="button" onClick={onClose}>
          ×
        </button>
        <h2 className="pe-12 text-2xl font-bold" id="q-modal-title">{title}</h2>
        {description && <p className="mt-2 text-ink-muted" id="q-modal-description">{description}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

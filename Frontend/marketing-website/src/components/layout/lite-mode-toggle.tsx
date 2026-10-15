import { Button } from "@/components/ui";
import { useLocale } from "@/hooks/use-locale";
import { useLiteMode } from "@/hooks/use-lite-mode";

export function LiteModeToggle() {
  const { t } = useLocale();
  const { isLiteMode, setLiteMode } = useLiteMode();
  return <Button aria-pressed={isLiteMode} aria-label={t("toggleLiteMode")} variant="icon" type="button" onClick={() => setLiteMode(!isLiteMode)}>◌</Button>;
}

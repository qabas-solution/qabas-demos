import { Button } from "@/components/ui";
import { useLocale } from "@/hooks/use-locale";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { t } = useLocale();
  const { isDark, setTheme } = useTheme();
  return <Button aria-label={t("toggleTheme")} variant="icon" type="button" onClick={() => setTheme(isDark ? "light" : "dark")}>{isDark ? "☀" : "◐"}</Button>;
}

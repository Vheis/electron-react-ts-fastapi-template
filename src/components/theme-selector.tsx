import { Check, ChevronDown, Monitor, Moon, Sun } from "lucide-react";
import { useState, type FocusEvent } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ThemePreference = "light" | "dark" | "system";

type ResolvedTheme = "light" | "dark";

type ThemeSelectorProps = {
  value: ThemePreference;
  resolvedTheme: ResolvedTheme;
  onChange: (theme: ThemePreference) => void;
};

const themeOptions = [
  {
    value: "light",
    label: "Light mode",
    description: "Always use the light theme.",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark mode",
    description: "Always use the dark theme.",
    icon: Moon,
  },
  {
    value: "system",
    label: "Match theme",
    description: "Follow your system appearance.",
    icon: Monitor,
  },
] satisfies Array<{
  value: ThemePreference;
  label: string;
  description: string;
  icon: typeof Sun;
}>;

const ThemeSelector = ({
  value,
  resolvedTheme,
  onChange,
}: ThemeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedTheme =
    themeOptions.find((option) => option.value === value) ?? themeOptions[2];

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }

    setIsOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocusCapture={() => setIsOpen(true)}
      onBlurCapture={handleBlur}
    >
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>Theme</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="min-w-40 justify-between gap-3"
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2 text-foreground">
            <selectedTheme.icon className="size-4" />
            <span>{selectedTheme.label}</span>
          </span>
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </Button>
      </div>

      <div
        role="menu"
        aria-label="Theme selector"
        className={cn(
          "absolute right-0 top-full z-20 mt-2 w-56 rounded-lg border border-border bg-popover p-1 shadow-lg transition-all duration-150",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        )}
      >
        {themeOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = option.value === value;
          const systemState =
            option.value === "system"
              ? `Currently ${resolvedTheme === "dark" ? "dark" : "light"}`
              : null;

          return (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={isSelected}
              className={cn(
                "flex w-full items-start gap-3 rounded-md px-3 py-2 text-left transition-colors",
                isSelected
                  ? "bg-accent text-accent-foreground"
                  : "text-popover-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <Icon className="mt-0.5 size-4 shrink-0" />
              <span className="flex-1">
                <span className="block text-sm font-medium">{option.label}</span>
                <span className="block text-xs text-muted-foreground">
                  {systemState ?? option.description}
                </span>
              </span>
              <Check
                className={cn(
                  "mt-0.5 size-4 shrink-0 transition-opacity",
                  isSelected ? "opacity-100" : "opacity-0"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelector;

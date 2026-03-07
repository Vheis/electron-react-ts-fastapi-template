import {
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  LifeBuoy,
  LogOut,
  Monitor,
  UserRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import avatarIllustration from "@/assets/account-avatar.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const accountSections = [
  {
    id: "profile",
    label: "Profile & preferences",
    description: "Personal details, notifications, and saved settings.",
    icon: UserRound,
    expandable: true,
  },
  {
    id: "workspace",
    label: "Workspace",
    description: "Project switching and connected desktop features.",
    icon: LayoutGrid,
    expandable: true,
  },
  {
    id: "display",
    label: "Display & accessibility",
    description: "Theme behavior, density, and interface comfort.",
    icon: Monitor,
    expandable: true,
  },
  {
    id: "support",
    label: "Help & support",
    description: "Shortcuts, documentation, and issue reporting.",
    icon: LifeBuoy,
    expandable: true,
  },
  {
    id: "logout",
    label: "Sign out",
    description: "Placeholder action for future authentication flows.",
    icon: LogOut,
    expandable: false,
  },
] as const;

const AccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Open account menu"
        className={cn(
          "account-trigger group relative flex items-center rounded-full border border-white/15 bg-slate-900/80 p-1 pl-1 shadow-lg shadow-slate-950/25 backdrop-blur-md transition-all duration-200",
          isOpen
            ? "border-emerald-400/55 bg-slate-900 text-white"
            : "text-slate-200 hover:border-white/25 hover:bg-slate-900"
        )}
        onClick={() => setIsOpen((currentState) => !currentState)}
      >
        <span className="sr-only">Account menu</span>
        <img
          src={avatarIllustration}
          alt="Profile avatar"
          className="size-10 rounded-full object-cover ring-2 ring-white/15"
        />
        <span
          className={cn(
            "absolute bottom-1 right-1 flex size-4 items-center justify-center rounded-full border border-slate-900 bg-slate-800 text-slate-200 transition-colors",
            isOpen && "bg-emerald-500 text-slate-950"
          )}
        >
          <ChevronDown
            className={cn("size-3 transition-transform", isOpen && "rotate-180")}
          />
        </span>
      </button>

      <div
        role="menu"
        aria-label="Account menu"
        className={cn(
          "absolute right-0 top-full z-30 mt-3 w-[22rem] origin-top-right rounded-[1.75rem] border border-white/10 bg-slate-950/94 p-4 text-left text-white shadow-2xl shadow-slate-950/35 backdrop-blur-xl transition-all duration-200",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        )}
      >
        <div className="rounded-[1.45rem] border border-white/8 bg-white/4 p-4">
          <div className="flex items-center gap-3">
            <img
              src={avatarIllustration}
              alt="Vasile Pirvu"
              className="size-14 rounded-full object-cover ring-2 ring-white/10"
            />
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold tracking-tight">
                Vasile Pirvu
              </p>
              <p className="truncate text-sm text-slate-400">
                Desktop workspace owner
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            className="mt-4 w-full justify-center rounded-xl border border-white/10 bg-white/8 text-white shadow-none hover:bg-white/14"
          >
            Manage account
          </Button>
        </div>

        <div className="mt-4 space-y-2">
          {accountSections.map((section) => {
            const Icon = section.icon;

            return (
              <button
                key={section.id}
                type="button"
                role="menuitem"
                aria-haspopup={section.expandable ? "menu" : undefined}
                className="group flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition-colors hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/8 text-slate-100 transition-colors group-hover:bg-white/12">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.98rem] font-medium tracking-tight">
                    {section.label}
                  </span>
                  <span className="block truncate text-sm text-slate-400">
                    {section.description}
                  </span>
                </span>
                {section.expandable ? (
                  <ChevronRight className="size-5 shrink-0 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-300" />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-4 border-t border-white/10 pt-4 text-xs text-slate-500">
          <p>Privacy · Terms · Desktop shell · API status</p>
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;

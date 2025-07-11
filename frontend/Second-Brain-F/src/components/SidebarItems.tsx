import type { ReactElement } from "react";

export function SidebarItems({ text, icon }: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="text-slate-700 cursor-pointer">
      <div className="flex items-center gap-3 px-4 py-1  hover:bg-slate-200 rounded-lg transition-all duration-700 ">
        <div className="text-xl">{icon}</div>
        <div className="text-base font-medium">{text}</div>
      </div>
    </div>
  );
}

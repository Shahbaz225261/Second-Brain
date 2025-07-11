import { forwardRef } from "react";

interface InputProps {
  placeholder: string;
}

// 👇 Function-style component with forwardRef
function InputComponent({ placeholder }: InputProps, ref: React.Ref<HTMLInputElement>) {
  return (
    <div className="flex">
      <input
        ref={ref}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-slate-300 m-2 rounded-md outline-none focus:ring-2 focus:ring-slate-300"
        type="text"
      />
    </div>
  );
}

// 👇 Export with correct name (PascalCase)
export const Input = forwardRef(InputComponent);

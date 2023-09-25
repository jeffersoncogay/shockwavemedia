import { ReactNode } from "react";

export default function FieldWrapper({
  label = "",
  children,
  error = false,
}: {
  label: string;
  children: ReactNode;
  error?: boolean;
}) {
  return (
    <div className="relative inline-block text-gray-700 w-full">
      <div className={`font-semibold mb-1 ${error ? "text-red-400" : ""}`}>
        {label}
      </div>
      {children}
    </div>
  );
}

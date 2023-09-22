import { ReactNode } from "react";

export default function FieldWrapper({
  label = "",
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="relative inline-block text-gray-700 w-full">
      <div className="font-semibold mb-1">{label}</div>
      {children}
    </div>
  );
}

"use client";

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-[100vh] overflow-auto md:flex-1">{children}</div>;
}

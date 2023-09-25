import Header from "./header";

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100vh] overflow-auto md:overflow-hidden md:flex-1">
      <div
        className="flex-grow-1 mb-[116px] w-full"
        style={{ height: "calc(100% - 116px)" }}
      >
        <Header />
        {children}
      </div>
    </div>
  );
}

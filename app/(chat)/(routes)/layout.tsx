export default function ChatLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-4xl h-full w-full">{children}</div>;
}

import { CommunitySubNav } from "./CommunitySubNav";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1">
      <CommunitySubNav />
      {children}
    </div>
  );
}

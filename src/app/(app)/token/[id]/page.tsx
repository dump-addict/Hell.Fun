import { notFound } from "next/navigation";
import { TokenPageView } from "@/components/token/TokenPageView";
import { getTokenById } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TokenPage({ params }: PageProps) {
  const { id } = await params;
  const token = await getTokenById(id);
  if (!token) notFound();
  return <TokenPageView token={token} />;
}

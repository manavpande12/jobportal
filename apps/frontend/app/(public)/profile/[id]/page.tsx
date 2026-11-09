import UserProfileView from "@/features/shared/components/UserProfileView";
type Prop = {
  params: Promise<{ id: string }>;
};

export default async function UserProfilePage({ params }: Prop) {
  const { id } = await params;

  return (
    <div className="p-2 xl:p-4 mt-18 flex min-h-[calc(100vh-4.5rem)] flex-col bg-card">
      <UserProfileView id={id} />
    </div>
  );
}

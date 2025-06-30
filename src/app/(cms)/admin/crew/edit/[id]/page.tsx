import { getCrewMemberById } from "@/lib/data";
import { notFound } from "next/navigation";
import EditCrewForm from "./edit-crew-form";

type Props = {
    params: { id: string };
};

export default async function EditCrewMemberPage({ params }: Props) {
  const member = await getCrewMemberById(params.id);

  if (!member) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Edit Crew Member</h1>
        <p className="text-muted-foreground truncate">
          Editing: {member.name}
        </p>
      </div>
      <EditCrewForm member={member} />
    </div>
  );
}

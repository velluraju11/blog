import CreateCrewForm from "./create-crew-form";

export default function CreateCrewMemberPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Create New Crew Member</h1>
        <p className="text-muted-foreground">
          Fill in the details to add a new crew member.
        </p>
      </div>
      <CreateCrewForm />
    </div>
  );
}

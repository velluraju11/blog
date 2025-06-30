import { getCrewMembers } from "@/lib/data";
import CrewList from "./crew-list";

export default async function CrewPage() {
  const crewMembers = await getCrewMembers();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">Crew Members</h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          Meet the architects and builders behind the Ryha revolution.
        </p>
      </section>

      <CrewList crewMembers={crewMembers} />
    </div>
  );
}

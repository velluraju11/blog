import { getCrewMembers } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

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

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {crewMembers.map((member) => (
          <Card key={member.id} className="text-center flex flex-col items-center p-6 border-border/50 hover:shadow-lg transition-shadow">
            <CardHeader className="p-0 mb-4">
              <Image 
                src={member.imageUrl}
                alt={member.name}
                width={128}
                height={128}
                className="rounded-full w-32 h-32 object-cover shadow-md"
                data-ai-hint="portrait person"
              />
            </CardHeader>
            <CardContent className="p-0">
              <CardTitle className="font-headline text-xl">{member.name}</CardTitle>
              <p className="text-primary font-medium mb-2">{member.role}</p>
              <p className="text-muted-foreground text-sm">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

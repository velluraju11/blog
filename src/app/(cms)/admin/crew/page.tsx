import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function ManageCrewPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Manage Crew Members</h1>
          <p className="text-muted-foreground">
            Add or manage details for Ryha's crew members.
          </p>
        </div>
        <Button asChild className="flex-shrink-0">
          <Link href="/admin/crew/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Crew Member
          </Link>
        </Button>
      </div>
    </div>
  );
}

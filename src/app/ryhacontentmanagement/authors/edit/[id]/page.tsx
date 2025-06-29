import { getAuthorById } from "@/lib/data";
import { notFound } from "next/navigation";
import EditAuthorForm from "./edit-author-form";

type Props = {
    params: { id: string };
};

export default async function EditAuthorPage({ params }: Props) {
  const author = await getAuthorById(params.id);

  if (!author) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Edit Author</h1>
        <p className="text-muted-foreground truncate">
          Editing: {author.name}
        </p>
      </div>
      <EditAuthorForm author={author} />
    </div>
  );
}

import CreateAuthorForm from "./create-author-form";

export default function CreateAuthorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Create New Author</h1>
        <p className="text-muted-foreground">
          Fill in the details to add a new author.
        </p>
      </div>
      <CreateAuthorForm />
    </div>
  );
}

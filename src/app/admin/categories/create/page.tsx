import CreateCategoryForm from "./create-category-form";

export default function CreateCategoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Create New Category</h1>
        <p className="text-muted-foreground">
          Enter the name for the new category.
        </p>
      </div>
      <CreateCategoryForm />
    </div>
  );
}

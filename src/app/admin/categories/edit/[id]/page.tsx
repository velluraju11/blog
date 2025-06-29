import { getCategoryById } from "@/lib/data";
import { notFound } from "next/navigation";
import EditCategoryForm from "./edit-category-form";

type Props = {
    params: { id: string };
};

export default async function EditCategoryPage({ params }: Props) {
  const category = await getCategoryById(params.id);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Edit Category</h1>
        <p className="text-muted-foreground truncate">
          Editing: {category.name}
        </p>
      </div>
      <EditCategoryForm category={category} />
    </div>
  );
}

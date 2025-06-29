import { getCategories } from "@/lib/data";
import GenerateForm from "./generate-form";

export default async function GeneratePage() {
  const categories = await getCategories();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI Content Generation</h1>
        <p className="text-muted-foreground">
          Use Gemini to automatically generate a blog post from a topic and keywords.
        </p>
      </div>
      <GenerateForm categories={categories} />
    </div>
  );
}

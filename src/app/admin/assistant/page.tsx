import AssistantForm from "./assistant-form";

export default function AssistantPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI Blog Assistant</h1>
        <p className="text-muted-foreground">
          Improve your blog posts for readability and SEO with AI suggestions.
        </p>
      </div>
      <AssistantForm />
    </div>
  );
}

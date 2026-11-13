import LoginForm from "./LoginForm";

// We used this as it is by searchParams by default prop 
// If we would have done by useSearchParams then We need to use Suspesne Boundry
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  const { error } = await searchParams;

  const errorMessage = typeof error === "string" ? error : undefined;

  return (
    <LoginForm error={errorMessage} />
  );
}
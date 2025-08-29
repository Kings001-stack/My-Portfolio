import HomeClient from "./HomeClient";

export default async function Home() {
  // Small delay to ensure app/loading.tsx is visible on initial render
  await new Promise((r) => setTimeout(r, 1700));
  return <HomeClient />;
}

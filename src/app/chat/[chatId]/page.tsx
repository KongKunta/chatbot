import llama from "@/app/lib/llama";

export default async function messages() {
  try {
    llama();
  } catch (error: any) {
    console.error("llama error: ", error);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}

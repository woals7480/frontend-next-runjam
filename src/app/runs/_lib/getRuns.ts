export async function getRuns() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/run`, {
    next: {
      tags: ["runs"],
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

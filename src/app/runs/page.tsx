"use client";

import { useQuery } from "@tanstack/react-query";
import { getRuns } from "./_lib/getRuns";

export default function RunsPage() {
  const { data } = useQuery({
    queryKey: ["runs"],
    queryFn: getRuns,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  console.log(data, "!!");
  return <>달리기 활동</>;
}

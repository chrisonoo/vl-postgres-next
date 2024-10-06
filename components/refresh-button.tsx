"use client";

import { useRouter } from "next/navigation";
import { useTransition, useCallback } from "react";

export default function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const refresh = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router]);

  return (
    <button
      className={`${
        isPending ? "cursor-not-allowed text-gray-400" : ""
      } text-sm text-gray-500 hover:text-gray-900`}
      disabled={isPending}
      onClick={refresh}
    >
      {isPending ? "Refreshing..." : "Refresh"}
    </button>
  );
}

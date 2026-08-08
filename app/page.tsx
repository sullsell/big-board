import { getRankings } from "@/lib/rankings";
import { BigBoard } from "@/components/big-board";

export default function Page() {
  const rankings = getRankings();
  return <BigBoard rankings={rankings} />;
}

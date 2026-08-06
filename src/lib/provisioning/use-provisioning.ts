import { useEffect, useState } from "react";

import { listRequests, listRules, metrics, onStoreChange } from "./store";

export function useProvisioning() {
  const [tick, setTick] = useState(0);
  useEffect(() => onStoreChange(() => setTick((t) => t + 1)), []);
  void tick;
  return { requests: listRequests(), rules: listRules(), stats: metrics() };
}

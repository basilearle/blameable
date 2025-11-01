import { postBlame } from '@blameable/client-codegen/core-api';
import type { StateCreator } from "zustand/vanilla";

import type { BaseState } from "../store";

export type BlameSlice = {
  blameCount: number;
  isBlamePending: boolean;
  onAssignBlame: () => Promise<void>;
};

export const createBlameSlice: StateCreator<
  BaseState,
  [],
  [],
  BlameSlice
> = (set, get) => ({
  blameCount: 0,
  isBlamePending: false,
  onAssignBlame: async () => {
    // no concurrent blame requests
    if (get().isBlamePending) return;

    set((state) => ({
      ...state,
      isBlamePending: true,
    }));

    const { error } = await postBlame();

    if (error) return;

    set((state) => ({
      ...state,
      blameCount: state.blameCount + 1,
      isBlamePending: false,
    }));
  },
});

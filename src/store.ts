import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Cryptocurrency, CryptoPrice, PairSchema } from "./types";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/crypto.service";

type CryptoStore = {
  cryptocurrencies: Cryptocurrency[];
  result: CryptoPrice;
  loading: boolean;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: PairSchema) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
  devtools((set) => ({
    cryptocurrencies: [],
    result: {} as CryptoPrice,
    fetchCryptos: async () => {
      const cryptocurrencies = await getCryptos();
      set(() => ({
        cryptocurrencies,
      }));
    },
    loading: false,
    fetchData: async (pair: PairSchema) => {
      set(() => ({ loading: true }));
      const result = await fetchCurrentCryptoPrice(pair);
      set(() => ({ result, loading: false }));
    },
  }))
);

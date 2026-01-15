import axios from "axios";
import {
  CryptoCurrenciesResponseSchema,
  CryptoPriceSchema,
} from "../schemas/cripto-schema";
import type { PairSchema } from "../types";

export async function getCryptos() {
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`;
  const {
    data: { Data },
  } = await axios.get(url);
  const result = CryptoCurrenciesResponseSchema.safeParse(Data);
  if (result.success) {
    return result.data;
  }
}

export async function fetchCurrentCryptoPrice(pair: PairSchema) {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${
    pair.cryptocurrency
  }&tsyms=${pair.currency}&api_key=${import.meta.env.VITE_API_KEY}`;

  const {
    data: { DISPLAY },
  } = await axios.get(url);

  const result = CryptoPriceSchema.safeParse(
    DISPLAY[pair.cryptocurrency][pair.currency]
  );
  if (result.success) {
    return result.data;
  }
}

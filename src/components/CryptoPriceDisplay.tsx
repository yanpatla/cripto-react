import { useMemo } from "react";
import { useCryptoStore } from "../store";
import Spinner from "./Spinner";

export default function CryptoPriceDisplay() {
  const result = useCryptoStore((state) => state.result);
  const loading = useCryptoStore((state) => state.loading);
  const hasResult = useMemo(
    () => !Object.values(result).includes("") && Object.keys(result).length > 0,
    [result]
  );
  return (
    <div className="result-wrapper">
      {loading ? (
        <Spinner />
      ) : (
        hasResult && (
          <>
            <h2>Price</h2>
            <div className="result">
              <img
                src={`https://cryptocompare.com/${result.IMAGEURL}`}
                alt="crypto img"
              />
              <div className="">
                <p>
                  The price is <span>{result.PRICE}</span>
                </p>
                <p>
                  High day price: <span>{result.HIGHDAY}</span>
                </p>
                <p>
                  Low day price: <span>{result.LOWDAY}</span>
                </p>
                <p>
                  Change 24h: <span>{result.CHANGEPCT24HOUR}</span>
                </p>
                <p>
                  Last update: <span>{result.LASTUPDATE}</span>
                </p>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

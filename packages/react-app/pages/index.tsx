import { useSocialConnect } from "@/SocialConnect/useSocialConnect";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const KNOWN_ISSUERS = {
  "0x7888612486844Bb9BE598668081c59A9f7367FBc": "MiniPay",
  "0x388612590F8cC6577F19c9b61811475Aa432CB44": "Libera",
  "0x6549aF2688e07907C1b821cA44d6d65872737f05": "Kaala",
};

export default function Home() {
  const { lookupAddress } = useSocialConnect();
  const [number, setNumber] = useState();
  const [lookupResults, setLookupResults] = useState();
  const [loading, setLoading] = useState(false);

  async function handleLookup() {
    if (number) {
      setLoading(true);
      try {
        let lookupResults = await lookupAddress(number);
        if (
          lookupResults &&
          lookupResults.accounts &&
          lookupResults.accounts.length
        ) {
          const lookupResultsProcessed = {};

          for (let i = 0; i < lookupResults.accounts.length; i++) {
            if (lookupResultsProcessed[lookupResults.issuers[i]]) {
              lookupResultsProcessed[lookupResults.issuers[i]].push(
                lookupResults.accounts[i]
              );
            } else {
              lookupResultsProcessed[lookupResults.issuers[i]] = [];
              lookupResultsProcessed[lookupResults.issuers[i]].push(
                lookupResults.accounts[i]
              );
            }
          }

          console.log(lookupResultsProcessed);

          setLookupResults(lookupResultsProcessed);
        } else {
          setLookupResults([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <main className="w-full flex justify-center text-gray-800 text-lg font-bold">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="flex flex-col justify-center space-y-4">
          <p>Lookup address using phone number</p>
          <PhoneInput
            placeholder="Enter phone number"
            value={number}
            onChange={setNumber}
          />
          <button
            className="border border-1 border-black py-2"
            onClick={handleLookup}
          >
            {loading ? "Loading..." : "Lookup"}
          </button>
        </div>
        {lookupResults !== undefined ? (
          Object.keys(lookupResults).length ? (
            <table className="border-2 border-black">
              <tr className="border border-black">
                <th className="p-4 text-left ">Issuer</th>
                <th className="p-4 text-left border-l-2 border-black">
                  Results
                </th>
              </tr>
              {Object.keys(lookupResults).map((issuer) => {
                return (
                  <tr>
                    <td className="p-4">
                      {KNOWN_ISSUERS[issuer] ? KNOWN_ISSUERS[issuer] : issuer}
                    </td>
                    <td className="p-4 border-l-2 border-black">
                      <div className="flex flex-col space-y-2">
                        {lookupResults[issuer].map((account) => {
                          return <p>{account}</p>;
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
          ) : (
            <p>No Result found</p>
          )
        ) : null}

        {/* {lookupResults !== undefined ? (
          Object.keys(lookupResults).length ? (
            Object.keys(lookupResults).map((issuer) => {
              return (
                <div className="flex border-2 border-black flex-col">
                  <div className="border-b-2 p-2 border-black">
                    <p>{issuer}</p>
                  </div>
                  <div className="flex mt-4 p-2 flex-col space-y-2">
                    {lookupResults[issuer].map((account) => {
                      return <p>{account}</p>;
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No Result found</p>
          )
        ) : null} */}
      </div>
    </main>
  );
}

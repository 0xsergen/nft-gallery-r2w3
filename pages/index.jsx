import { useState } from "react";
import { NFTCard } from "../components/nftCard";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [pageKey, setPageKey] = useState("");

  const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM";
  const fetchNFTs = async () => {
    let nfts;
    console.log("Fetching NFTs");
    const baseURL = `https://polygon-mainnet.g.alchemyapi.io/v2/${api_key}/getNFTs/`;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    if (pageKey == "") {
      console.log("fetchNFTs called without pageKey = ", pageKey);
      if (!collection.length) {
        const fetchURL = `${baseURL}?owner=${wallet}`;
        console.log("Fetching URL", fetchURL);
        nfts = await fetch(fetchURL, requestOptions).then((data) =>
          data.json()
        );
        if (nfts.pageKey) {
          console.log("pageKey = ", pageKey);
          setPageKey(nfts.pageKey);
        }
      } else {
        console.log("Fetching NFTs for collection owned by address");
        const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
        nfts = await fetch(fetchURL, requestOptions).then((data) =>
          data.json()
        );
        if (nfts.pageKey) {
          console.log("pageKey = ", pageKey);
          setPageKey(nfts.pageKey);
        }
      }
      setNFTs(nfts.ownedNfts);
    } else {
      console.log("fetchNFTs called with pageKey = ", pageKey);
      if (!collection.length) {
        const fetchURL = `${baseURL}?owner=${wallet}&pageKey=${pageKey}`;
        console.log("Fetching URL", fetchURL);
        nfts = await fetch(fetchURL, requestOptions).then((data) =>
          data.json()
        );
        if (nfts.pageKey) {
          console.log("pageKey = ", pageKey);
          setPageKey(nfts.pageKey);
        } else {
          console.log("pageKey = ", pageKey);
          setPageKey("");
        }
      } else {
        console.log("Fetching NFTs for collection owned by address");
        const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}&pageKey=${pageKey}`;
        nfts = await fetch(fetchURL, requestOptions).then((data) =>
          data.json()
        );
        if (nfts.pageKey) {
          console.log("pageKey = ", pageKey);
          setPageKey(nfts.pageKey);
        } else {
          console.log("pageKey = ", pageKey);
          setPageKey("");
        }
      }
      setNFTs((NFTs) => NFTs.concat(nfts.ownedNfts));
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: "GET",
      };
      const baseURL = `https://polygon-mainnet.g.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;

      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      console.log("nfts ", nfts);

      if (NFTs.length == 0) {
        setNFTs(nfts.nfts);
      } else {
        setNFTs((NFTs) => NFTs.concat(nfts.nfts));
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input
          disabled={fetchForCollection}
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
          type={"text"}
          placeholder="Add your wallet address"
        ></input>
        <input
          onChange={(e) => {
            setCollectionAddress(e.target.value);
          }}
          type={"text"}
          placeholder="Add the collection address"
        ></input>
        <label className="text-gray-600 ">
          <input
            onChange={(e) => {
              setFetchForCollection(e.target.checked);
            }}
            type={"checkbox"}
            className="mr-2"
          ></input>
          Fetch for collection
        </label>
        <button
          className={
            "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
          }
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection();
            } else fetchNFTs();
          }}
        >
          Let's go!{" "}
        </button>
      </div>
      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
        {NFTs.length &&
          NFTs.map((nft) => {
            return <NFTCard nft={nft}></NFTCard>;
          })}
      </div>
    </div>
  );
};

export default Home;

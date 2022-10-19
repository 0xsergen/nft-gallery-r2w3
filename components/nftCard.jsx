// to show addresses like 0xabcdef...abcd
function shortAddress(_address) {
  return _address.substring(0, 6) + "..." + _address.slice(-4);
}

export const NFTCard = ({ nft }) => {
  return (
    <div className="w-1/4 flex flex-col ">
      <div className="rounded-md">
        <img
          className="object-cover h-128 w-full rounded-t-md"
          src={nft.media[0].gateway}
        ></img>
      </div>
      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">
            Id: {shortAddress(nft.id.tokenId)}
          </p>{" "}
          <p className="text-gray-600">
            Collection Address: {shortAddress(nft.contract.address)}
          </p>
          <button
            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(nft.contract.address);
            }}
          >
            Copy
          </button>
        </div>

        <div className="flex-grow mt-2">
          <p className="text-gray-600">{nft.description}</p>
        </div>
      </div>
    </div>
  );
};

import { useMoralis, useWeb3Transfer } from "react-moralis";

const TransferEth = () => {
    const {Moralis} = useMoralis();
    const amount = 0.01
    const {fetch, error, isFetching} = useWeb3Transfer({
      amount: Moralis.Units.ETH(amount),
      receiver: "0x55C4C02aB309C6C6b5E2a361F5CC229f54ba3Ae0",
      type: "native",
    });
  
return (
    <div>
      {/* {error && <ErrorMessage error={error} />} */}
      <button onClick={() => {
        console.log('yohohoho');
        fetch()
        }} 
        disabled={isFetching}>
          Transfer
      </button>
    </div>
    )
  }

export default TransferEth
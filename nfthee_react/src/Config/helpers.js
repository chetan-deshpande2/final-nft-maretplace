import Swal from "sweetalert2";

export const getUnixTimeNowInSec = () => Math.floor(Date.now() / 1000);

export const getUnixTimeAfterMins = (mins) => getUnixTimeNowInSec() + mins * 60;

export const getUnixTimeAfterDays = (days) => getUnixTimeNowInSec() + days * 60 * 60 * 24;

export const generateRandomNumbers = () => Math.floor(Math.random() * 1000) + 1;

export const checkNetwork=(blockChain)=>{
    let network;
    if(blockChain==='Polygon Testnet'){
      network='80001'
    }
    if(blockChain==='Ethereum Sepolia Testnet'){
      network='11155111'
    } if(blockChain==='BSC Testnet'){
      network='97';
    } if(blockChain==='Harmony Testnet'){
      network='1666700000'
    }
    if(network===window.ethereum.networkVersion) {
        return 1
    }else{
        
        Swal.fire({
          icon: 'warning',
          title: "Select Network Mentioned In Nft",
          showConfirmButton: false,
          timer: 2500,
        })
      }
}
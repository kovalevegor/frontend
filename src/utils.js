import { ethers } from "ethers";
import { deployedAddresses } from "./deployed-addresses";
import LiquidityPoolABI from "./abis/LiquidityPool.json";
import MarginAccountABI from "./abis/MarginAccount.json";
import MockUniswapABI from "./abis/MockUniswap.json";

export const initializeContracts = async (signer) => {
    const mockUniswapContract = new ethers.Contract(
        deployedAddresses.MockUniswap,
        MockUniswapABI.abi,
        signer
    );

    const liquidityPoolContracts = deployedAddresses.LiquidityPools.map((address) => {
        return new ethers.Contract(address, LiquidityPoolABI.abi, signer);
    });

    const marginAccountContract = new ethers.Contract(
        deployedAddresses.MarginAccount,
        MarginAccountABI.abi,
        signer
    );

    return { mockUniswapContract, liquidityPoolContracts, marginAccountContract };
};

export const connectToMetaMask = async () => {
    if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        return { provider, signer };
    } else {
        throw new Error("MetaMask is not installed.");
    }
};
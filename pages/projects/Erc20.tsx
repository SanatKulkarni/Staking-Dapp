import HeroCard from "../../components/hero-card";
import styles from "../../styles/Home.module.css";
import { useContract, useContractMetadata, useTokenSupply, useAddress, useTokenBalance, Web3Button} from "@thirdweb-dev/react";
import { ERC20_CONTRACT_ADDRESS } from "../../constants/addresses";
import Link from "next/link";

export default function Erc20() {
    const address = useAddress();

    const {contract} = useContract(ERC20_CONTRACT_ADDRESS, "token");
    const {data:contractMetadata, isLoading:isContractMetadataLoading} = useContractMetadata(contract);
    const {data:tokenSupply, isLoading: tokenSupplyLoading} = useTokenSupply(contract);
    const {data:tokenBalance, isLoading:tokenBalanceLoading} = useTokenBalance(contract, address)

    return (
        <div className={styles.container}>
            <HeroCard 
                isLoading={isContractMetadataLoading}
                title={contractMetadata?.name!}
                description={contractMetadata?.description!}
                image={contractMetadata?.image!}
            />

            <div className={styles.grid}>
                <div className={styles.componentCard}>
                    <h2>Token Stats</h2>
                    {tokenSupplyLoading ? (
                        <p>Loading...</p>
                    ):(
                        <p>Total Supply: {tokenSupply?.displayValue} {tokenSupply?.symbol}</p>
                    )}
                </div>
                <div className={styles.componentCard}>
                    <h2>Token Balance</h2>
                    {tokenBalanceLoading ? (
                        <p>Loading...</p>
                    ):(
                        <p>Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
                    )}
                    <Web3Button contractAddress={ERC20_CONTRACT_ADDRESS} action={(contract) => contract.erc20.burn(10)}>Burn 10 Token</Web3Button>
                </div>
                <div className={styles.componentCard}>
                    <h2>Earn Tokens</h2>
                    <p>Earn more tokens by staking ERC721</p>
                    <div>
                        <Link href='/project/staking'>
                            <button className={styles.matchButton}>Stake ERC721</button>
                        </Link>
                        <Link href='/project/Erc721'>
                            <button className={styles.matchButton}>Claim ERC721</button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}
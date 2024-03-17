import HeroCard from "../../components/hero-card"
import Link from "next/link"
import styles from "../../styles/Home.module.css"
import { useAddress, useContractMetadata, useContract, Web3Button, useTotalCount, useClaimedNFTSupply, useOwnedNFTs, ThirdwebNftMedia} from "@thirdweb-dev/react"
import { ERC721_CONTRACT_ADDRESS } from "../../constants/addresses"

export default function Erc721(){
    const address = useAddress()
    const {contract} = useContract(ERC721_CONTRACT_ADDRESS, "signature-drop")
    const {data:contractMetadata, isLoading:isContractMetadataLoading} = useContractMetadata(contract);
    const {data:tokenSupply, isLoading: tokenSupplyLoading} = useTotalCount(contract);
    const {data:claimedSupply, isLoading:claimedSupplyLoading} = useClaimedNFTSupply(contract);
    const {data:ownedNFT, isLoading:ownedNFTLoading} = useOwnedNFTs(contract, address)



    return (
        <div className={styles.container}>
            <div className={styles.contractPage}>
                <HeroCard isLoading={isContractMetadataLoading} title={contractMetadata?.name!} description={contractMetadata?.description!} image={contractMetadata?.image!}></HeroCard>
                <div className={styles.grid}>
                    <div className={styles.componentCard}>
                        <h2>Claim ERC721</h2>
                        <p>Claim your ERC721 NFT</p>
                        <Web3Button contractAddress={ERC721_CONTRACT_ADDRESS} action={(contract) => contract.erc721.claim(1)} onSuccess={()=>alert("NFT claimed")}>Claim NFT</Web3Button>
                    </div>
                    <div className={styles.componentCard}>
                        <h2>Contract Stats</h2>
                        <p>Total Supply: 
                            {tokenSupplyLoading ? (
                                <p>Loading...</p>
                            ):(
                            ` ${tokenSupply?.toNumber()}`
                            )}
                        </p>
                        <p>Total Claimed: 
                            {claimedSupplyLoading ? (
                                <p>Loading...</p>
                            ):(
                                ` ${claimedSupply?.toNumber()}`
                            )}
                        </p>
                    </div>
                    <div className={styles.componentCard}>
                        <h2>Your NFTs:</h2>
                        <p>Owned NFTs: {ownedNFTLoading ? <p>Loading...</p> : <p>{ownedNFT?.length}</p>}</p>
                    </div>
                </div>

                <div className={styles.container}>
                    <h2>My NFTs:</h2>
                    <div className={styles.grid}>
                        {ownedNFTLoading ? (
                            <p>Loading...</p>
                        ) : (
                            ownedNFT?.map((nft) => (
                                <div className={styles.card} key={nft.metadata.id}>
                                    <ThirdwebNftMedia metadata={nft.metadata}></ThirdwebNftMedia>
                                    <div className={styles.cardText}><h2>{nft.metadata.name}</h2></div>
                                    <Link href={'/projects/Staking'}>
                                        <button className={styles.matchButton}>Stake NFT</button>
                                    </Link>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
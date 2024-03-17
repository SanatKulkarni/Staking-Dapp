import { useContract, useContractMetadata, Web3Button, useOwnedNFTs, useTotalCount, useAddress, useTotalCirculatingSupply } from '@thirdweb-dev/react'
import styles from '../../styles/Home.module.css'
import HeroCard from '../../components/hero-card'
import Link from 'next/link'
import { ERC1155_CONTRACT_ADDRESS } from '../../constants/addresses'



export default function Erc1155() {
    const address = useAddress()
    const {contract} = useContract(ERC1155_CONTRACT_ADDRESS, "edition-drop")
    const {data:contractMetadata, isLoading:isContractMetadataLoading} = useContractMetadata(contract);
    const {data:ownedNFTs, isLoading: ownedNFTsLoading} = useOwnedNFTs(contract, useAddress())
    const {data:contractNFTSupply, isLoading: contractNFTSupplyLoading} = useTotalCount(contract)
    const {data:totalCirculatingSupply, isLoading: totalCirculatingSupplyLoading} = useTotalCirculatingSupply(contract,0)


    return(
        <div className={styles.container}>
             <div className={styles.contractPage}>
             <HeroCard isLoading={isContractMetadataLoading} title={contractMetadata?.name!} description={contractMetadata?.description!} image={contractMetadata?.image!}></HeroCard>
             <div className={styles.grid}>
                <div className={styles.componentCard}>
                    <h2>Claim ERC1155</h2>
                    <p>Claim your ERC1155 NFT for 5 ERC20 Token</p>
                    <Web3Button contractAddress={ERC1155_CONTRACT_ADDRESS} action={(contract) => contract.erc1155.claim(0,1)} onSuccess={()=>alert("NFT claimed")}>Claim NFT</Web3Button>
                </div>
                <div className={styles.componentCard}>
                    <h2>Contract stats</h2>
                    <p>Total Supply: {contractNFTSupplyLoading ? (
                        <p>Loading...</p>
                    ):(
                        ` ${contractNFTSupply?.toNumber()}`
                    )}
                    </p>
                    <p>
                        Total Circulating Supply: {totalCirculatingSupplyLoading ? (
                            <p>Loading...</p>
                        ):(
                            ` ${totalCirculatingSupply?.toNumber()}`
                        )}
                    </p>
                </div>
                <div className={styles.componentCard}>
                    <h2>Your NFTs:</h2>
                    {ownedNFTsLoading ? (
                        <p>Loading...</p>
                    ):(
                        ownedNFTs?.map((nft) => (
                            <p key={nft.metadata.id}>
                                TokenID#{nft.metadata.id} Owned: {nft.quantityOwned}
                            </p>
                            
                        ))
                    )}
                </div>
             </div>
             </div>
        </div>
    )
}
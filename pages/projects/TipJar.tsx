import { Web3Button, useAddress, useContract, useContractMetadata, useContractRead } from '@thirdweb-dev/react'
import HeroCard from '../../components/hero-card'
import styles from '../../styles/Home.module.css'
import { TIP_JAR_ADDRESS } from '../../constants/addresses'
import { ethers } from 'ethers'

export default function TipJar() {
const address = useAddress();

    const{
        data:contract,
        isLoading: isContractLoading,
    } = useContract(TIP_JAR_ADDRESS)
    
    const{
        data:contractMetadata,
        isLoading: isContractMetadataLoading,
    }=useContractMetadata(contract)

    const{
        data: tipJarBalance,
        isLoading: isTipJarBalanceLoading
    } = useContractRead(contract, "getBalance",[])

    const{
        data:owner,
        isLoading: isOwnerLoading
    } = useContractRead(contract, "owner",[])


    return (
        <div className={styles.container}>
            <div className={styles.contractPage}>
                <HeroCard isLoading={isContractMetadataLoading} title={contractMetadata?.name!} image={contractMetadata?.image!} description={contractMetadata?.description!} />
                <div className={styles.grid}>
                    <div className={styles.componentCard}>
                        <h3>Leave a Tip if you like</h3>
                        <p>Tip in MATIC and record on blockchain</p>
                        <Web3Button contractAddress={TIP_JAR_ADDRESS} action={(contract) => contract.call("tip",[],{value:ethers.utils.parseEther("0.001")})} onSuccess={() => alert("Tip sent!")}>
                            {'Tip (0.001 MATIC)'}
                        </Web3Button>
                    </div>

                    <div className={styles.componentCard}>
                        <h3>TipJar Balance</h3>
                        <p>Total Tips:</p>
                        {isTipJarBalanceLoading ? (
                            <p>Loading...</p>
                        ):(
                            <p>{ethers.utils.formatEther(tipJarBalance)} MATIC</p>
                        )}
                        
                    </div>

                    <div className={styles.componentCard}>
                        <h3>Withdraw Balance</h3>
                        {isOwnerLoading ? (
                            <p>Loading...</p>
                        ):(
                            owner === address ? (
                                <Web3Button contractAddress={TIP_JAR_ADDRESS} action={(contract) => contract.call("withdrawTips")} onSuccess={() => alert("Tips withdrawn!")}>{'Owner please withdraw tips'}</Web3Button>
                            ):(
                                <p>You are not the owner</p>
                            )
                        )}
                    </div>
                </div>
            </div>   
        </div>
    )
}
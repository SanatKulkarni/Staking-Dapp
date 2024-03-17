import styles from '../../styles/Home.module.css'
import { Web3Button, useContract, useContractMetadata, useContractRead } from "@thirdweb-dev/react"
import { useAddress } from "@thirdweb-dev/react"
import { PROFILE_STATUS_ADDRESS } from '../../constants/addresses'
import HeroCard from '../../components/hero-card'
import { useState } from 'react'

export default function ProfileStatus(){
    const{contract} = useContract(PROFILE_STATUS_ADDRESS)

    const address = useAddress();

    const{
        data: contractMetadata,
        isLoading: isContractMetadataLoading,
    } = useContractMetadata(contract)

    const{
        data: profileStatus,
        isLoading: isProfileStatusLoading,
    } = useContractRead(contract,"userStatus",[address])

    const [status, setStatus] = useState("");

    const updateStatus = async () => {
        if(!profileStatus.exists){
            await contract?.call("createStatus", [status]);
            setStatus("");
            return;
        }
        await contract?.call("updateStatus", [status]);

        setStatus("");
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.contractPage}>
                <HeroCard isLoading={isContractMetadataLoading} title={contractMetadata?.name!} description={contractMetadata?.description!} image={contractMetadata?.image!} />

                <div className={styles.grid}>
                    <div className={styles.componentCard}>
                        <h2>Current Status:</h2>
                        {isProfileStatusLoading ? (
                            <p>Loading...</p>
                        ):(
                            profileStatus.exists ? profileStatus.statusMessage : <i>"No status"</i>
                        )}
                    </div>
                    <div className={styles.componentCard}>
                        <h2>Update Status</h2>
                        <div>
                            <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                            <Web3Button contractAddress={PROFILE_STATUS_ADDRESS} action={updateStatus} onSuccess={()=>alert("Status Updated")}>Update Status</Web3Button>
                        </div>
                    </div>
                    <div className={styles.componentCard}>
                        <h2>Status Exists</h2>
                        {isProfileStatusLoading ? (
                            <p>Loading...</p>
                        ):(
                            profileStatus.exists ? "True" : "False"
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
    
}
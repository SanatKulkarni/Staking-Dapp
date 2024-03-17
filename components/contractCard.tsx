//This thing would not work in future due to Third Party Cookie Blocking. Use Brave for Contract Development. Would Not Display IMG

import Link from "next/link";
import styles from "../styles/Home.module.css"
import { useContract, useContractMetadata, MediaRenderer } from "@thirdweb-dev/react";
type CardProps = {
    href: string;
    contractAddress: string;
    title: string;
    description: string;
}

export default function ContractCard(props: CardProps) {
    const {contract} = useContract(props.contractAddress);
    const {data:contractMetadata, isLoading:isContractMetadataLoading} = useContractMetadata(contract);
    return (
        <Link href={props.href} className={styles.card}>
            <MediaRenderer src={contractMetadata?.image} className={styles.cardImage} alt="ERC-20 image"/> 
            <div className={styles.cardText}>
                <h2 className={styles.gradientText1}>{props.title}</h2>
                <p>{props.description}</p>
            </div>
         </Link>
    )
}

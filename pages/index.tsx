import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Erc20 from "./projects/Erc20";
import Image from "next/image";
import Link from 'next/link';
import { NextPage } from "next";
import ContractCard from "../components/contractCard";
import { ERC20_CONTRACT_ADDRESS,ERC721_CONTRACT_ADDRESS,ERC1155_CONTRACT_ADDRESS,STAKING_CONTRACT_ADDRESS,PROFILE_STATUS_ADDRESS, TIP_JAR_ADDRESS } from "../constants/addresses";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            My{" "}
            <span className={styles.gradientText0}>
                Contracts.
              
            </span>
          </h1>

          <p className={styles.description}> Select contract to interact with</p>
        </div>

        <div className={styles.grid}>
          <ContractCard 
          href="/projects/Erc20"
          contractAddress={ERC20_CONTRACT_ADDRESS}
          title="ERC20 ->"
          description="Claim ERC20 Contract using this" 
          />

          <ContractCard 
          href="/projects/Erc721"
          contractAddress={ERC721_CONTRACT_ADDRESS}
          title="ERC721 ->"
          description="Claim ERC721 Contract using this" 
          />

          <ContractCard 
          href="/projects/Erc1155"
          contractAddress={ERC1155_CONTRACT_ADDRESS}
          title="ERC1155 ->"
          description="Claim ERC1155 Contract using this" 
          />

          <ContractCard 
          href="/projects/Staking"
          contractAddress={STAKING_CONTRACT_ADDRESS}
          title="Stake ERC721 ->"
          description="Stake ERC721 Contract using this" 
          />

          <ContractCard 
          href="/projects/ProfileStatus"
          contractAddress={PROFILE_STATUS_ADDRESS}
          title="Profile Status ->"
          description="Check Profile Status" 
          />

          <ContractCard 
          href="/projects/TipJar"
          contractAddress={TIP_JAR_ADDRESS}
          title="Tip Jar ->"
          description="Please support" 
          />
        </div>
         
      </div>
    </main>
  );
};

export default Home;

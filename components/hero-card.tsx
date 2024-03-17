import styles from '../styles/Home.module.css'
import { MediaRenderer } from '@thirdweb-dev/react'
type HeroCardProps = {
    isLoading: boolean;
    title: string;
    description: string;
    image: string;
}

export default function HeroCard(props: HeroCardProps) {
    return (
        <div>
            {props.isLoading ? (
                <div className={styles.loadingText}><p>Loading...</p></div>
            ):(
                <div className={styles.heroContainer}>
                    <MediaRenderer src={props.image} className={styles.heroImageContainer}></MediaRenderer>
                    <div className={styles.heroCardContent}>
                        <h1 className={styles.gradientText1}>{props.title}</h1>
                        <p>{props.description}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
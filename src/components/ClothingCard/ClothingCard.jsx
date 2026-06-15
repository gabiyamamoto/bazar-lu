import { Link } from "react-router-dom";
import styles from "./ClothingCard.module.css";

export default function ClothingCard({ roupa }) {
    return (
        <Link to={`/roupa/${roupa.id}`} className="block">
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    <img
                        src={roupa.imagem || "https://placehold.co/400x500"}
                        alt={roupa.titulo}
                        className={styles.image}
                    />
                    <div className={styles.imageOverlay} />
                    <span className={styles.badge}>
                        {roupa.tamanho}
                    </span>
                </div>

                <div className={styles.content}>
                    <h3 className={styles.title}>
                        {roupa.titulo}
                    </h3>
                    <p className={styles.size}>
                        Tamanho {roupa.tamanho}
                    </p>
                </div>
            </div>
        </Link>
    );
}
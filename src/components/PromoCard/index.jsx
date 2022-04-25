import React from "react";
import thumbnail from "../../assets/images/mock_thumbnail.jpg";
import styles from "./PromoCard.module.css";

const PromoCard = () => {
  return (
    <div className={"d-flex align-items-center me-3"}>
      <img src={thumbnail} alt="Thumbnail" className={styles.thumbnail} />
      <div className={styles.card}>
        <h4>Sebuah Seni untuk Bersikap Bodo Amat</h4>
        <p className={styles.author}>By. Mark Manson</p>
        <p className={`${styles.description} ellipsis max3 mb-3`}>
          "Selama beberapa tahun belakangan, Mark Manson—melalui blognya yang
          sangat populer tel ...
        </p>
        <h5 className={`${styles.price}`}>Rp. 59.000</h5>
        <button className={styles.button}>Add to Cart</button>
      </div>
    </div>
  );
};

export default PromoCard;

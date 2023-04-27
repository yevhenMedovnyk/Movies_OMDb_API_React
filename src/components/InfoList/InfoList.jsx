import React from "react";
import styles from "./InfoList.module.scss";

const InfoList = ({details}) => {
  const infoList = ["Director", "Actors", "Writer", "Awards", "Language", "Country", "Plot"];

  return (
    <div className={styles.info}>
      {" "}
      {infoList?.map((el, index) => (
        <p key={index}>
          {el}: <span>{details[el]}</span>
        </p>
      ))}
    </div>
  );
};

export default InfoList;

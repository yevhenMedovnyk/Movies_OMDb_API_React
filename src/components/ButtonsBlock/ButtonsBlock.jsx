import React from "react";
import styles from "./ButtonsBlock.module.scss";
import {removeFromWant, removeFromWatched} from "../../redux/slices/movieSlice";
import remove from "./../../images/trash.svg";
import {useDispatch} from "react-redux";

const ButtonsBlock = ({inWant, inWatched, addToWant, addToWatched, id, removeFromFirebase}) => {
  const dispatch = useDispatch();
  const onClickRemove = (list, id) => {
    removeFromFirebase(list);
    if (inWatched) {
      dispatch(removeFromWatched(id));
    } else {
      dispatch(removeFromWant(id));
    }
  };

  return (
    <>
      <div className={styles.btns}>
        <button disabled={inWant} onClick={addToWant} className={styles.addBtn}>
          Want
        </button>
        <button disabled={inWatched} onClick={addToWatched} className={styles.addBtn}>
          Watched
        </button>
      </div>

      {inWatched && (
        <img
          onClick={() => {
            onClickRemove("watched", id);
          }}
          className={styles.remove}
          src={remove}
          alt='remove'
        />
      )}
      {inWant && (
        <img
          onClick={() => {
            onClickRemove("want", id);
          }}
          className={styles.remove}
          src={remove}
          alt='remove'
        />
      )}
    </>
  );
};

export default ButtonsBlock;

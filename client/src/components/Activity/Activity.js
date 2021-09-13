import React from "react";
import style from "./Activity.module.css";

const Activity = ({
  handleClose,
  id,
  name,
  duration,
  difficulty,
  season,
  Countries,
}) => {
  return (
    <div key={id} className={style.container}>
      <div className={style.containerBtn}>
        <button onClick={() => handleClose(id)} className={style.btnClose}>
          X
        </button>
      </div>
      <div className={style.activity}>
        <h2>{name}</h2>
        <div className={style.cardSubtitle}>details:</div>
        <ul className={style.cardText}>
          <li className={style.cardList}>season: <span className={style.cardHighlight}>{season}</span></li>
          <li className={style.cardList}>difficulty: <span className={style.cardHighlight}>{difficulty}</span></li>
          <li className={style.cardList}>duration: <span className={style.cardHighlight}>{duration}</span></li>
        </ul>
        <div className={style.cardSubtitle}>where?</div>
        
        
        
        <div className={style.activity}>

        {Countries?.map((country) => (
          <div>
            <ul key={country.name} className={style.activity}>
              <li className={style.cardText}>{country.name}</li>
              <img
                src={country.flag}
                alt={`${country.name} flag`}
                className={style.flag}
              />
            </ul>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;

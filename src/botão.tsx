import React from "react";
import './styles/Escolha.css';
import { pegarFrases } from "./database/escolhas";

type Page = {
  atual: number;
  onButtonClick: () => void;
};

const ButtonCircleComponent: React.FC<Page> = ({ atual, onButtonClick }) => {
  return (
    <div className="button-container">
      {pegarFrases(atual).map((label, index) => (
        <button
          key={index}
          onClick={() => onButtonClick()}
          className={`button`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ButtonCircleComponent;

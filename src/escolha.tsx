import React from "react";
import './styles/Escolha.css';
import { pegarFrases } from "./database/escolhas";

type Page = {
  atual: number;
  selectedIndices: Record<number, number | null>;
  onButtonClick: (index: number, label: string) => void;
};

const ChoiceComponent: React.FC<Page> = ({ atual, selectedIndices, onButtonClick }) => {
  return (
    <div className="button-container">
      {pegarFrases(atual).map((label, index) => (
        <button
          key={index}
          className={`button ${selectedIndices[atual] === index ? "selected" : ""}`}
          onClick={() => onButtonClick(index, label)}
        >
          <div
            className={`circle ${selectedIndices[atual] === index ? "active" : ""}`}
          />
          {label}
        </button>
      ))}
    </div>
  );
};

export default ChoiceComponent;

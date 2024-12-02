import React, { useState, useEffect } from "react";
import "./styles/Fala.css";
import bmo from "./assets/BMO.png";
import { pegarFrases } from "./database/falas";

type Page = {
  atual: number;
  choices: string[];
  resultado: string;
};

const SpeechBubble: React.FC<Page> = ({ atual, choices, resultado }) => {
  const [text, setText] = useState(""); // Estado para armazenar o texto digitado
  const [loadingDots, setLoadingDots] = useState(""); // Para os "..." no carregamento
  const [resultadoVisivel, setResultadoVisivel] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  let frase = pegarFrases(atual).fala;
  const explicado = pegarFrases(atual).explicado;
  const [visitado, setVisitado] = useState<number[]>([]);

  useEffect(() => {
    setText("");
    setVisitado((prevVisitado) => {
      if (!prevVisitado.includes(atual)) {
        return [...prevVisitado, atual]; // Adiciona o número ao array
      }
      return prevVisitado; // Retorna o array sem modificações se o número já existir
    });
    if (atual === 5) escolhido();
  }, [atual]);

  function escolhido() {
    let modificada = frase;

    const campo: string[] = [
      "Consumo não informado",
      "Desempenho não informado",
      "Custo não informado",
      "Aplicação não informada",
    ];

    if (choices.length > 0) {
      let choiceIndex = 0;
      while (choiceIndex < choices.length) {
        if (!choices[choiceIndex].trim()) {
          modificada = modificada.replace("$", campo[choiceIndex]);
        } else {
          modificada = modificada.replace("$", choices[choiceIndex]);
        }
        choiceIndex++;
      }
    }

    setText(modificada);
  }

  useEffect(() => {
    if (atual === 6) {
      frase = resultado;
      if (resultado === "Buscando a melhor opção") {
        setResultadoVisivel(true);
      } else {
        setResultadoVisivel(false);
      }
  
      setText("");
    }
  }, [resultado]);
  

  useEffect(() => {
    if (atual === 6 || !visitado.includes(atual)) {
      if (atual === 6) frase = resultado;
      console.log(atual);
      let index = 0;
      const maxIndex = frase.length;

      const interval = setInterval(() => {
        setText((prevText) => {
          if (prevText.length <= index) {
            return prevText + frase.charAt(prevText.length);
          }
          return prevText;
        });

        index++;

        if (index >= maxIndex) {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    } else {
      if (atual === 5) escolhido();
      else setText(frase);
    }
  }, [frase, resultado]);

  // Repetição dos "..."
  useEffect(() => {
    if (atual === 6) {
      const interval = setInterval(() => {
        setLoadingDots((prevDots) => {
          if (prevDots.length < 3) return prevDots + ".";
          return "";
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [atual]);

  return (
    <div className={`speech-bubble-container ${atual === 6 ? "end" : ""}`}>
    <div className={`personagem ${atual === 6 ? "end" : ""}`}>

      {/* Balão de fala */}
      <div className={`speech-bubble-wrapper ${atual === 6 ? "end" : ""}`}>
        <div className="speech-bubble">
        <div className={`batata ${atual === 6 ? "end" : ""}`}>
            <p>
              {atual === 6 && resultadoVisivel
                ? `${text}${loadingDots}` // Adiciona os pontos diretamente ao final do texto
                : text.split("\n").map((line, index) => (
                  <span key={index}>
                      {line.split(/(\*\*.*?\*\*)/g).map((segment, i) =>
                        segment.startsWith("**") && segment.endsWith("**") ? (
                          <b key={i}>{segment.slice(2, -2)}</b>
                        ) : (
                          segment
                        )
                      )}
                      <br />
                    </span>
                  ))}
            </p>
          </div>
        </div>
        {/* Círculo com tooltip */}
        <div
          className={`info-circle ${explicado ? "visible" : ""}`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          >
          ?
          {showTooltip && (
            <div className={`tooltip ${showTooltip ? "visible" : ""}`}>
              {explicado}
            </div>
          )}
        </div>
      </div>

      {/* Imagem do personagem */}
      <img src={bmo} alt="Personagem" className="character-image" />
    </div>
    </div>
  );
};

export default SpeechBubble;
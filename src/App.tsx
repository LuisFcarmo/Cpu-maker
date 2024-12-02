import { useEffect, useState } from "react";
import "./styles/Form.css";
import Header from "./header";
import Fala from "./fala";
import ChoiceComponent from "./escolha";
import InputComponent from "./input";
import ButtonCircleComponent from "./botão";
import tratamento from "./database/tratamento";


function Form(){
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [choices, setChoices] = useState<string[]>(["", "", "", ""]);
  const [inputValue, setInputValue] = useState("");
  const [selectedIndices, setSelectedIndices] = useState<Record<number, number | null>>({});
  const [quantidade,setQuantidade] = useState<number>(6);
  const [preenchido,setPreenchido] = useState<boolean>(false);
  const [resultado,setResultado] = useState<string>("");

  useEffect(()=>{
    if(currentIndex ===4){
      if(choices[3].trim()) setInputValue(choices[3])
    }
  },[currentIndex])
  
  const handleSlideChange = (index: number) => {
    setCurrentIndex(index); // Atualiza o índice com o valor do Header
  };

  const handleChoiceSave = (choice: string) => {
    const updatedChoices = [...choices]; // Cria uma cópia do array
    updatedChoices[currentIndex-1] = choice; // Atualiza o índice atual com a escolha
    setChoices(updatedChoices);
    if(updatedChoices.every((p)=> p.trim())) setPreenchido(true); 
  };

  const handleChoiceClick = (index: number, label: string) => {
    setSelectedIndices((prev) => ({
      ...prev,
      [currentIndex]: prev[currentIndex] === index ? null : index, // Toggling do índice selecionado
    }));
    handleChoiceSave(label);
  };
  
  async function handleButtonClick(){
    if( currentIndex === 0 ) setCurrentIndex(currentIndex + 1);
    if( currentIndex === 5 ) {
      setQuantidade(7)
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setResultado("Buscando a melhor opção");
      const resultadoTratado = await tratamento(choices);
      setResultado(resultadoTratado);
    }
    if (currentIndex === 6) {
      setQuantidade(6)
      const updatedChoices = ["", "", "", ""];
      setChoices(updatedChoices); 
      setSelectedIndices({});
      setCurrentIndex(0)
      setInputValue("")
      setPreenchido(false);
      setResultado("");
    }
    
  };

  function enviar() {
    if (inputValue.trim()) {
      handleChoiceSave(inputValue); // Salva a escolha atual
      setInputValue(""); // Limpa o input após salvar
    }
  }


  useEffect(() => {
    if (choices[currentIndex - 1]?.trim() && currentIndex < quantidade) {
      setCurrentIndex(currentIndex + 1); // Avança para o próximo slide quando a escolha for válida
    }
  }, [choices]);

    return (
      <div className="form-container">
      {currentIndex !== 6 && (
        <Header
          totalSlides={quantidade}
          onSlideChange={handleSlideChange}
          atual={currentIndex}
        />
      )}
      <Fala atual={currentIndex} choices={choices} resultado={resultado}/>
      {(currentIndex === 0 || (currentIndex === 5 && preenchido) || currentIndex === 6) && (
        <ButtonCircleComponent
          atual={currentIndex}
          onButtonClick={handleButtonClick}
        />
      )}
      {(currentIndex === 1 || currentIndex === 2 || currentIndex === 3) && (
        <ChoiceComponent
          atual={currentIndex}
          selectedIndices={selectedIndices}
          onButtonClick={handleChoiceClick}
        />
      )}
      {currentIndex === 4 && (
        <InputComponent
          placeholder="Digite algo..."
          value={inputValue}
          onChange={(value) => setInputValue(value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") enviar();
          }}
        />
      )}
    </div>
    );
  };

export default Form;

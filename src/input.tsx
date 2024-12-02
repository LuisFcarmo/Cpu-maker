import React from "react";
import "./styles/Input.css";

type InputProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const InputComponent: React.FC<InputProps> = ({ placeholder, value, onChange,onKeyDown }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        className="styled-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default InputComponent;

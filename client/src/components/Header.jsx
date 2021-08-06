import React from "react";

export default function Header({ text }) {
  const newHeader = [];

  for (let letter in text) {
    newHeader.push(
      <span key={letter}className="header-letter">{text.charAt(letter)}</span>
    );
  }
  return <h2>{newHeader}</h2>;
}

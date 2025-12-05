import React, { useState, useEffect } from "react";
import "./Grid.css";

const init2D = (n, val) => Array.from({ length: n }, () => Array(n).fill(val));

export default function Grid({ n }) {
  const [queenBoard, setQueenBoard] = useState(() => init2D(n, false)); // stores queen positions

  const [text, setText] = useState(() => init2D(n, ""));

  const [color, setColor] = useState(() => init2D(n, "lightblue"));

  const recomputeText = (qBoard) => {
    const newText = init2D(n, "");

    const markAttacks = (row, col) => {
      // mark row
      for (let j = 0; j < n; j++) newText[row][j] = "x";
      // mark col
      for (let i = 0; i < n; i++) newText[i][col] = "x";

      if (row + 1 < n && col + 1 < n) newText[row + 1][col + 1] = "x";
      if (row + 1 < n && col - 1 >= 0) newText[row + 1][col - 1] = "x";
      if (row - 1 >= 0 && col + 1 < n) newText[row - 1][col + 1] = "x";
      if (row - 1 >= 0 && col - 1 >= 0) newText[row - 1][col - 1] = "x";
    };

    // Mark attacks for every queen on the board
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (qBoard[r][c]) {
          markAttacks(r, c);
        }
      }
    }

    // Place Q symbols
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (qBoard[r][c]) newText[r][c] = "Q";
      }
    }

    setText(newText);
  };

  const recomputeColor = (qBoard) => {
    const newColor = init2D(n, "lightblue");

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (qBoard[r][c]) newColor[r][c] = "red";
      }
    }

    setColor(newColor);
  };

  const toggle = (row, col) => {
    if (text[row][col] == "x") return;
    setQueenBoard((prev) => {
      const newBoard = prev.map((r) => [...r]);

      // If board has Q, remove it; otherwise place it
      newBoard[row][col] = !newBoard[row][col];

      // Recompute everything based on new queenBoard
      recomputeText(newBoard);
      recomputeColor(newBoard);

      return newBoard;
    });
  };

  const handleClick = (i) => {
    const row = Math.floor(i / n);
    const col = i % n;
    toggle(row, col);
  };

  return (
    <div
      className="grid-container"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${n}, 1fr)`,
        gridTemplateRows: `repeat(${n}, 1fr)`,
      }}
    >
      {Array.from({ length: n * n }).map((_, i) => {
        const row = Math.floor(i / n);
        const col = i % n;

        return (
          <div
            key={i}
            className="grid-item"
            onClick={() => handleClick(i)}
            style={{ backgroundColor: color[row][col] }}
          >
            {text[row][col]}
          </div>
        );
      })}
    </div>
  );
}

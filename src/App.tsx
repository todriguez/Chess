import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChess,
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessQueen,
  faChessRook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { GameState, changePiecePosition } from "./assets/features/GameSlice";
import ICell from "./assets/models/ICell";
import { PieceType, Team } from "./assets/models/IPiece";
import { RootState } from "./assets/store";

const iconSelector = (p: PieceType): IconProp => {
  switch (p) {
    case PieceType.ROOK:
      return faChessRook;
    case PieceType.KNIGHT:
      return faChessKnight;
    case PieceType.BISHOP:
      return faChessBishop;
    case PieceType.QUEEN:
      return faChessQueen;
    case PieceType.KING:
      return faChessKing;
    case PieceType.PAWN:
      return faChessPawn;

    default:
      return faChess;
  }
};

const colorSelector = (t: Team): CSSProperties => {
  let black = "#000",
    white = "#fff";
  if (t === Team.BLACK) {
    return {
      stroke: white,
      strokeWidth: 10,
      color: black,
    };
  } else {
    return { color: white, stroke: black, strokeWidth: 10 };
  }
};

const MainContainer = styled.div`
  text-align: center;
`;

const Button = styled.button`
  border: none;
  font-size: ${(window.innerWidth || 0) / 8 - 35}px;
  width: ${(window.innerWidth || 0) / 8 - 5}px;
  height: ${(window.innerWidth || 0) / 8 - 5}px;
  line-height: 1;
`;

const App: React.FunctionComponent = () => {
  const game = useSelector<RootState, GameState>((state) => state.game);
  const [selectedCell, setSelectedCell] = useState<string>("");
  const [potentialCells, setPotentialCells] = useState<string[]>([]);
  const dispatch = useDispatch();

  const cell_onClick = (c: ICell, i: number) => {
    if (!selectedCell) {
      if (c.piece) {
        setSelectedCell(c.code);
        let selectedCellIndex = -1;
        const selectedCellInstance = game.cells.find((s, index) => {
          selectedCellIndex = index;
          return s.code === c.code;
        });
        if (selectedCellInstance) {
          let hasPiece: Boolean = false;
          let potentialCells = game.cells.filter((gc: ICell, index) => {
            const result = selectedCellInstance?.piece?.checkNewPosition(
              selectedCellIndex,
              index
            );
            return result && index !== selectedCellIndex;
          });
          potentialCells = potentialCells
            .filter((pc) => {
              if (!hasPiece) hasPiece = !!pc.piece;
              return hasPiece;
            })
            .map((gc) => gc.code);
          setPotentialCells(potentialCells);
        }
      }
    } else if (c.code === selectedCell) {
      setSelectedCell("");
      setPotentialCells([]);
    } else {
      let selectedCellIndex = -1;
      const selectedCellInstance = game.cells.find((s, index) => {
        selectedCellIndex = index;
        return s.code === selectedCell;
      });
      if (selectedCellInstance?.piece?.checkNewPosition(selectedCellIndex, i)) {
        dispatch(
          changePiecePosition({
            currentIndex: selectedCellIndex,
            newIndex: i,
          })
        );
        setSelectedCell("");
        setPotentialCells([]);
      } else alert("incompatible movement");
    }
  };

  let primaryColor = "#D4ECDD",
    secondaryColor = "#112031";
  return (
    <MainContainer>
      {game.cells.map((c, i) => {
        if (i % 8 === 0 && (i / 8) % 2 !== 0) {
          primaryColor = "#112031";
          secondaryColor = "#D4ECDD";
        } else if (i % 8 === 0 && (i / 8) % 2 === 0) {
          primaryColor = "#D4ECDD";
          secondaryColor = "#112031";
        }
        const color = potentialCells.find((pc) => pc === c.code)
          ? "#FFCC33"
          : c.code === selectedCell
          ? "#345B63"
          : i % 2 === 0
          ? primaryColor
          : secondaryColor;
        return (
          <Button
            key={c.code}
            type="button"
            style={{ backgroundColor: color, border: "1px solid #fff" }}
            onClick={() => cell_onClick(c, i)}
          >
            {c.piece ? (
              <FontAwesomeIcon
                style={colorSelector(c.piece.team)}
                icon={iconSelector(c.piece.name)}
              />
            ) : (
              <span>&nbsp;</span>
            )}
          </Button>
        );
      })}
    </MainContainer>
  );
};

export default App;

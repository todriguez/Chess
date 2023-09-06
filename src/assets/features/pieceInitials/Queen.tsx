import IPiece, { PieceType, Team } from "../../models/IPiece";

const InitialQueen = (t: Team): IPiece => {
  return {
    name: PieceType.QUEEN,
    team: t,
    checkNewPosition: (currentLocation, newPosition) => {
      let leftCondition = Math.abs(currentLocation - newPosition) % 7 === 0;
      let rightCondition = Math.abs(currentLocation - newPosition) % 9 === 0;
      if (currentLocation > newPosition) {
        leftCondition = leftCondition && currentLocation % 8 < newPosition % 8;
        rightCondition =
          rightCondition && currentLocation % 8 > newPosition % 8;
      } else {
        leftCondition = leftCondition && currentLocation % 8 > newPosition % 8;
        rightCondition =
          rightCondition && currentLocation % 8 < newPosition % 8;
      }

      let rookCondition =
        newPosition % 8 === currentLocation % 8 ||
        (currentLocation - (currentLocation % 8) <= newPosition &&
          currentLocation + (7 - (currentLocation % 8)) >= newPosition);

      return leftCondition || rightCondition || rookCondition;
    },
  } as IPiece;
};

export default InitialQueen;

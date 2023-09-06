import IPiece, { PieceType, Team } from "../../models/IPiece";

const InitialKing = (t: Team): IPiece => {
  return {
    name: PieceType.KING,
    team: t,
    checkNewPosition: (currentLocation, newPosition) => {
      switch (currentLocation % 8) {
        case 0:
          return (
            currentLocation - newPosition === 7 ||
            newPosition - currentLocation === 1 ||
            newPosition - currentLocation === 9 ||
            Math.abs(newPosition - currentLocation) === 8
          );
        case 7:
          return (
            newPosition - currentLocation === 7 ||
            currentLocation - newPosition === 1 ||
            currentLocation - newPosition === 9 ||
            Math.abs(newPosition - currentLocation) === 8
          );
        default:
          return (
            Math.abs(currentLocation - newPosition) === 1 ||
            Math.abs(currentLocation - newPosition) === 7 ||
            Math.abs(currentLocation - newPosition) === 8 ||
            Math.abs(currentLocation - newPosition) === 9
          );
      }
    },
  } as IPiece;
};

export default InitialKing;

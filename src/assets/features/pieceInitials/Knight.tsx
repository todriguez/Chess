import IPiece, { PieceType, Team } from "../../models/IPiece";

const InitialKnight = (t: Team): IPiece => {
  return {
    name: PieceType.KNIGHT,
    team: t,
    checkNewPosition: (currentLocation, newPosition) => {
      if (currentLocation > newPosition) {
        return (
          (Math.abs(currentLocation - newPosition) === 15 &&
            currentLocation % 8 !== 7) ||
          (Math.abs(currentLocation - newPosition) === 17 &&
            currentLocation % 8 !== 0) ||
          (Math.abs(currentLocation - newPosition) === 6 &&
            currentLocation % 8 < 6) ||
          (Math.abs(currentLocation - newPosition) === 10 &&
            currentLocation % 8 > 2)
        );
      }
      return (
        (Math.abs(currentLocation - newPosition) === 15 &&
          currentLocation % 8 !== 0) ||
        (Math.abs(currentLocation - newPosition) === 17 &&
          currentLocation % 8 !== 7) ||
        (Math.abs(currentLocation - newPosition) === 6 &&
          currentLocation % 8 > 2) ||
        (Math.abs(currentLocation - newPosition) === 10 &&
          currentLocation % 8 < 6)
      );
    },
  } as IPiece;
};

export default InitialKnight;

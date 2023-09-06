import IPiece, { PieceType, Team } from "../../models/IPiece";

const InitialPawn = (t: Team): IPiece => {
  return {
    name: PieceType.PAWN,
    team: t,
    checkNewPosition: (currentLocation, newPosition) => {
      switch (t) {
        case Team.BLACK:
          return newPosition - currentLocation === 8;
        case Team.WHITE:
          return currentLocation - newPosition === 8;
        default:
          return false;
      }
    },
  } as IPiece;
};

export default InitialPawn;

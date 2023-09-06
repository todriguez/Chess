import IPiece, { PieceType, Team } from "../../models/IPiece";

const InitialBiShop = (t: Team): IPiece => {
  return {
    name: PieceType.BISHOP,
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
      return leftCondition || rightCondition;
    },
  } as IPiece;
};

export default InitialBiShop;

import { useSelector } from "react-redux";

export default function getCard(grpId) {
  // Default card not found to undefined
  return useSelector((state) =>
    state.database.cards ? state.database.cards[grpId] : undefined
  );
};
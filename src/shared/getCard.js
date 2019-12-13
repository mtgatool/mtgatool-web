import { useSelector, useStore } from "react-redux";

export default function getCard(grpId) {
  // Default card not found to undefined
  console.log("Get Card " + grpId);
  //const store = useStore();
  //console.log(store.getState().database.cards[grpId]);
  //return store.getState().database.cards[grpId] || undefined;
  return useSelector((state) =>
    state.database.cards ? state.database.cards[grpId] : undefined
  );
};

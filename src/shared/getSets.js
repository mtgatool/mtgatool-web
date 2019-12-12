import { useSelector } from "react-redux";

export default function getSets() {
  return useSelector((state) =>
    state.database.sets ? state.database.sets : undefined
  );
};

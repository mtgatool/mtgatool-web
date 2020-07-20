import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { reduxAction } from "../redux/webRedux";

type HoverCardHook = (() => void)[];

export default function useHoverCard(card: number): HoverCardHook {
  const dispatcher = useDispatch();

  const hoverIn = useCallback((): void => {
    reduxAction(dispatcher, {
      type: "SET_HOVER_IN",
      arg: { grpId: card }
    });
  }, [card, dispatcher]);

  const hoverOut = useCallback((): void => {
    reduxAction(dispatcher, { type: "SET_HOVER_OUT", arg: {} });
  }, [dispatcher]);

  return [hoverIn, hoverOut];
}

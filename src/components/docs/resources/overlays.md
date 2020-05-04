# Overlays

In MTG Arena Tool you can enable up to 5 different overlays at the same time, and each one can have its own mode and settings, currently available modes are;

- **Full Deck:** Shows your complete deck without changing the ammount of cards.
- **Library:** Shows your library on its current state, removing cards as you play them
- **Next Draw:** Show the probability for your next draw of certain types of cards, like Lands or Instants. You can toggle the sample size of the draw to be more than just the next draw.
- **Library and Odds:** Shows your library on its current state, like Library mode, but includes the odds of drawing the cards along with the quantities.
- **Opponent:** Shows only the cards your opponent played
- **Draft Pick:** Draft helper mode, shows rankings for cards in the current pack, the number of cards you own of each and allows you to see previous packs.
- **Draft Brew:** Shows your current draft pool/picks.
- **Action Log:** Shows the action log for this match as events happen, in a human-readable manner.

## Edit Mode

To edit an overlay's position and size you must first enter Edit Mode, to do this the default shortcut is `Alt + Shift + E`, alternatively you can do this directly in the Overlay settings page, or by right clicking on the tray icon. To Exit edit mode the process is the same.

> We made it this way because we have had issues detecting the mouse positions for cliking and hovering on the overlays while playing. This was mostly because we were "listening" to click and hover events of a transparent window on top of everything else, which is not really how things are made to work (most overlays only draw things on top and you do not interact with them). This is *still* an issue in Linux for example, that has a very different window management system and players have to run using Wine/Lutris, which makes clicking on the overlay impossible because of how Wine and Linux interact.
# Frequently Asked Questions

# Where do Draft ranks come from?

We used [Magic Community Set Rewview](https://www.mtgcommunityreview.com/) up until Theros: Beyond Death. But since they will no longer publish their reviews we moved to JustLolaMan, Moebius and Scottynada's ratings. They are all excellent, top tier drafters and friends of ours! Check out their Twitch Channels if you're interested:
[JustLolaman](https://www.twitch.tv/JustLolaman)
[M0bieus](https://www.twitch.tv/M0bieus)
[Scottynada](https://www.twitch.tv/Scottynada)

## Where can I submit issues / suggestions?

We are always on [our Discord](https://discord.gg/K9bPkJy), but we use [GitHub issues tracker](https://github.com/Manuel-777/MTG-Arena-Tool/issues) too.

## I get a black window.

This is a renderer error. We do our best to catch these, but some are simply fatal and crash the window. To investigate the issue:
1. Open the developer tools pressing `Alt + Shift + D`. This will open multiple debug windows with the window title "Developer Tools".
2. In the window whose title ends in `renderer/index.html` activate the "Console" tab and look for the **red** errors.
3. Include these errors when reporting an issue

## Black Overlays / Black screen with overlays enabled

To fix this issue, if you are on Windows, you should enable Transparency (on Windows 10) or Aero Effects (on Windows 7 and Vista). If your PC does not support transparency, overlays will not function correctly.

## "player.log contains no player data" error on startup

This issue is caused by the logs not having any user data (arena id) on them, This began happening after Historic Anthology 4 MTGA update due to a portion of the logs containing this information being removed by WoTC. Easiest workaround is to start a match to force the logs to have this information.

If you are a new or offline user (from whom we dont have any previous data or information) you will have to do this before starting tool in order for it to know who you are in MTG Arena.
# Frequently Asked Questions

# Where do Draft ranks come from?

We used [Magic Community Set Rewview](https://www.mtgcommunityreview.com/) up until Theros: Beyond Death. But since they will no longer publish their reviews we moved to JustLolaMan, Moebius and Scottynada's ratings. They are all excellent, top tier drafters and friends of ours! Check out their Twitch Channels if you're interested:
[JustLolaman](https://www.twitch.tv/JustLolaman)
[M0bieus](https://www.twitch.tv/M0bieus)
[Scottynada](https://www.twitch.tv/Scottynada)

## Where can I submit issues / suggestions?

We are always on [our Discord](https://discord.gg/K9bPkJy), but we use [GitHub issues tracker](https://github.com/mtgatool/mtgatool-desktop/issues) too.

## I get a black window.

This is a renderer error. We do our best to catch these, but some are simply fatal and crash the window. To investigate the issue:
1. Open the developer tools pressing `Alt + Shift + D`. This will open multiple debug windows with the window title "Developer Tools".
2. In the window whose title ends in `renderer/index.html` activate the "Console" tab and look for the **red** errors.
3. Include these errors when reporting an issue

## Black Overlays / Black screen with overlays enabled

To fix this issue, if you are on Windows, you should enable Transparency (on Windows 10) or Aero Effects (on Windows 7 and Vista). If your PC does not support transparency, overlays will not function correctly.

## Application is not tracking anything

It could be the log is not properly set, you can check in settings (both in the login screen and main settings page). Both show the state of the log; if its located where the app is looking for and if it is being parsed at all.

If the log is set properly then you can make sure the app is parsing it properly entering a match in MTGA and checking if the overlays work, just make sure you have at least one overlay enabled in Overlay settings (most times this is all true)

If you are still having issues you can open devtools using `Alt + Shift + D` as explained above, to seek for any errors.
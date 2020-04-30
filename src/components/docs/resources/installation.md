# Installation

Currently for Windows we provide an `.exe` installer, it is built with default installation settings and installs to `%APPDATA%/mtg-arena-tool/`, where you can see and backup your user data if needed.

On Linux systems we provide [.AppImage](https://appimage.org/) binaries, altrough you can run from source with very little efforts following our [instructions](https://github.com/Manuel-777/MTG-Arena-Tool/blob/master/CONTRIBUTING.md#running-from-source)

For Mac users we provide `.dmg` installers, but we currently cannot actively support it at the moment.

# Enable Detailed Logs

On all platforms, before you can run any software for MTG Arena you need to enable "plugins support" on it. To do so, open the game and navigate to your settings, and on "Account" enable "Detailed Logs (Plugin Support)", as shown below.

![Detailed logs](detailed-logs.png)

Once you do this close MTG Arena and start again so the game generates a new valid log the tracker can read. (else the tracker will still ask you to do this)


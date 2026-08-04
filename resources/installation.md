# Installation

## Windows

Currently for Windows we provide an `.exe` installer. It is built with default installation settings and installs to `%APPDATA%/mtgatool-desktop/`, where you can see and backup your user data if needed.

## macOS

For Mac users we provide a `.dmg` installer, built for **Apple Silicon**.

After dragging the app to your Applications folder, run this once in a terminal:

```
xattr -dr com.apple.quarantine "/Applications/MTG Arena Tool.app"
```

This is a one time setup, and does **not** require `sudo`. macOS quarantines anything downloaded from the internet and refuses to launch a quarantined app that is not signed with a paid Apple Developer ID, so without this step the app is closed immediately when you start it.

Once that is done the app runs as your normal user and can read MTG Arena while you play.

## Linux

On Linux systems you can run the `.AppImage` as-is. The installer is recommended instead, as it sets up the desktop integration — a menu entry and icon — so the app behaves like a normally installed one. This is a one time setup.

Head to the downloads page and download the latest `mtgatool-desktop-linux-installer.tar.gz`

In the terminal, navigate to the directory where the tar.gz was downloaded, then extract and install. `sudo` is needed because the installer writes to `/usr/share`.

```
mkdir mtgatool &&
tar -xf mtgatool-desktop-linux-installer.tar.gz -C mtgatool &&
cd mtgatool &&
sudo ./install.sh
```

You do **not** need `sudo` to run the application itself.


# Enable Detailed Logs

On all platforms, before you can run any software for MTG Arena you need to enable "plugins support" on it. To do so, open the game and navigate to your settings, and on "Account" enable "Detailed Logs (Plugin Support)", as shown below.

![Detailed logs - account menu](../../images/docs/detailed-logs-account.png)


![Detailed logs option](../../images/docs/detailed-logs-enabled.png)

Once you have done this, close MTG Arena and start it again so the game generates a new valid log the tracker can read (otherwise the tracker will still ask you to do this).


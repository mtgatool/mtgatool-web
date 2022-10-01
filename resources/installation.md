# Installation

## Windows

Currently for Windows we provide an `.exe` installer. It is built with default installation settings and installs to `%APPDATA%/mtgatool-desktop/`, where you can see and backup your user data if needed.

## OSX

For Mac users, we provide `.dmg` installers, but we currently cannot actively support it.

## Linux

On Linux systems, you can use the .AppImage as-is, but the recommended installer takes care of setting up the desktop integrations and daemon services. This is a one time setup. After that, both the daemon and mtgatool appimage can update automatically.

Head to the downloads page and download the latest `mtgatool-desktop-linux-installer.tar.gz`

In the terminal, navigate to the directory where the tar.gz was downloaded, then extract and install _(requires sudo to install the daemon service)_.
```
mkdir mtgatool &&
tar -xf mtgatool-desktop-linux-installer.tar.gz -C mtgatool &&
cd mtgatool &&
sudo ./install.sh
```

You can check the *mtga-tracker-daemon* service status using systemctl

```systemctl status mtga-trackerd.service```

or simply [open a browser tab and try the api](http://localhost:6842/status)! You can find more information about it at [mtga-tracker-daemon](https://github.com/frcaton/mtga-tracker-daemon).


# Enable Detailed Logs

On all platforms, before you can run any software for MTG Arena you need to enable "plugins support" on it. To do so, open the game and navigate to your settings, and on "Account" enable "Detailed Logs (Plugin Support)", as shown below.

![Detailed logs - account menu](../../images/docs/detailed-logs-account.png)


![Detailed logs option](../../images/docs/detailed-logs-enabled.png)

Once you have done this, close MTG Arena and start it again so the game generates a new valid log the tracker can read (otherwise the tracker will still ask you to do this).


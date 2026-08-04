# Output Logs

MTG Arena Tool works by reading MTG Arena's own output log. Everything the application knows about your games comes from that file, so it needs to be able to find it and read it while you play.

Before any of this works you must turn on detailed logging in the game — see [Enable Detailed Logs](./installation#enable-detailed-logs).

## Where the log lives

By default the application looks for `Player.log` in:

**Windows**

```
%APPDATA%\..\LocalLow\Wizards Of The Coast\MTGA\Player.log
```

**macOS**

```
~/Library/Logs/Wizards Of The Coast/MTGA/Player.log
```

**Linux** *(MTG Arena running under Wine)*

```
~/.wine/drive_c/user/<your-user>/AppData/LocalLow/Wizards of the Coast/MTGA/Player.log
```

If your installation puts the log somewhere else — a different Wine prefix, for example — you can point the application at it under **Settings**.

## The log is cleared when the game starts

MTG Arena empties `Player.log` every time it launches. Keep MTG Arena Tool running alongside the game so it reads events as they happen; anything written before the application was started, in an earlier session, is gone once the game restarts.

## What is not read

MTG Arena Tool does not track the `.html` logs stored under *Program Files*, where MTG Arena is installed.

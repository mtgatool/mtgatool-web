# Output Logs

Output logs are stored by default on `%APPDATA%\..\LocalLow\Wizards Of The Coast\MTGA\output_log.txt`, all trackers need to read this file to know what happens in MTG Arena while you play, see [Enable Detailed Logs](https://mtgatool/docs/introduction).

This file will be cleared when the game starts, so make sure you either run MTG Arena Tool before they are cleared, or that you have the app running alongside the game for it to read them.

MTG Arena Tool does not currently track `.html` logs (stored under Program Files, where MTG Arena is installed), however is is possible to edit the files manually to recover data no longer present in the regular output logs as detailed [here]()

# Parse multiple logs

Thanks to [AnnanFay](https://github.com/AnnanFay) we can parse multiple logs at once using CLI commands.

[link](https://github.com/Manuel-777/MTG-Arena-Tool/blob/master/scripts/load-logs.js)
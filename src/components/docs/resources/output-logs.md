# Output Logs

Output logs are stored by default on `%APPDATA%\..\LocalLow\Wizards Of The Coast\MTGA\output_log.txt`, all trackers need to read this file to know what happens in MTG Arena while you play, see [Enable Detailed Logs](./installation#enable-detailed-logs).

This file will be cleared when the game starts, so make sure you either run MTG Arena Tool before they are cleared, or that you have the app running alongside the game for it to read them.

MTG Arena Tool does not currently track `.html` logs (stored under Program Files, where MTG Arena is installed), however is is possible to edit the files manually to recover data no longer present in the regular output logs as detailed [here]()

# Parse multiple logs

Thanks to [AnnanFay](https://github.com/AnnanFay) we can parse multiple logs at once using CLI commands.
This is especially useful when you make backups of the logs and dont want to keep the tool running constantly, or there was an update that made it impossible to parse the logs for a time period.

> You need to [run mtgatool from source](https://github.com/Manuel-777/MTG-Arena-Tool/blob/master/CONTRIBUTING.md#running-from-source) to be able to do this!

In the folder where MTG Arena Tool is running, browse to `/scripts` and edit `batch_load_files.json`. Here you should enter the path of the logs you wish to parse using absolute paths.

To start the job just use
`npm run load-logs`

> Very old logs might have compatibility problems, use at your own risk!

You can check [AnnaFay's code](https://github.com/Manuel-777/MTG-Arena-Tool/blob/master/scripts/load-logs.js) for a more in-depth explanation.

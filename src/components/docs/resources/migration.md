# Migration from version 5

version 6 introduced a new account and database system, thus data from version 5 needs to be imported manually to your new account.

You will need to locate your .db file. This file contains all of your data from v5;

On windows: `%APPDATA%/Mtg-Arena-Tool/{uuid}.db`
On Linux: `~/.config/Mtg-Arena-Tool/{uuid}.db`
On OSX: `~/Library/Mtg-Arena/Tool/{uuid}.db`

Where {uuid} is your Wizards account user id. Something like "BB3D57B43268D3D1". Notice you might have multiple if you had many accounts.

If you don't have an account for v6 already, you will need to create one. You can do it from the desktop app or [here](https://mtgatool.com/register).

Once you have your new account set up, in the app navigate to settings > Data. Select your .db file and click on "Begin Migration".
Note this process could take a while depending on the size of your data and your speed connection, and the dialog should stay open during this process!


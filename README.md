# Save-Tabs
An extension for chrome which save all tabs before quitting the browser, and re-open all the same tabs during next browser activities.

## How to use
*Attention*:  Since I didn't upload this little app to chrome web store, the only way to use it is via `developer mode`.
### Preparation
- clone source code to your local directory
- go to chrome extensions setting page: `Settings` -> `Extensions`
- open chrome's developer mode (by checking the `Developer mode` box), now you can see the `Load unpacked extension...` button, click it
- select the `Save-Tabs` directory you cloned in the first step

### Usage
By now there're just two main buttons in this extension: `Save Tabs` and `Re-open Tabs`.
#### Save Tabs
Save all the opening tabs current in use of chrome, by click this button, all the urls will be saved, so you can quit chrome without worry about the webpages get lost. `Save Tabs` will override the tabs data saved last time, this means there will be only one copy of tabs data exists in the chrome storage.
#### Re-open Tabs
The `Re-open Tabs` button will re-open all the tabs you saved last time by click the `Save Tabs` button, the clicking operation will not remove the tabs data saved before, it means next time if you want to bring all the same tabs into chrome again, just click `Re-open Tabs` button, as long as the `Save Tabs` button didn't get clicked since that time (since `Save Tabs` will override the tabs data saved last time).
## Chrome version requirement
Since Chrome 20.
## Permissions
This extension needs the `tabs` (current active webpages) and `storage` (store tabs data) permissions.
## TO-DO features
[Issues](https://github.com/b1ns4oi/Save-Tabs/issues)

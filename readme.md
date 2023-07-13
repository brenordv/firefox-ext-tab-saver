## Firefox Extension Conceptual Blueprint

### Name: **TabSaver**

#### 1. Installation and Activation:

User installs the extension from Firefox's "Add-ons" page. The user would search for "TabSaver" and click on the "Add to Firefox" button. After the extension is added, a small icon of TabSaver (a stylized document icon) would appear on the Firefox toolbar. Clicking on this icon would enable/disable the extension, showing a different color or an added tick mark when enabled.

#### 2. User Interface and Functionality:

The TabSaver icon would lead to a dropdown upon click, containing the following elements:

1. **Status Switch**: At the top of the dropdown, there would be a switch indicating whether the extension is currently active or not. Users could toggle this to enable/disable the extension.

2. **Export Button**: A big blue button labeled 'Export Tabs'. Clicking this button would trigger the tab exportation process, collating the title and URL of each tab into a markdown file.

3. **Settings Icon**: A small gear icon in the bottom right corner, which would lead to the extension's settings page.

4. **About Section**: A small section in the bottom left corner displaying the version of the extension and an 'About Us' link redirecting to the extension's official website for support.

The **Settings Page** would allow users to manage a variety of preferences, including:

1. **Tab Selection**: Choose whether the extension saves all tabs, only tabs in the current window, or manually selected tabs.

2. **Loading Tab Behavior**: Choose how the extension handles tabs that are still loading. The options would include 'Wait Until Loaded', 'Skip', or 'Save URL Only'.

3. **Duplicate Tab Behavior**: Decide if duplicate tabs (same URL) should be ignored, or if the URL should be saved multiple times.

4. **File Naming Scheme**: Customize the markdown file's name beyond the default 'session_<unix_timestamp>'.md'.

#### 3. Exporting Tabs and Markdown File Generation:

Once the user clicks the 'Export Tabs' button, the extension will scan all tabs based on the settings from the settings page (all tabs, current window, or selected tabs). It would gather the title and URL of each tab and compose a markdown file.

Each tab would be formatted in the markdown file as follows:
```
- [Tab Title](Tab URL)
```

In case of any loading tabs, based on the settings, the extension would wait until loaded, skip the tab, or save the URL only.

If any duplicate tabs are found, the extension would act according to the preferences set in the settings page (ignore or save multiple times).

Once all tabs are processed, the markdown file would be named as per the user's preference, defaulting to 'session_<unix_timestamp>.md' and automatically downloaded to the default download folder.

#### 4. Edge Cases and Solutions:

1. **Handling Multiple Windows**: By default, the extension could be set to only export tabs from the current window, but an option in the settings page would allow users to export tabs from all windows.

2. **Loading Tabs**: As mentioned earlier, the extension could either wait until all tabs are fully loaded, skip the loading tabs, or include the tabs but only save the URL, not the title.

3. **Privacy Mode**: If the user is using Firefox's privacy mode, the extension could be disabled to respect user privacy. A user can enable it in the settings if desired.

4. **Large Number of Tabs**: For users with a large number of tabs, the extension could display a progress bar or notification indicating the tab exporting process's progress and estimated time to complete.

5. **Duplicate Tabs**: Users can decide if they want duplicate tabs to be ignored or included in the markdown file.

In conclusion, the TabSaver extension will serve as an efficient tool to export open tabs into a markdown file. By incorporating intuitive settings, users can manage their tab exports effectively, catering to multiple edge cases. The extension aims to enhance productivity and provide convenience by maintaining an easy-to-navigate user interface.

# Structure
```
tab-saver-extension/
│
├── icons/                    # Directory for icon files
│   └── tab-saver-48.png
│
├── popup/                    # Directory for popup UI files
│   ├── tab-saver.html
│   └── tab-saver.css
│
├── background.js             # JavaScript for background processing
├── manifest.json             # Manifest file
└── README.md                 # Project documentation
```

# web-ext
The web-ext tool provides commands for running your extension in Firefox (web-ext run), linting your code (web-ext 
lint), and building your extension for distribution (web-ext build).

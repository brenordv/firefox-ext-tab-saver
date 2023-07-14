const removeLineBreaks = (text) => {
    return text.replace(/(\r\n|\n|\r)/gm, '');
}

const getTabs = async (allWindows) => {
    // Define the config for the tabs query
    const config = allWindows ? {} : {currentWindow: true};

    // Get all tabs in the current window or all windows
    return await browser.tabs.query(config);
};

const generateFilename = () => {
    return `session_${Date.now()}.md`;
};

const appendMarkdownDescription = (markdownText) => {
    // Get the optional description
    const description = document.getElementById('description')?.value.trim();
    if (!description || description.length === 0) {
        return markdownText;
    }

    return `${markdownText}${description}\n`;
};

const getTabsText = (tabs) => {
    if (!tabs || tabs.length === 0) {
        return null;
    }

    const urlsAdded = [];
    let tabsText = '';
    for (const tab of tabs) {
        if (urlsAdded.includes(tab.url)) {
            continue;
        }
        tabsText += `- [${removeLineBreaks(tab.title)}](${tab.url})\n`;
        urlsAdded.push(tab.url);
    }

    return tabsText;
}

function getSessionDetails(tabs, filename, allWindows) {
    let sessionDetails = '\n\n# Session Details\n';
    sessionDetails += `**Date:** ${new Date().toLocaleString()}\n`;
    sessionDetails += `**Window:** ${allWindows ? 'All' : 'Current'}\n`;
    sessionDetails += `**Tab Count:** ${tabs.length}\n`;
    sessionDetails += '**Filename:** ' + filename + '\n';
    return sessionDetails;
}

function getFooter() {
    let footer = '---\n';
    footer += 'Generated by Tab Saver\n';
    footer += 'https://github.com/brenordv/firefox-ext-tab-saver.git\n';
    footer += 'https://raccoon.ninja\n';
    return footer;
}

function generateMarkdownContent(tabs, filename, allWindows) {
    let markdownContent = '# Open Tabs\n';
    markdownContent = appendMarkdownDescription(markdownContent);
    markdownContent += '\n';

    const tabsText = getTabsText(tabs);
    if (tabsText) {
        markdownContent += tabsText;
    }

    markdownContent += getSessionDetails(tabs, filename, allWindows);
    markdownContent += '\n\n';
    markdownContent += getFooter();
    return markdownContent;
}

function preparePayloadToSave(markdownContent) {
    // Convert markdown content to a Blob
    const blob = new Blob([markdownContent], {type: 'text/markdown'});

    // Create a URL for the Blob
    return URL.createObjectURL(blob);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('exportBtn').addEventListener('click', async () => {
        try {
            // Check if the user wants to include all windows
            const allWindows = document.getElementById('allWindows').checked;

            // Get all tabs in the current window or all windows
            const tabs = await getTabs(allWindows);

            // Define the filename
            const filename = generateFilename();

            // Generate markdown content
            const markdownContent = generateMarkdownContent(tabs, filename, allWindows);

            // Prepare the payload to save
            const blobUrl = preparePayloadToSave(markdownContent);

            // Save the markdown file
            browser.downloads.download({
                url: blobUrl,
                filename: filename,
                saveAs: false
            });

            document.getElementById('statusMsg').innerText = 'Tabs exported successfully!';
        } catch (error) {
            console.error('Error exporting tabs:', error);
            document.getElementById('statusMsg').innerText = 'Error exporting tabs. See console for details.';
        }
    });
});

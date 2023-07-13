document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('exportBtn').addEventListener('click', async () => {
        try {
            // Check if the user wants to include all windows
            const allWindows = document.getElementById('allWindows').checked;

            // Sort out the config for getting the open tabs
            const config = allWindows ? {} : {currentWindow: true};

            // Get all tabs in the current window or all windows
            const tabs = await browser.tabs.query(config);

            // Define the filename
            const filename = `session_${Date.now()}.md`;

            // Get the optional description
            const description = document.getElementById('description').value.trim();

            // Generate markdown content
            let markdownContent = '# Open Tabs\n';

            if (description && description.trim().length > 0) {
                markdownContent += `${description}\n`;
            }

            markdownContent += '\n';

            for (const tab of tabs) {
                markdownContent += `- [${tab.title}](${tab.url})\n`;
            }

            markdownContent += '\n\n# Session Details\n';
            markdownContent += `**Date:** ${new Date().toLocaleString()}\n`;
            markdownContent += `**Window:** ${allWindows ? 'All' : 'Current'}\n`;
            markdownContent += `**Tab Count:** ${tabs.length}\n`;
            markdownContent += '**Filename:** ' + filename + '\n';

            markdownContent += '\n\n';

            markdownContent += '---\n';
            markdownContent += 'Generated by Tab Saver\n';
            markdownContent += 'https://github.com/brenordv/firefox-ext-tab-saver.git\n';
            markdownContent += 'https://raccoon.ninja\n';

            // Convert markdown content to a Blob
            const blob = new Blob([markdownContent], {type: 'text/markdown'});

            // Create a URL for the Blob
            const blobUrl = URL.createObjectURL(blob);

            // Download the markdown file
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

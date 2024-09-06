document.addEventListener('DOMContentLoaded', () => {
    const resultText = document.getElementById('result-text');
    const downloadBtn = document.getElementById('download-btn');

    // Retrieve the written text from sessionStorage
    const writtenText = sessionStorage.getItem('writtenText');

    // Display the text
    if (resultText) {
        resultText.textContent = writtenText || 'No text was saved.';
    }

    // Download functionality
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (!writtenText) {
                alert('No text to download.');
                return;
            }
            const blob = new Blob([writtenText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'dangerous_writing.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    } else {
        console.error('Download button not found in the DOM');
    }

    // Clear the sessionStorage after retrieving the text
    sessionStorage.removeItem('writtenText');
});
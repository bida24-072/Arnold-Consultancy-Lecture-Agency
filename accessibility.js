// Accessibility Controls
document.getElementById('high-contrast-btn').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

document.getElementById('text-size-btn').addEventListener('click', () => {
    if (document.body.classList.contains('xlarge-text')) {
        document.body.classList.remove('large-text', 'xlarge-text');
    } else if (document.body.classList.contains('large-text')) {
        document.body.classList.add('xlarge-text');
    } else {
        document.body.classList.add('large-text');
    }
});

document.getElementById('read-page-btn').addEventListener('click', readPageContent);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt+V for voice control
    if (e.altKey && e.key === 'v') {
        document.getElementById('voice-control-btn').click();
    }
    // Alt+C for high contrast
    if (e.altKey && e.key === 'c') {
        document.getElementById('high-contrast-btn').click();
    }
});

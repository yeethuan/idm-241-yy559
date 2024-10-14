function truncateSnippet(selector, wordLimit) {
    const element = document.querySelector(selector);
    const text = element.innerText;
    const words = text.split(' ');

    if (words.length > wordLimit) {
        const truncatedText = words.slice(0, wordLimit).join(' ') + '...';
        element.innerText = truncatedText;
    }
}

truncateSnippet('.snippet', 26);
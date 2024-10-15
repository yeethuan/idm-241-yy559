




// EMAIL SNIPPET WORD LENGTHS
const originalText = document.querySelector('.snippet').innerText;

function truncateSnippet(selector, wordLimit) {
    const element = document.querySelector(selector);
    const words = originalText.split(' '); 

    if (words.length > wordLimit) {
        const truncatedText = words.slice(0, wordLimit).join(' ') + '...';
        element.innerText = truncatedText;
    } else {
        element.innerText = originalText; 
    }
}

function applySnippetTruncation() {
    const mediaQuery = window.matchMedia('(max-width: 1500px)');

    if (mediaQuery.matches) {
        truncateSnippet('.snippet', 18);  
    } else {
        truncateSnippet('.snippet', 26);  
    }
}

applySnippetTruncation();

window.addEventListener('resize', applySnippetTruncation);
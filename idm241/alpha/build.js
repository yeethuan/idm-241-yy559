
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
        truncateSnippet('.snippet', 20);  
    }
}

applySnippetTruncation();

window.addEventListener('resize', applySnippetTruncation);


// const sidebar = document.querySelector('.sidebar');
// const menuToggle = document.querySelector('.menu-toggle');




// // SIDEBAR
// menuToggle.addEventListener('click', () => {
//     if (sidebar.style.display === 'none' || sidebar.style.display === '') {
//         sidebar.style.display = 'block';  
//     } else {
//         sidebar.style.display = 'none';   
//     }
// });






// TRASH
let trashCount = 0;
let lastDeletedEmail = null;
let undoTimeout = null;

function showUndoPopup() {
    const popup = document.getElementById('undoPopup');
    popup.style.display = 'block';

    undoTimeout = setTimeout(() => {
        if (lastDeletedEmail) {
            lastDeletedEmail.remove();
            lastDeletedEmail = null; 
            popup.style.display = 'none';
        }
    }, 5000);
}

function handleDeleteEmail(event) {
    const emailContent = event.target.closest('.email-content'); 
    if (emailContent) {
        emailContent.style.display = 'none'; 
        lastDeletedEmail = emailContent;
        trashCount++; 
        document.querySelector('.trash-count').innerText = `(${trashCount})`; 
        showUndoPopup(); 
    }
}

function undoDeleteEmail() {
    if (lastDeletedEmail) {
        lastDeletedEmail.style.display = 'flex';
        trashCount--; 
        document.querySelector('.trash-count').innerText = `(${trashCount})`; 
        lastDeletedEmail = null; 
        clearTimeout(undoTimeout); 
        document.getElementById('undoPopup').style.display = 'none'; 
    }
}

document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', handleDeleteEmail);
});

document.getElementById('undoButton').addEventListener('click', undoDeleteEmail);
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
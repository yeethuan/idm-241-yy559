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
    const emailContainer = event.target.closest('.email-container'); 
    if (emailContainer) {
        emailContainer.style.display = 'none';
        lastDeletedEmail = emailContainer;
        trashCount++; 
        document.querySelector('.trash-count').innerText = trashCount;
        showUndoPopup(); 
    }
}

function undoDeleteEmail() {
    if (lastDeletedEmail) {
        lastDeletedEmail.style.display = 'flex';
        trashCount--;
        document.querySelector('.trash-count').innerText = trashCount; 
        lastDeletedEmail = null;
        clearTimeout(undoTimeout); 
        document.getElementById('undoPopup').style.display = 'none';
    }
}

document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', handleDeleteEmail);
});

document.getElementById('undoButton').addEventListener('click', undoDeleteEmail);


// To track the currently pinned email
let pinnedEmail = null; 

// Function to handle pinning
function handlePinEmail(event) {
    const emailContainer = event.target.closest('.email-container');

    // Check if there is an already pinned email and unpin it
    if (pinnedEmail && pinnedEmail !== emailContainer) {
        pinnedEmail.classList.remove('pinned');
    }

    // Toggle pinning on the clicked email
    emailContainer.classList.toggle('pinned');
    if (emailContainer.classList.contains('pinned')) {
        pinnedEmail = emailContainer;
        emailContainer.style.order = -1; // Move to top by setting order in flex
    } else {
        pinnedEmail = null;
        emailContainer.style.order = 0; // Reset position
    }
}

// Add event listener for pin icon
document.querySelectorAll('.fa-thumbtack').forEach(button => {
    button.addEventListener('click', handlePinEmail);
});

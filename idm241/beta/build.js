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


function handlePinEmail(event) {
    const emailContainer = event.target.closest('.email-container');
    const pinIcon = emailContainer.querySelector('.fa-thumbtack');

    // Toggle pin active state and set order
    const isPinned = emailContainer.classList.toggle('pinned');
    pinIcon.classList.toggle('active', isPinned);

    // If there’s a previously pinned email, reset its order and state
    if (pinnedEmail && pinnedEmail !== emailContainer) {
        pinnedEmail.classList.remove('pinned');
        pinnedEmail.querySelector('.fa-thumbtack').classList.remove('active');
        pinnedEmail.style.order = ''; // Reset order for previous pinned email
    }

    // Update pinned email and set order if pinned, else reset
    if (isPinned) {
        pinnedEmail = emailContainer;
        emailContainer.style.order = '-1'; // Set order to move to the top
        emailContainer.classList.add('move-to-top');
        setTimeout(() => {
            emailContainer.classList.remove('move-to-top');
        }, 500);
    } else {
        pinnedEmail = null;
        emailContainer.style.order = ''; // Reset position when unpinned
    }
}

// Attach the click event to each pin icon
document.querySelectorAll('.fa-thumbtack').forEach(pinIcon => {
    pinIcon.addEventListener('click', handlePinEmail);
});
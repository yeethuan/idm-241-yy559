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
        emailContainer.classList.add('slide-to-trash');

        emailContainer.addEventListener('transitionend', () => {
            emailContainer.style.display = 'none';
        }, { once: true });

        lastDeletedEmail = emailContainer;
        trashCount++;
        document.querySelector('.trash-count').innerText = `(${trashCount})`;
        showUndoPopup();
    }
}

function undoDeleteEmail() {
    if (lastDeletedEmail) {
        lastDeletedEmail.style.display = 'block';
        lastDeletedEmail.classList.remove('slide-to-trash');

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


// PIN EMAIL --------------------------------------------------------------------------------
let pinnedEmail = null;  

function handlePinEmail(event) {
    const emailContainer = event.target.closest('.email-container');
    const pinIcon = emailContainer.querySelector('.fa-thumbtack');

    const isPinned = emailContainer.classList.toggle('pinned');
    pinIcon.classList.toggle('active', isPinned);

    if (isPinned) {
        // Remove pinned class from any other email
        if (pinnedEmail && pinnedEmail !== emailContainer) {
            pinnedEmail.classList.remove('pinned');
            pinnedEmail.querySelector('.fa-thumbtack').classList.remove('active');
            pinnedEmail.style.order = ''; // Reset order
        }

        // Set the current email as pinned
        pinnedEmail = emailContainer;
        emailContainer.style.order = '-1'; // Move to top

        // Add the jump animation to the pin icon
        pinIcon.classList.add('jump');

        // Remove the jump class after animation
        setTimeout(() => {
            pinIcon.classList.remove('jump');
        }, 400);
    } else {
        pinnedEmail = null;
        emailContainer.style.order = ''; // Reset order when unpinned
    }
}

document.querySelectorAll('.fa-thumbtack').forEach(pinIcon => {
    pinIcon.addEventListener('click', handlePinEmail);
});


// FLAG EMAIL --------------------------------------------------------------------------------
document.querySelectorAll('.fa-flag').forEach(flag => {
    flag.addEventListener('mousedown', () => {
        flag.classList.toggle('active'); 
    });
});


// RESPOND EMAIL --------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const respondIcons = document.querySelectorAll('.fa-envelope-open');
    const respondPopup = document.getElementById('respondPopup');
    const closePopup = document.getElementById('closePopup');
    const sendResponse = document.getElementById('sendResponse');

    // Show the popup when the envelope icon is clicked
    respondIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event from bubbling
            respondPopup.style.display = 'block'; // Show the popup
        });
    });

    // Close the popup when the cancel button is clicked
    closePopup.addEventListener('click', () => {
        respondPopup.style.display = 'none'; // Hide the popup
    });

    // Close the popup when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === respondPopup) {
            respondPopup.style.display = 'none';
        }
    });

    // Functionality for sending response can be implemented here
    sendResponse.addEventListener('click', () => {
        const responseText = document.getElementById('responseText').value;
        console.log('Response Sent:', responseText); // Placeholder for actual send logic
        respondPopup.style.display = 'none'; // Hide the popup after sending
    });
});
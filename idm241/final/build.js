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
    const emailContainer = event.target.closest('.email-row');
    if (emailContainer) {
        emailContainer.classList.add('slide-to-trash');


        emailContainer.addEventListener('transitionend', () => {
            emailContainer.classList.add('hidden-row'); 
            emailContainer.classList.remove('slide-to-trash'); 
        }, { once: true });

        lastDeletedEmail = emailContainer;
        trashCount++;
        document.querySelector('.trash-count').innerText = `(${trashCount})`;
        showUndoPopup();
    }
}

function undoDeleteEmail() {
    if (lastDeletedEmail) {
        lastDeletedEmail.classList.remove('slide-to-trash', 'hidden-row'); // Removes hidden-row to make visible again
        trashCount--;
        document.querySelector('.trash-count').innerText = `(${trashCount})`;

        lastDeletedEmail = null;
        clearTimeout(undoTimeout);
        document.getElementById('undoPopup').style.display = 'none';
    }
}

// Add event listeners
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', handleDeleteEmail);
});

document.getElementById('undoButton').addEventListener('click', undoDeleteEmail);


// PIN EMAIL --------------------------------------------------------------------------------
let pinnedEmails = [];

// Handle pinning emails
function handlePinEmail(event) {
    const emailContainer = event.target.closest('.email-row'); 
    const pinIcon = emailContainer.querySelector('.fa-thumbtack');

    // Toggle pinned state
    const isPinned = emailContainer.classList.toggle('pinned');
    pinIcon.classList.toggle('active', isPinned); // Update pin icon style

    if (isPinned) {
        // Email is pinned
        pinnedEmails.push(emailContainer); // Add to pinned list
        emailContainer.style.backgroundColor = '#c7e7ad'; // Highlight row green
    } else {
        // Email is unpinned
        pinnedEmails = pinnedEmails.filter(item => item !== emailContainer); // Remove from pinned list
        emailContainer.style.backgroundColor = ''; // Reset background
    }

    // Update the order of pinned emails
    updatePinnedEmailOrder();
}

// Update the order for all pinned emails
function updatePinnedEmailOrder() {
    pinnedEmails.forEach((email, index) => {
        email.style.order = `-${index + 1}`; // Negative order keeps pinned at the top
    });
}

// Attach the event listener to all pin icons
document.querySelectorAll('.fa-thumbtack').forEach(pinIcon => {
    pinIcon.addEventListener('click', handlePinEmail);
});

// -------------------------------------------------------------------------------------------------------------




// Set up event listeners for each email row's icons
document.addEventListener('DOMContentLoaded', () => {
    // Delete button event listeners
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', handleDeleteEmail);
    });

    // Pin button event listeners
    document.querySelectorAll('.fa-thumbtack').forEach(pinIcon => {
        pinIcon.addEventListener('click', handlePinEmail);
    });

    // Undo button event listener
    document.getElementById('undoButton').addEventListener('click', undoDeleteEmail);
});




// STAR EMAIL
document.querySelectorAll('.fa-star-o').forEach(starIcon => {
    starIcon.addEventListener('click', () => {
        if (starIcon.classList.contains('fa-star-o')) {
            starIcon.classList.remove('fa-star-o');
            starIcon.classList.add('fa-star', 'active'); // Change to filled star
        } else {
            starIcon.classList.remove('fa-star', 'active');
            starIcon.classList.add('fa-star-o'); // Change back to outline star
        }
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




// CHECKBOXES-------------------------------------------------------------------------------
const checkboxes = document.querySelectorAll('.slayCheckbox input[type="checkbox"]');
const deleteText = document.querySelector('.deleteall');

// Function to update the color of the "Delete selected emails" text
function updateDeleteTextColor() {
    const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    if (isChecked) {
        deleteText.style.color = 'red';
    } else {
        deleteText.style.color = 'gray';
    }
}

// Add event listeners to all checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateDeleteTextColor);
});

// Set initial state on page load
updateDeleteTextColor();
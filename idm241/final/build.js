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
        lastDeletedEmail.classList.remove('hidden');
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

// let pinnedEmail = null;  


// function handlePinEmail(event) {
//     const emailContainer = event.target.closest('.email-row');  // Changed to .email-row
//     const pinIcon = emailContainer.querySelector('.fa-thumbtack');

//     const isPinned = emailContainer.classList.toggle('pinned');
//     pinIcon.classList.toggle('active', isPinned);

//     if (isPinned) {
//         if (pinnedEmail && pinnedEmail !== emailContainer) {
//             pinnedEmail.classList.remove('pinned');
//             pinnedEmail.querySelector('.fa-thumbtack').classList.remove('active');
//             pinnedEmail.style.order = ''; // Reset order
//         }

//         pinnedEmail = emailContainer;
//         emailContainer.style.order = '-1';

//         pinIcon.classList.add('jump');
//         setTimeout(() => {
//             pinIcon.classList.remove('jump');
//         }, 400);
//     } else {
//         pinnedEmail = null;
//         emailContainer.style.order = '';
//     }
// }

let pinnedEmails = []; // Array to store pinned emails

function handlePinEmail(event) {
    const emailContainer = event.target.closest('.email-row'); 
    const pinIcon = emailContainer.querySelector('.fa-thumbtack');
    
    const isPinned = emailContainer.classList.toggle('pinned');
    pinIcon.classList.toggle('active', isPinned);

    if (isPinned) {
        // If pinned, add the email to the pinnedEmails array
        pinnedEmails.push(emailContainer);
        emailContainer.style.order = `-${pinnedEmails.length}`; // Move it to the top
    } else {
        // If unpinned, remove it from the array
        pinnedEmails = pinnedEmails.filter(item => item !== emailContainer);
        emailContainer.style.order = ''; // Reset order when unpinned

        // Recalculate order for remaining pinned emails
        pinnedEmails.forEach((pinnedEmail, index) => {
            pinnedEmail.style.order = `-${index + 1}`;
        });
    }
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
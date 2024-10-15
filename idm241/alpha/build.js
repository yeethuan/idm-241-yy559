
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


const sidebar = document.querySelector('.sidebar');
const menuToggle = document.querySelector('.menu-toggle');




// SIDEBAR
menuToggle.addEventListener('click', () => {
    if (sidebar.style.display === 'none' || sidebar.style.display === '') {
        sidebar.style.display = 'block';  // Show sidebar
    } else {
        sidebar.style.display = 'none';   // Hide sidebar
    }
});






// TRASH
let trashCount = 0;
        function handleDeleteEmail(event) {
            const emailContent = event.target.closest('.email-content'); // Get the parent email container
            if (emailContent) {
                emailContent.remove(); // Remove the email from the DOM
                trashCount++; // Increment the trash count
                document.querySelector('.trash-count').innerText = `(${trashCount})`; // Update trash count in sidebar
            }
        }

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', handleDeleteEmail);
        });
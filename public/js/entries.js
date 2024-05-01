document.addEventListener("DOMContentLoaded", function() {
    // show/hide toggle
    document.querySelectorAll('.toggle-button').forEach(button => {
        const targetCategory = document.getElementById(button.getAttribute('data-target'));
        if (targetCategory.classList.contains('visible')) {
            button.textContent = 'Hide';
        } else {
            button.textContent = 'Show';
        }

        button.addEventListener('click', function() {
            if (targetCategory.classList.contains('hidden')) {
                targetCategory.classList.replace('hidden', 'visible');
                this.textContent = 'Hide';
            } else {
                targetCategory.classList.replace('visible', 'hidden');
                this.textContent = 'Show';
            }
        });
    });

    // delete confirmation logic
    const deleteButton = document.getElementById('delete-button');
    const deletePopup = document.getElementById('delete-popup');
    const confirmDelete = document.getElementById('confirm-delete');
    const cancelDelete = document.getElementById('cancel-delete');

    deleteButton.addEventListener('click', function(event) {
        event.preventDefault();
        deletePopup.style.display = 'block';
    });

    confirmDelete.addEventListener('click', function() {
        document.getElementById('delete-form').submit();
    });

    cancelDelete.addEventListener('click', function() {
        deletePopup.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === deletePopup) {
            deletePopup.style.display = 'none';
        }
    }
});

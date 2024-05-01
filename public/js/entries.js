// show/hide toggle
document.addEventListener("DOMContentLoaded", function() {
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
});


// delete confirmation logic
document.addEventListener("DOMContentLoaded", function() {
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

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('create-form');
    const submitButton = document.getElementById('create-submit');

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();

        let firstError = null;

        // emotion validation
        const emotionsFieldset = document.querySelector('.emotions');
        const emotionSelected = document.querySelector('input[name="emotionId"]:checked') !== null;
        if (!validateFieldset(emotionSelected, emotionsFieldset)) {
            if (!firstError) {
                firstError = emotionsFieldset;
            }
        }

        // energy validation
        const energyFieldset = document.querySelector('.energy');
        const energySelected = document.querySelector('input[name="energyId"]:checked') !== null;
        if (!validateFieldset(energySelected, energyFieldset)) {
            if (!firstError) {
                firstError = energyFieldset;
            }
        }

        // scrolling to first error
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            form.submit();
        }
    });

    // helper to add error
    function validateFieldset(selected, fieldset) {
        let errorDiv = fieldset.querySelector('.error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
        }

        errorDiv.className = 'error';
        errorDiv.textContent = 'Required! Please select a value.';

        const header = fieldset.querySelector('header')

        if (!selected) {
            if (!header.contains(errorDiv)) {
                header.appendChild(errorDiv);
            }
            fieldset.style.border = '3px solid red';
            return false;

        } else {
            if (header.contains(errorDiv)) {
                header.removeChild(errorDiv);
            }
            fieldset.style.border = 'none';
            return true;
        }
    }
});


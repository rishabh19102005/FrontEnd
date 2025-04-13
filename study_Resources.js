document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Upload modal functionality
    const uploadModal = document.getElementById('upload-modal');
    const closeModal = document.getElementById('close-modal');
    const cancelUpload = document.getElementById('cancel-upload');
    const uploadButtons = document.querySelectorAll('[class*="bg-indigo-600"][class*="px-6"][class*="py-3"]'); // Hero section upload button
    
    // Open modal when any upload button is clicked
    uploadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            uploadModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    function closeUploadModal() {
        uploadModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    closeModal.addEventListener('click', closeUploadModal);
    cancelUpload.addEventListener('click', closeUploadModal);

    // Resource type selection
    const resourceTypeBtns = document.querySelectorAll('.resource-type-btn');
    const fileUploadSection = document.getElementById('file-upload-section');
    const linkSection = document.getElementById('link-section');

    resourceTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Reset all buttons
            resourceTypeBtns.forEach(b => {
                b.classList.remove('border-indigo-200', 'bg-indigo-50', 'text-indigo-700');
                b.classList.add('border-gray-200', 'hover:border-indigo-200', 'hover:bg-indigo-50', 'hover:text-indigo-700');
            });

            // Style clicked button
            this.classList.add('border-indigo-200', 'bg-indigo-50', 'text-indigo-700');
            this.classList.remove('border-gray-200', 'hover:border-indigo-200', 'hover:bg-indigo-50', 'hover:text-indigo-700');

            // Show appropriate section based on type
            const type = this.textContent.trim();
            if (type === 'Link') {
                fileUploadSection.classList.add('hidden');
                linkSection.classList.remove('hidden');
            } else {
                fileUploadSection.classList.remove('hidden');
                linkSection.classList.add('hidden');
            }
        });
    });

    // File upload drop zone
    const dropZone = document.getElementById('drop-zone');
    const fileUpload = document.getElementById('file-upload');

    dropZone.addEventListener('click', function() {
        fileUpload.click();
    });

    fileUpload.addEventListener('change', function() {
        if (this.files.length) {
            updateDropZoneUI(this.files[0]);
        }
    });

    // Handle drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropZone.classList.add('border-indigo-400', 'bg-indigo-50');
    }

    function unhighlight() {
        dropZone.classList.remove('border-indigo-400', 'bg-indigo-50');
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length) {
            fileUpload.files = files;
            updateDropZoneUI(files[0]);
        }
    }

    function updateDropZoneUI(file) {
        const fileName = document.createElement('p');
        fileName.className = 'font-medium text-gray-800 mt-2';
        fileName.textContent = file.name;
        
        // Clear previous content
        dropZone.innerHTML = '';
        dropZone.appendChild(fileName);
    }

    // Form submission
    const uploadForm = document.getElementById('upload-form');
    
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically handle the form submission with AJAX
        // For this example, we'll just show an alert and close the modal
        alert('Resource uploaded successfully!');
        closeUploadModal();
        uploadForm.reset();
        
        // Reset drop zone
        dropZone.innerHTML = `
            <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-3"></i>
            <p class="text-gray-500">Drag and drop your file here or click to browse</p>
        `;
    });

    // Bookmark toggle
    const bookmarkButtons = document.querySelectorAll('[class*="fa-bookmark"]');
    
    bookmarkButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('far');
            this.classList.toggle('fas');
            this.classList.toggle('text-gray-400');
            this.classList.toggle('text-indigo-600');
        });
    });
});
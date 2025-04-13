document.addEventListener("DOMContentLoaded", () => {
    // Form Validation
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            validateForm();
        });
    }

    function validateForm() {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        let valid = true;

        if (name === "") {
            alert("Name is required.");
            valid = false;
        }
        if (!validateEmail(email)) {
            alert("Enter a valid email address.");
            valid = false;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            valid = false;
        }
        if (valid) {
            alert("Registration successful!");
            form.submit();
            window.location.href = "login.html";
        }
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Dynamic Resource Search
    const searchInput = document.querySelector("input[placeholder='Search for resources...']");
    const resourceItems = document.querySelectorAll(".grid div");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            resourceItems.forEach((item) => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? "block" : "none";
            });
        });
    }

    // Upload File Feedback
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput) {
        fileInput.addEventListener("change", () => {
            alert(`File selected: ${fileInput.files[0].name}`);
        });
    }

    // Discussion Post Functionality
    const postButton = document.querySelector(".bg-green-600");
    if (postButton) {
        postButton.addEventListener("click", () => {
            const textarea = document.querySelector("textarea");
            const message = textarea.value.trim();
            if (message) {
                const discussionSection = document.querySelector(".mt-4");
                const newPost = document.createElement("div");
                newPost.classList.add("bg-gray-200", "p-4", "rounded", "mt-2");
                newPost.innerHTML = `<p><strong>You:</strong> ${message}</p>`;
                discussionSection.appendChild(newPost);
                textarea.value = "";
            } else {
                alert("Please enter a message before posting.");
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Contact Form Validation
    const contactForm = document.querySelector("form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = contactForm.querySelector("input[type='text']").value.trim();
            const email = contactForm.querySelector("input[type='email']").value.trim();
            const message = contactForm.querySelector("textarea").value.trim();

            if (name === "" || email === "" || message === "") {
                alert("Please fill out all fields.");
                return;
            }
            alert("Message sent successfully!");
            contactForm.reset();
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 50,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Add New Discussion Posts
    const discussionForm = document.querySelector(".bg-white form");
    if (discussionForm) {
        discussionForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const discussionText = discussionForm.querySelector("textarea").value.trim();
            if (discussionText === "") {
                alert("Please enter a discussion message.");
                return;
            }

            const discussionContainer = document.querySelector(".max-w-2xl");
            const newDiscussion = document.createElement("div");
            newDiscussion.className = "bg-white p-4 rounded-lg shadow mb-4";
            newDiscussion.innerHTML = `
                <p class="font-semibold">Anonymous</p>
                <p class="mt-2">${discussionText}</p>
            `;

            discussionContainer.appendChild(newDiscussion);
            discussionForm.reset();
        });
    }
});

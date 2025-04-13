document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const createGroupBtn = document.getElementById('createGroupBtn');
    const createGroupModal = document.getElementById('createGroupModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelGroupBtn = document.getElementById('cancelGroupBtn');
    const groupForm = document.getElementById('groupForm');
    const groupItems = document.querySelectorAll('.group-item');
    const currentGroup = document.getElementById('currentGroup');
    const messagesContainer = document.getElementById('messagesContainer');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const typingIndicator = document.getElementById('typingIndicator');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileUpload = document.getElementById('fileUpload');
    const uploadStatus = document.getElementById('uploadStatus');

    // File upload functionality
    uploadBtn.addEventListener('click', () => {
        fileUpload.click();
    });

    fileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });

    function handleFileUpload(file) {
        // Show upload status
        uploadStatus.textContent = `Uploading ${file.name}...`;
        uploadStatus.classList.remove('hidden');
        uploadStatus.classList.remove('text-green-500', 'text-red-500');
        uploadStatus.classList.add('text-gray-600');

        // Simulate file upload (in a real app, you would upload to a server)
        setTimeout(() => {
            // Check file size (max 5MB for demo)
            if (file.size > 5 * 1024 * 1024) {
                uploadStatus.textContent = `Error: File too large (max 5MB)`;
                uploadStatus.classList.remove('text-gray-600');
                uploadStatus.classList.add('text-red-500');
            } else {
                uploadStatus.textContent = `${file.name} uploaded successfully!`;
                uploadStatus.classList.remove('text-gray-600');
                uploadStatus.classList.add('text-green-500');

                // Create a message with the file info
                const fileMessage = {
                    sender: "You",
                    initials: "ME",
                    message: `[File: ${file.name}]`,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isFile: true,
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: formatFileSize(file.size)
                };

                addMessageToChat(fileMessage, true);
            }

            // Clear the file input
            fileUpload.value = '';
        }, 1500);
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]);
    }

    // Modal handling
    createGroupBtn.addEventListener('click', () => {
        createGroupModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
        createGroupModal.classList.add('hidden');
    });

    cancelGroupBtn.addEventListener('click', () => {
        createGroupModal.classList.add('hidden');
    });

    // Close modal when clicking outside
    createGroupModal.addEventListener('click', (e) => {
        if (e.target === createGroupModal) {
            createGroupModal.classList.add('hidden');
        }
    });

    // Form submission
    groupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const groupName = document.getElementById('groupName').value;
        const groupSubject = document.getElementById('groupSubject').value;
        const groupDescription = document.getElementById('groupDescription').value;
        
        // Create new group item
        const newGroupItem = document.createElement('div');
        newGroupItem.className = 'group-item p-3 rounded-md hover:bg-indigo-50 cursor-pointer flex items-center justify-between border-b border-gray-100';
        newGroupItem.innerHTML = `
            <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                <span>${groupName}</span>
            </div>
            <span class="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">0</span>
        `;
        
        // Add to the top of the group list
        const groupList = document.querySelector('.space-y-2');
        groupList.insertBefore(newGroupItem, groupList.firstChild);
        
        // Add click event to the new group
        newGroupItem.addEventListener('click', () => {
            switchGroup(groupName, groupDescription);
        });
        
        // Reset and close form
        groupForm.reset();
        createGroupModal.classList.add('hidden');
    });

    // Group switching functionality
    groupItems.forEach(item => {
        item.addEventListener('click', () => {
            const groupName = item.querySelector('span').textContent;
            const groupDescription = `${groupName} group discussion`;
            switchGroup(groupName, groupDescription);
        });
    });

    function switchGroup(name, description) {
        currentGroup.textContent = name;
        currentGroup.nextElementSibling.textContent = description;
        
        // In a real app, you would fetch messages for this group from a server
        messagesContainer.innerHTML = `
            <div class="flex items-center justify-center h-full">
                <p class="text-gray-500">Loading messages for ${name}...</p>
            </div>
        `;
        
        // Simulate loading messages
        setTimeout(() => {
            loadSampleMessages(name);
        }, 800);
    }

    function loadSampleMessages(groupName) {
        // Sample messages - in a real app, these would come from a database
        const sampleMessages = {
            "Computer Science": [
                { sender: "John Doe", initials: "JD", message: "Hey everyone! I'm having trouble understanding binary search trees. Can someone help?", time: "10:30 AM" },
                { sender: "Alice Smith", initials: "AS", message: "Sure John! What specific part are you struggling with?", time: "10:32 AM" },
                { sender: "John Doe", initials: "JD", message: "Mainly the insertion and deletion operations. The recursive approach is confusing me.", time: "10:34 AM" },
                { sender: "Alice Smith", initials: "AS", message: "I can share some diagrams that helped me understand it. Give me a sec to upload them.", time: "10:36 AM" },
                { sender: "Alice Smith", initials: "AS", message: "[File: BST-Diagram.pdf]", isFile: true, fileName: "BST-Diagram.pdf", fileType: "application/pdf", fileSize: "2.14 MB", time: "10:37 AM" }
            ],
            "Mathematics": [
                { sender: "Bob Johnson", initials: "BJ", message: "Does anyone understand how to solve quadratic equations using the quadratic formula?", time: "9:15 AM" },
                { sender: "Emma Wilson", initials: "EW", message: "Yes! The formula is x = [-b ± √(b² - 4ac)] / 2a. What part is confusing you?", time: "9:18 AM" },
                { sender: "Bob Johnson", initials: "BJ", message: "[File: Quadratic-Examples.docx]", isFile: true, fileName: "Quadratic-Examples.docx", fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", fileSize: "1.56 MB", time: "9:20 AM" }
            ],
            "Physics": [
                { sender: "Carlos M.", initials: "CM", message: "Can someone explain Newton's laws of motion with real-world examples?", time: "2:45 PM" },
                { sender: "Sophia L.", initials: "SL", message: "Sure! First law: A book on a table stays at rest until you push it (inertia).", time: "2:50 PM" },
                { sender: "Sophia L.", initials: "SL", message: "[File: Newton-Laws.pptx]", isFile: true, fileName: "Newton-Laws.pptx", fileType: "application/vnd.ms-powerpoint", fileSize: "3.78 MB", time: "2:52 PM" }
            ],
            "Chemistry": [
                { sender: "David K.", initials: "DK", message: "I need help balancing chemical equations. Any tips?", time: "11:20 AM" },
                { sender: "David K.", initials: "DK", message: "[File: Chemical-Equations.pdf]", isFile: true, fileName: "Chemical-Equations.pdf", fileType: "application/pdf", fileSize: "1.23 MB", time: "11:22 AM" }
            ],
            "Biology": [
                { sender: "StudyHub Bot", initials: "SH", message: "This group is new. Start the discussion!", time: "Just now" }
            ]
        };
        
        messagesContainer.innerHTML = '';
        
        const messages = sampleMessages[groupName] || [
            { sender: "StudyHub Bot", initials: "SH", message: "Welcome to the " + groupName + " group! Start the discussion.", time: "Just now" }
        ];
        
        messages.forEach(msg => {
            addMessageToChat(msg);
        });
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addMessageToChat(msg, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.className = isUser ? 'flex items-start justify-end' : 'flex items-start';
        
        if (msg.isFile) {
            // File message
            const fileIcon = getFileIcon(msg.fileType);
            messageElement.innerHTML = `
                ${isUser ? '' : `
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    ${msg.initials}
                </div>
                `}
                <div class="${isUser ? 'mr-3 text-right' : 'ml-3'}">
                    <div class="${isUser ? 'bg-indigo-100' : 'bg-gray-100'} rounded-lg py-2 px-4">
                        <p class="font-medium text-indigo-600">${msg.sender}</p>
                        <div class="flex items-center mt-1 text-gray-800">
                            <i class="${fileIcon} mr-2"></i>
                            <div>
                                <p class="font-medium">${msg.fileName}</p>
                                <p class="text-xs text-gray-500">${msg.fileSize}</p>
                            </div>
                        </div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">${msg.time}</p>
                </div>
                ${isUser ? `
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    ${msg.initials}
                </div>
                ` : ''}
            `;
        } else {
            // Regular message
            messageElement.innerHTML = `
                ${isUser ? '' : `
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    ${msg.initials}
                </div>
                `}
                <div class="${isUser ? 'mr-3 text-right' : 'ml-3'}">
                    <div class="${isUser ? 'bg-indigo-100' : 'bg-gray-100'} rounded-lg py-2 px-4">
                        <p class="font-medium text-indigo-600">${msg.sender}</p>
                        <p class="text-gray-800">${msg.message}</p>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">${msg.time}</p>
                </div>
                ${isUser ? `
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    ${msg.initials}
                </div>
                ` : ''}
            `;
        }
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function getFileIcon(fileType) {
        if (fileType.includes('pdf')) {
            return 'fas fa-file-pdf text-red-500';
        } else if (fileType.includes('word') || fileType.includes('document')) {
            return 'fas fa-file-word text-blue-500';
        } else if (fileType.includes('powerpoint') || fileType.includes('presentation')) {
            return 'fas fa-file-powerpoint text-orange-500';
        } else if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
            return 'fas fa-file-excel text-green-500';
        } else if (fileType.includes('image')) {
            return 'fas fa-file-image text-purple-500';
        } else if (fileType.includes('zip') || fileType.includes('compressed')) {
            return 'fas fa-file-archive text-yellow-500';
        } else if (fileType.includes('text') || fileType.includes('plain')) {
            return 'fas fa-file-alt text-gray-500';
        } else if (fileType.includes('code')) {
            return 'fas fa-file-code text-indigo-500';
        } else {
            return 'fas fa-file text-gray-400';
        }
    }

    // Message sending functionality
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return;
        
        // In a real app, you would send this to a server
        const newMessage = {
            sender: "You",
            initials: "ME",
            message: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        addMessageToChat(newMessage, true);
        messageInput.value = '';
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Simulate a response after 1-3 seconds
        setTimeout(() => {
            simulateResponse();
        }, Math.random() * 2000 + 1000);
    }

    function simulateResponse() {
        const responses = [
            { name: "Alex", initials: "AX", message: "That's a great point! I agree with you." },
            { name: "Sarah", initials: "SH", message: "I think there might be another way to look at this." },
            { name: "Mike", initials: "MK", message: "Thanks for sharing that information!" },
            { name: "StudyBot", initials: "SB", message: "Remember to keep discussions respectful and on topic." }
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseMessage = {
            sender: randomResponse.name,
            initials: randomResponse.initials,
            message: randomResponse.message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        addMessageToChat(responseMessage);
    }

    // Event listeners for sending messages
    sendMessageBtn.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Typing indicator
    let typingTimeout;
    
    messageInput.addEventListener('input', () => {
        typingIndicator.classList.remove('hidden');
        
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            typingIndicator.classList.add('hidden');
        }, 2000);
    });

    // Initialize with Computer Science group
    switchGroup("Computer Science", "Discuss computer science topics with your peers");
});
// Check if we're on the about page with the form
if (document.getElementById("iris-form")) {
    document.getElementById("iris-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page reload

        // Get input values
        let sepalLength = parseFloat(document.getElementById("sepal-length").value);
        let sepalWidth = parseFloat(document.getElementById("sepal-width").value);
        let petalLength = parseFloat(document.getElementById("petal-length").value);
        let petalWidth = parseFloat(document.getElementById("petal-width").value);

        // Validate inputs
        if (isNaN(sepalLength) || isNaN(sepalWidth) || isNaN(petalLength) || isNaN(petalWidth)) {
            document.getElementById("result").innerHTML = "Please enter valid measurements";
            return;
        }

        // Show loading state
        document.getElementById("result").innerHTML = 
            '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Analyzing...</div>';

        // Send data to backend
        fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sepalLength: sepalLength,
                sepalWidth: sepalWidth,
                petalLength: petalLength,
                petalWidth: petalWidth
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Format the prediction result
            let speciesClass = data.prediction.toLowerCase().replace(/\s+/g, '-');
            document.getElementById("result").innerHTML = 
                `<div class="prediction-result ${speciesClass}">
                    <i class="fas fa-leaf"></i>
                    <div>
                        <p class="result-title">Predicted Species:</p>
                        <p class="species-name">${data.prediction}</p>
                    </div>
                </div>`;
        })
        .catch(error => {
            console.log('Error:', error);
            document.getElementById("result").innerHTML = 
                '<div class="error"><i class="fas fa-exclamation-circle"></i> Error processing request</div>';
        });
    });

    // Add some example values for quick testing
    document.querySelectorAll('#app .form-group input').forEach(input => {
        input.addEventListener('focus', function() {
            if (this.placeholder.startsWith('e.g.,')) {
                this.dataset.originalPlaceholder = this.placeholder;
                this.placeholder = '';
            }
        });

        input.addEventListener('blur', function() {
            if (this.value === '' && this.dataset.originalPlaceholder) {
                this.placeholder = this.dataset.originalPlaceholder;
            }
        });
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation for feature cards
if (document.querySelector('.feature-card')) {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Add CSS for loading and result styling
const style = document.createElement('style');
style.textContent = `
    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .prediction-result {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    .prediction-result i {
        font-size: 2rem;
        color: #4e54c8;
    }

    .result-title {
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
    }

    .species-name {
        font-size: 1.2rem;
        font-weight: bold;
        color: #4e54c8;
    }

    .error {
        color: #dc3545;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .iris-setosa {
        background-color: #e3f2fd;
    }

    .iris-versicolor {
        background-color: #e8f5e9;
    }

    .iris-virginica {
        background-color: #f3e5f5;
    }
`;


document.head.appendChild(style);

// Check if we're on the about page with the form
if (document.getElementById("iris-form")) {
    document.getElementById("iris-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page reload

        // Get input values
        let sepalLength = parseFloat(document.getElementById("sepal-length").value);
        let sepalWidth = parseFloat(document.getElementById("sepal-width").value);
        let petalLength = parseFloat(document.getElementById("petal-length").value);
        let petalWidth = parseFloat(document.getElementById("petal-width").value);

        // Validate inputs
        if (isNaN(sepalLength) || isNaN(sepalWidth) || isNaN(petalLength) || isNaN(petalWidth)) {
            document.getElementById("result").innerHTML = "Please enter valid measurements";
            return;
        }

        // Show loading state
        document.getElementById("result").innerHTML = 
            '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Analyzing...</div>';

        // Send data to backend
        fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sepalLength: sepalLength,
                sepalWidth: sepalWidth,
                petalLength: petalLength,
                petalWidth: petalWidth
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Format the prediction result
            let speciesClass = data.prediction.toLowerCase().replace(/\s+/g, '-');
            document.getElementById("result").innerHTML = 
                `<div class="prediction-result ${speciesClass}">
                    <i class="fas fa-leaf"></i>
                    <div>
                        <p class="result-title">Predicted Species:</p>
                        <p class="species-name">${data.prediction}</p>
                    </div>
                </div>`;
        })
        .catch(error => {
            console.log('Error:', error);
            document.getElementById("result").innerHTML = 
                '<div class="error"><i class="fas fa-exclamation-circle"></i> Error processing request</div>';
        });
    });

    // Add some example values for quick testing
    document.querySelectorAll('#app .form-group input').forEach(input => {
        input.addEventListener('focus', function() {
            if (this.placeholder.startsWith('e.g.,')) {
                this.dataset.originalPlaceholder = this.placeholder;
                this.placeholder = '';
            }
        });

        input.addEventListener('blur', function() {
            if (this.value === '' && this.dataset.originalPlaceholder) {
                this.placeholder = this.dataset.originalPlaceholder;
            }
        });
    });
}

// Check if we're on the contact page with the contact form
if (document.getElementById("contact-form")) {
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page reload
        
        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
        const subscribe = document.getElementById("subscribe").checked;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormStatus("Please fill in all fields", "error");
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormStatus("Please enter a valid email address", "error");
            return;
        }
        
        // Show loading status
        showFormStatus('<i class="fas fa-spinner fa-spin"></i> Sending...', "loading");
        
        // Simulate form submission (replace with actual backend call)
        setTimeout(() => {
            // In a real application, you would send this data to your server
            console.log({
                name,
                email,
                subject,
                message,
                subscribe
            });
            
            // Show success message
            showFormStatus("Thank you! Your message has been sent.", "success");
            
            // Reset the form
            document.getElementById("contact-form").reset();
        }, 1500);
    });
    
    // Helper function to show status messages
    function showFormStatus(message, type) {
        const statusElement = document.getElementById("form-status");
        statusElement.innerHTML = message;
        statusElement.className = "form-status " + type;
        
        // Clear error messages after 5 seconds
        if (type === "error" || type === "success") {
            setTimeout(() => {
                statusElement.innerHTML = "";
                statusElement.className = "form-status";
            }, 5000);
        }
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Initialize tooltips if any exist
if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}


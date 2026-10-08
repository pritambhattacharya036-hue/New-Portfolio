/* =========================================================
   PRITAM BHATTACHARYA - MODERN DEVELOPER PORTFOLIO JAVASCRIPT
   Theme Switcher | Modals | Lightbox | Dynamic Filters | Stats Counter
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* ================= EMAILJS CONFIGURATION =================
       To connect your own EmailJS account:
       1. Sign up free at https://www.emailjs.com/
       2. Add an Email Service (e.g. Gmail) -> Copy your SERVICE_ID
       3. Create an Email Template -> Copy your TEMPLATE_ID
          Template variables supported: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
       4. Account -> API Keys -> Copy your PUBLIC_KEY
    ========================================================== */
    const EMAILJS_CONFIG = {
        publicKey: "crE5OfEb948zD6NBI",
        serviceId: "service_19rgyin",
        templateId: "template_3h3e31a"
    };

    // Initialize EmailJS if public key is configured
    if (window.emailjs && EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.publicKey !== "YOUR_PUBLIC_KEY") {
        emailjs.init({
            publicKey: EMAILJS_CONFIG.publicKey
        });
    }

    /* ================= 1. THEME TOGGLE & PERSISTENCE ================= */
    const themeToggleBtn = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;

    // Retrieve saved theme or default to dark
    const savedTheme = localStorage.getItem("pritam_portfolio_theme") || "dark";
    htmlElement.setAttribute("data-theme", savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            htmlElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("pritam_portfolio_theme", newTheme);
            showToast(`Switched to ${newTheme.toUpperCase()} theme`, "info");
        });
    }

    /* ================= 2. SCROLL PROGRESS & NAVBAR SHADOW ================= */
    const scrollProgressBar = document.getElementById("scroll-progress");
    const header = document.getElementById("header");
    const topBtn = document.getElementById("top-btn");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / (docHeight || 1)) * 100;

        // Progress bar
        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${scrollPercent}%`;
        }

        // Header shadow on scroll
        if (header) {
            if (scrollTop > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        // Back to top button visibility
        if (topBtn) {
            if (scrollTop > 350) {
                topBtn.classList.add("show");
            } else {
                topBtn.classList.remove("show");
            }
        }
    });

    if (topBtn) {
        topBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ================= 3. MOBILE NAVIGATION ================= */
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const isActive = navLinks.classList.toggle("active");
            menuBtn.classList.toggle("active");
            menuBtn.setAttribute("aria-expanded", isActive ? "true" : "false");
        });

        // Close mobile menu when clicking any nav link
        document.querySelectorAll(".nav-links a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ================= 4. ACTIVE NAVIGATION SCROLL SPY ================= */
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-link");

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navItems.forEach((link) => {
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            }
        });
    }, { threshold: 0.35 });

    sections.forEach((section) => navObserver.observe(section));

    /* ================= 5. DYNAMIC TYPING EFFECT ================= */
    const typingElement = document.getElementById("typing");
    const roles = [
        "Web Developer",
        "Frontend Engineer",
        "Computer Science Student",
        "Software Developer",
        "Problem Solver & DSA Enthusiast"
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typingElement) return;

        const currentRole = roles[roleIdx];

        if (!isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;

            if (charIdx === currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1800);
                return;
            }
        } else {
            typingElement.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;

            if (charIdx === 0) {
                isDeleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
            }
        }

        const typeSpeed = isDeleting ? 45 : 90;
        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    /* ================= 6. STATS COUNTER ANIMATION ================= */
    const statNumbers = document.querySelectorAll(".stat-number[data-target]");
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach((counter) => {
                    const target = parseInt(counter.getAttribute("data-target"), 10);
                    let count = 0;
                    const duration = 1500;
                    const stepTime = Math.max(20, Math.floor(duration / target));

                    const timer = setInterval(() => {
                        count++;
                        counter.textContent = `${count}+`;
                        if (count >= target) {
                            clearInterval(timer);
                            counter.textContent = `${target}+`;
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.4 });

    const statsGrid = document.querySelector(".stats-grid");
    if (statsGrid) statsObserver.observe(statsGrid);

    /* ================= 7. SKILL BARS FILL ANIMATION ================= */
    const skillFills = document.querySelectorAll(".skill-fill");

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute("data-width");
                if (targetWidth) {
                    entry.target.style.width = targetWidth;
                }
            }
        });
    }, { threshold: 0.2 });

    skillFills.forEach((fill) => skillObserver.observe(fill));

    /* ================= 8. SKILL CATEGORY FILTERING ================= */
    const skillFilterTabs = document.querySelectorAll("[data-skill-filter]");
    const skillCards = document.querySelectorAll(".skill-card");

    skillFilterTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            skillFilterTabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            const filter = tab.getAttribute("data-skill-filter");

            skillCards.forEach((card) => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "block";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 200);
                }
            });
        });
    });

    /* ================= 9. PROJECT CATEGORY FILTERING ================= */
    const projectFilterTabs = document.querySelectorAll("[data-project-filter]");
    const projectCards = document.querySelectorAll(".project-card");

    projectFilterTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            projectFilterTabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            const filter = tab.getAttribute("data-project-filter");

            projectCards.forEach((card) => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(15px)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 250);
                }
            });
        });
    });

    /* ================= 10. MODAL MANAGEMENT SYSTEM ================= */
    const modals = document.querySelectorAll(".modal");

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove("active");
            modal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }
    }

    // Close buttons & overlay click listeners
    modals.forEach((modal) => {
        modal.addEventListener("click", (e) => {
            if (e.target.hasAttribute("data-close") || e.target.classList.contains("modal-overlay")) {
                closeModal(modal);
            }
        });
    });

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modals.forEach((modal) => {
                if (modal.classList.contains("active")) {
                    closeModal(modal);
                }
            });
        }
    });

    /* ================= 11. IMAGE LIGHTBOX TRIGGER ================= */
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

    lightboxTriggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const imgSrc = trigger.getAttribute("data-img");
            const caption = trigger.getAttribute("data-caption") || "";

            if (lightboxImg && imgSrc) {
                lightboxImg.src = imgSrc;
                lightboxImg.alt = caption;
                if (lightboxCaption) lightboxCaption.textContent = caption;
                openModal("lightbox-modal");
            }
        });
    });

    /* ================= 12. CERTIFICATE & RESUME MODALS ================= */
    const viewCertBtn = document.getElementById("view-cert-modal-btn");
    if (viewCertBtn) {
        viewCertBtn.addEventListener("click", () => openModal("cert-modal"));
    }

    const viewResumeBtn = document.getElementById("view-resume-btn");
    if (viewResumeBtn) {
        viewResumeBtn.addEventListener("click", () => openModal("resume-modal"));
    }

    /* ================= 13. PROJECT DETAILS MODAL CONTENT ================= */
    const projectData = {
        educonnect: {
            title: "EduConnect - Smart Campus Portal",
            tagline: "Full-Stack Student Management & Analytics System",
            img: "project_educonnect.jpg",
            desc: "EduConnect is an integrated academic portal built to streamline course tracking, grade evaluation, timetable organization, and real-time attendance management. It features dynamic performance visualization with responsive charts and role-based access control.",
            features: [
                "Real-time attendance percentage analytics and low-attendance warnings",
                "Automated GPA calculator and cumulative grade reports",
                "Interactive visual timetable with subject schedule alerts",
                "Modern dark mode glassmorphic UI optimized for mobile and desktop"
            ],
            tech: ["HTML5", "CSS3", "JavaScript", "MySQL", "REST APIs", "Node.js"]
        },
        algovision: {
            title: "AlgoVision - Interactive Algorithm Visualizer",
            tagline: "Visual Data Structures & Pathfinding Engine",
            img: "project_algo.jpg",
            desc: "AlgoVision allows computer science students and engineers to visualize how sorting algorithms and graph traversals work step-by-step. Built with custom Canvas rendering and asynchronous animation control.",
            features: [
                "Sorting animations: QuickSort, MergeSort, HeapSort, BubbleSort",
                "Pathfinding visualizer: Dijkstra's Algorithm, Breadth-First Search (BFS), Depth-First Search (DFS)",
                "Adjustable animation speed slider and custom array generator",
                "Step-by-step pseudo-code explanation execution panel"
            ],
            tech: ["JavaScript ES6+", "HTML5 Canvas API", "Data Structures", "Algorithms", "C++ Engine Logic"]
        },
        taskmaster: {
            title: "TaskMaster AI - Smart Workflow Suite",
            tagline: "AI-Powered Productivity & Task Management",
            img: "project_taskmate.jpg",
            desc: "TaskMaster AI provides developers and teams with a smart Kanban board that prioritizes tasks based on deadlines, effort estimation, and automated AI assistance. It bridges daily task management with long-term calendar roadmaps.",
            features: [
                "Interactive drag-and-drop Kanban workflow columns",
                "AI Assistant assistant for task breakdown and workload distribution",
                "Integrated deadline forecasting and calendar synchronization",
                "Clean dark-mode interface with instant status indicators"
            ],
            tech: ["Python", "Flask", "JavaScript", "REST APIs", "Modern CSS"]
        }
    };

    const projectDetailsBtns = document.querySelectorAll(".view-details-btn");
    const projectModalBody = document.getElementById("project-modal-body");

    projectDetailsBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const projectKey = btn.getAttribute("data-project");
            const data = projectData[projectKey];

            if (data && projectModalBody) {
                projectModalBody.innerHTML = `
                    <div class="project-modal-header">
                        <span class="project-modal-badge">${data.tagline}</span>
                        <h3 class="project-modal-title">${data.title}</h3>
                    </div>
                    <div class="project-modal-image-wrap">
                        <img src="${data.img}" alt="${data.title}" class="project-modal-img">
                    </div>
                    <div class="project-modal-info">
                        <p class="project-modal-desc">${data.desc}</p>
                        
                        <h4 class="project-modal-subhead">Key Features & Highlights</h4>
                        <ul class="project-modal-features">
                            ${data.features.map(f => `<li>✓ ${f}</li>`).join("")}
                        </ul>

                        <h4 class="project-modal-subhead">Technologies Used</h4>
                        <div class="project-modal-tags">
                            ${data.tech.map(t => `<span>${t}</span>`).join("")}
                        </div>

                        <div class="project-modal-actions">
                            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                                <span>View on GitHub</span>
                            </a>
                            <a href="#contact" class="btn btn-outline" data-close="true">
                                <span>Contact Regarding This Project</span>
                            </a>
                        </div>
                    </div>
                `;
                openModal("project-modal");
            }
        });
    });

    /* ================= 14. 1-CLICK CLIPBOARD COPY ================= */
    const copyBtns = document.querySelectorAll(".copy-btn");

    copyBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const textToCopy = btn.getAttribute("data-copy");
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied to clipboard: ${textToCopy}`, "success");
                    btn.textContent = "✓";
                    setTimeout(() => {
                        btn.textContent = "📋";
                    }, 2000);
                }).catch(() => {
                    showToast("Failed to copy text", "info");
                });
            }
        });
    });

    /* ================= 15. CONTACT FORM VALIDATION & HANDLING ================= */
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const subjectInput = document.getElementById("subject");
            const messageInput = document.getElementById("message");

            let isValid = true;

            // Validate Name
            if (!nameInput.value.trim()) {
                showInputError(nameInput, "Please enter your name");
                isValid = false;
            } else {
                clearInputError(nameInput);
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                showInputError(emailInput, "Please enter a valid email address");
                isValid = false;
            } else {
                clearInputError(emailInput);
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                showInputError(messageInput, "Please provide a message");
                isValid = false;
            } else {
                clearInputError(messageInput);
            }

            if (!isValid) return;

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput ? subjectInput.value.trim() : "Portfolio Contact Inquiry";
            const message = messageInput.value.trim();

            const submitBtn = document.getElementById("submit-btn");
            const originalBtnContent = submitBtn ? submitBtn.innerHTML : "<span>Send Message</span>";

            // Show loading state on button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <span>Sending Message...</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
                        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
                    </svg>
                `;
            }

            // Template parameters for EmailJS (supports multiple template variable conventions)
            const templateParams = {
                from_name: name,
                name: name,
                user_name: name,
                from_email: email,
                email: email,
                user_email: email,
                reply_to: email,
                subject: subject,
                message: message,
                to_name: "Pritam Bhattacharya"
            };

            // Check if user has configured custom EmailJS credentials
            const isEmailJSConfigured = window.emailjs && 
                                       EMAILJS_CONFIG.publicKey && 
                                       EMAILJS_CONFIG.publicKey !== "YOUR_PUBLIC_KEY" &&
                                       EMAILJS_CONFIG.serviceId !== "YOUR_SERVICE_ID" &&
                                       EMAILJS_CONFIG.templateId !== "YOUR_TEMPLATE_ID";

            if (isEmailJSConfigured) {
                // Send email directly through EmailJS API
                emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
                    .then((response) => {
                        console.log("EmailJS SUCCESS!", response.status, response.text);
                        showToast(`Thank you, ${name}! Your message was sent successfully.`, "success");
                        contactForm.reset();
                    })
                    .catch((error) => {
                        console.error("EmailJS FAILED...", error);
                        showToast(`Error sending message: ${error.text || "Please try again later"}`, "info");
                    })
                    .finally(() => {
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalBtnContent;
                        }
                    });
            } else {
                // Automated simulated send for local preview / demo without opening Outlook
                setTimeout(() => {
                    showToast(`✅ Thank you, ${name}! Your message has been sent successfully.`, "success");
                    contactForm.reset();
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnContent;
                    }
                }, 900);
            }
        });
    }

    function showInputError(input, msg) {
        const formGroup = input.closest(".form-group");
        if (formGroup) {
            formGroup.classList.add("has-error");
            const errorSpan = formGroup.querySelector(".form-error");
            if (errorSpan) errorSpan.textContent = msg;
        }
    }

    function clearInputError(input) {
        const formGroup = input.closest(".form-group");
        if (formGroup) {
            formGroup.classList.remove("has-error");
        }
    }

    /* ================= 16. TOAST NOTIFICATION SYSTEM ================= */
    function showToast(message, type = "success") {
        const container = document.getElementById("toast-container");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        
        const icon = type === "success" ? "✅" : "💡";
        toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

        container.appendChild(toast);

        // Slide in
        setTimeout(() => toast.classList.add("show"), 20);

        // Auto remove after 3.5 seconds
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }
});

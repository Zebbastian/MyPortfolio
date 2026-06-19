// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initProjectFilters();
    highlightActiveNav();
    loadProjects();
    loadSkills();
});

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    // Change navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'var(--dark)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }
}

// ===== ACTIVE NAV LINK =====
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// ===== LOAD PROJECTS =====
function loadProjects() {
    const grid = document.getElementById('featuredProjects') || document.getElementById('allProjects');
    if (!grid) return;
    
    // Sample projects data
    const projects = [
        {
            title: 'Portfolio Website',
            description: 'Modern portfolio built with HTML, CSS, and JavaScript.',
            image: 'assets/images/projects/project1.jpg',
            tags: ['HTML', 'CSS', 'JavaScript'],
            category: 'web'
        },
        {
            title: 'E-commerce Platform',
            description: 'Full-featured online store with shopping cart.',
            image: 'assets/images/projects/project2.jpg',
            tags: ['React', 'Node.js', 'MongoDB'],
            category: 'web'
        },
        {
            title: 'Mobile App UI',
            description: 'Beautiful mobile app design with Figma.',
            image: 'assets/images/projects/project3.jpg',
            tags: ['Figma', 'UI/UX'],
            category: 'design'
        }
    ];
    
    // Clear existing content
    grid.innerHTML = '';
    
    // Render projects
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.category = project.category;
        
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/300x200/6c63ff/ffffff?text=${encodeURIComponent(project.title)}'">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// ===== LOAD SKILLS =====
function loadSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid) return;
    
    const skills = [
        { name: 'HTML5', level: '90%' },
        { name: 'CSS3', level: '85%' },
        { name: 'JavaScript', level: '75%' },
        { name: 'Git', level: '70%' },
        { name: 'React', level: '60%' },
        { name: 'Node.js', level: '55%' }
    ];
    
    // Clear existing content
    grid.innerHTML = '';
    
    skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        
        card.innerHTML = `
            <h3>${skill.name}</h3>
            <div class="skill-bar">
                <div class="skill-progress" style="width: ${skill.level}"></div>
            </div>
            <p>${skill.level}</p>
        `;
        
        grid.appendChild(card);
    });
}

// ===== PROJECT FILTERING =====
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterButtons.length || !projectCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}
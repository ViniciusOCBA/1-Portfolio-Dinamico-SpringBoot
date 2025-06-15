// Importa cada função de seu respectivo módulo
import { loadAboutInfo } from './modules/aboutLoader.js';
import { loadEducation } from './modules/educationLoader.js';
import { loadExperience } from './modules/experienceLoader.js';
import { loadSkills } from './modules/skillsLoader.js';
import { loadCourses } from './modules/coursesLoader.js';
import { loadProjects } from './modules/projectsLoader.js';
import { loadContact } from './modules/contactLoader.js';

// --- Funções Globais ---
window.openModal = function(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

window.closeModal = function(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Função carrossel
window.initializeCarousel = function() {
    const carousel = document.getElementById('project-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!carousel || !prevBtn || !nextBtn) return;

    nextBtn.addEventListener('click', () => {
        const cardWidth = carousel.querySelector('.carousel-card').offsetWidth;
        carousel.scrollLeft += cardWidth + 24;
    });

    prevBtn.addEventListener('click', () => {
        const cardWidth = carousel.querySelector('.carousel-card').offsetWidth;
        carousel.scrollLeft -= cardWidth + 24;
    });
}
// --- Fim das Funções Globais ---

// Evento que dispara o carregamento de todas as seções
document.addEventListener('DOMContentLoaded', () => {
    loadAboutInfo();
    loadEducation();
    loadExperience();
    loadSkills();
    loadCourses();
    loadProjects();
    loadContact();
});
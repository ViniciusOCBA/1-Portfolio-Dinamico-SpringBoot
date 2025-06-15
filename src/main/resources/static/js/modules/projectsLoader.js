// 6. Carrega a seção "Projetos" com Carrossel e Controles no Topo
export async function loadProjects() {
    const container = document.getElementById('projetos-content');
    try {
        const projects = await fetch('/api/projects').then(res => res.json());
        if (projects.length === 0) return;
        
        // --- Estrutura HTML do Carrossel ---
        let html = `
            <section id="projetos" class="py-16 bg-gray-50 rounded-xl">
                <div class="max-w-6xl mx-auto px-4">
                    <div class="flex justify-between items-center mb-8">
                        <h2 class="text-3xl font-bold section-title">Meus Projetos</h2>
                        <div id="carousel-controls">
                            <button id="prev-btn" class="bg-blue-600 text-white p-2 rounded-full w-10 h-10 hover:bg-blue-700 transition disabled:opacity-50"><i class="fas fa-chevron-left"></i></button>
                            <button id="next-btn" class="bg-blue-600 text-white p-2 rounded-full w-10 h-10 hover:bg-blue-700 transition disabled:opacity-50"><i class="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                    <div class="relative">
                        <div id="project-carousel" class="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4">
                            </div>
                    </div>
                </div>
            </section>
        `;
        
        let modalsHtml = '';
        let cardsHtml = '';

        projects.forEach(project => {
            const modalId = `modal-project-${project.id}`;
            cardsHtml += `
                <div class="carousel-card card project-card overflow-hidden snap-start">
                    <img src="${project.imageUrl || 'https://via.placeholder.com/400x250'}" alt="Imagem do Projeto ${project.title}" class="w-full h-48 object-cover">
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-xl font-semibold text-blue-600 mb-2">${project.title}</h3>
                        <p class="text-gray-700 mb-4 flex-grow">${project.shortDescription}</p>
                        <button onclick="openModal('${modalId}')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mt-4">
                            Ver Detalhes
                        </button>
                    </div>
                </div>
            `;

            modalsHtml += `
                <div id="${modalId}" class="modal">
                    <div class="modal-content">
                        <span class="close-button" onclick="closeModal('${modalId}')">&times;</span>
                        <h3 class="text-2xl font-bold text-blue-700 mb-4">${project.title}</h3>
                        <img src="${project.detailImageUrl || project.imageUrl}" alt="Detalhe do Projeto ${project.title}" class="w-full rounded-lg mb-4">
                        <p class="text-gray-700 mb-2"><strong>Descrição Detalhada:</strong> ${project.longDescription}</p>
                        <p class="text-gray-700 mb-2"><strong>Tecnologias Utilizadas:</strong></p>
                        <ul class="list-disc list-inside mt-1 ml-4">
                            ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html + modalsHtml;
        document.getElementById('project-carousel').innerHTML = cardsHtml;
        
        initializeCarousel();

    } catch (error) {
        console.error('Erro ao carregar Projetos:', error);
    }
}

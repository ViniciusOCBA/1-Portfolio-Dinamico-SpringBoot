// 4. Carrega a seção "Habilidades"
export async function loadSkills() {
    const container = document.getElementById('habilidades-content');
    try {
        const skills = await fetch('/api/skills').then(res => res.json());
        if (skills.length === 0) return;

        // Estrutura html
        let html = '<section id="habilidades" class="py-16"><h2 class="text-3xl font-bold text-center mb-12 section-title">Habilidades e Competências</h2>';
        html += '<div class="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 text-center">';
        skills.forEach(skill => {
            html += `
                <div class="card p-4">
                    <i class="${skill.iconClass} text-blue-500 text-3xl mb-2"></i>
                    <p class="text-gray-700 font-medium">${skill.name}</p>
                </div>
            `;
        });
        html += '</div></section>';
        container.innerHTML = html;
    } catch (error) {
        console.error('Erro ao carregar Habilidades:', error);
    }
}

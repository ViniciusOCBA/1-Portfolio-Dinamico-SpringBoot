// 3. Carrega a seção "Experiência Profissional"
export async function loadExperience() {
    const container = document.getElementById('experiencia-content');
    try {
        const experiences = await fetch('/api/experience').then(res => res.json());
        if (experiences.length === 0) return;

        // Estrutura html
        let html = '<section id="experiencia" class="py-16 bg-gray-50 rounded-xl"><h2 class="text-3xl font-bold text-center mb-12 section-title">Experiência Profissional</h2>';
        html += '<div class="max-w-4xl mx-auto space-y-12">';
        experiences.forEach(exp => {
            html += `
                <div class="card p-6 md:flex md:items-start">
                    <div class="md:w-1/3 mb-4 md:mb-0 md:pr-6">
                        <h3 class="text-xl font-semibold text-blue-600">${exp.jobTitle}</h3>
                        <p class="text-gray-700">${exp.company}</p>
                        <p class="text-gray-500 text-sm">${exp.duration}</p>
                    </div>
                    <div class="md:w-2/3">
                        <ul class="list-disc list-inside text-gray-700 space-y-2">
                            ${exp.descriptionItems.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });
        html += '</div></section>';
        container.innerHTML = html;
    } catch (error) {
        console.error('Erro ao carregar Experiência:', error);
    }
}

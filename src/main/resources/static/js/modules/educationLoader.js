// 2. Carrega a seção "Formação Acadêmica"
export async function loadEducation() {
    const container = document.getElementById('formacao-content');
    try {
        const educations = await fetch('/api/education').then(res => res.json());
        if (educations.length === 0) return;

        // Estrutura html
        let html = '<section id="formacao" class="py-16"><h2 class="text-3xl font-bold text-center mb-12 section-title">Formação Acadêmica</h2>';
        html += '<div class="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">';
        educations.forEach(edu => {
            html += `
                <div class="card p-6">
                    <h3 class="text-xl font-semibold text-blue-600 mb-2">${edu.degree}</h3>
                    <p class="text-gray-700">${edu.institution}</p>
                    <p class="text-gray-500 text-sm">Concluído em ${edu.completionYear}</p>
                </div>
            `;
        });
        html += '</div></section>';
        container.innerHTML = html;
    } catch (error) {
        console.error('Erro ao carregar Formação:', error);
    }
}
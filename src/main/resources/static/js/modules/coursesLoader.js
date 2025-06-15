// 5. Carrega a seção "Cursos Complementares"
export async function loadCourses() {
    const container = document.getElementById('cursos-content');
    try {
        const courses = await fetch('/api/courses').then(res => res.json());
        if (courses.length === 0) return;

        // Estrutura html
        let html = '<section id="cursos" class="py-16 bg-gray-50 rounded-xl"><h2 class="text-3xl font-bold text-center mb-12 section-title">Cursos Complementares</h2>';
        html += '<div class="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">';
        courses.forEach(course => {
            html += `
                <div class="card p-6 flex items-center">
                    <i class="${course.iconClass} text-blue-500 text-3xl mr-4"></i>
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800">${course.title}</h3>
                    </div>
                </div>
            `;
        });
        html += '</div></section>';
        container.innerHTML = html;
    } catch (error) {
        console.error('Erro ao carregar Cursos:', error);
    }
}

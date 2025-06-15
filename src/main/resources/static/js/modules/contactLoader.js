// 7. Carrega a seção "Contato"
export async function loadContact() {
    // 1. Encontra o <div> vazio no index.html onde o conteúdo será inserido.
    const container = document.getElementById('contato-content');
    
    try {
        // 2. Faz uma chamada para a nova API que criamos para buscar os links de contato.
        const links = await fetch('/api/contact-links').then(res => res.json());

        // Se não houver links cadastrados, a função para aqui.
        if (links.length === 0) return;

        // 3. Constrói o HTML da seção de "Contato" dinamicamente.
        let html = `
            <section id="contato" class="py-16 bg-gray-50 rounded-xl">
                <h2 class="text-3xl font-bold text-center mb-12 section-title">Entre em Contato</h2>
                <div class="max-w-lg mx-auto text-center">
                    <p class="text-gray-700 text-lg mb-8">
                        Estou sempre aberto a novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato!
                    </p>
                    <div class="flex justify-center items-start space-x-8">`;

        // 4. Cria um link <a> para cada item retornado pela API.
        links.forEach(link => {
            html += `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 transition duration-300 contact-icon" title="${link.name}">
                    <i class="${link.iconClass} fa-3x"></i>
                    <p class="text-sm mt-1">${link.name}</p>
                </a>`;
        });

        html += `
                    </div>
                </div>
            </section>`;
        
        // 5. Insere o HTML completo no <div> que encontramos no passo 1.
        container.innerHTML = html;

    } catch (error) {
        console.error('Erro ao carregar a seção de Contato:', error);
    }
}
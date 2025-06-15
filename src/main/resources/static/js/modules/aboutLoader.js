// 1. Carrega a seção "Sobre" (Header) - VERSÃO CORRIGIDA
export async function loadAboutInfo() {
    const imgElement = document.querySelector('#sobre img');
    const h1Element = document.querySelector('#sobre h1');
    const pSubElement = document.querySelector('#sobre p.text-xl');
    const pDescElement = document.querySelector('#sobre p.text-lg');

    // Garante que a imagem comece invisível
    imgElement.style.display = 'none';

    try {
        const response = await fetch('/api/about');
        if (!response.ok) {
            // Se não encontrar dados 'Sobre', simplesmente não faz nada e a seção fica vazia.
            throw new Error('Nenhuma informação "Sobre" encontrada.');
        }

        const about = await response.json();

        if (about) {
            // Verifica se a URL da imagem existe
            if (about.profileImageUrl && about.profileImageUrl.trim() !== '') {
                
                // --- LÓGICA da URL ---
                let imageUrl = about.profileImageUrl.trim(); // Remove espaços extras
                imageUrl = imageUrl.replace(/\\/g, '/');    // Converte barras invertidas para normais
                if (!imageUrl.startsWith('/')) {           // Garante que comece com /
                    imageUrl = '/' + imageUrl;
                }
                // --- FIM DA LÓGICA ---

                imgElement.src = imageUrl;
                imgElement.style.display = 'block'; // Mostra a imagem
            }
            
            h1Element.textContent = about.name || '';
            pSubElement.textContent = about.subtitle || '';
            pDescElement.textContent = about.description || '';
        }
    } catch (error) {
        // Em caso de erro, a seção simplesmente ficará vazia.
        console.log("Info: " + error.message);
    }
}
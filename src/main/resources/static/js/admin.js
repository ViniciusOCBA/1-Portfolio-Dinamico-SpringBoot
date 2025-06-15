document.addEventListener('DOMContentLoaded', () => {

    // Lista principal de ícones para Habilidades e Cursos
    const mainIconList = [
        { name: 'Java', value: 'fab fa-java' },
        { name: 'Python', value: 'fab fa-python' },
        { name: 'JavaScript', value: 'fab fa-js-square' },
        { name: 'HTML5', value: 'fab fa-html5' },
        { name: 'CSS3', value: 'fab fa-css3-alt' },
        { name: 'React', value: 'fab fa-react' },
        { name: 'Node.js', value: 'fab fa-node-js' },
        { name: 'Docker', value: 'fab fa-docker' },
        { name: 'Git', value: 'fab fa-git-alt' },
        { name: 'AWS', value: 'fab fa-aws' },
        { name: 'Linux', value: 'fab fa-linux' },
        { name: 'Banco de Dados', value: 'fas fa-database' },
        { name: 'Servidor', value: 'fas fa-server' },
        { name: 'Redes', value: 'fas fa-network-wired' },
        { name: 'Código', value: 'fas fa-code' },
        { name: 'Engrenagens (Cogs)', value: 'fas fa-cogs' },
        { name: 'Certificado', value: 'fas fa-certificate' },
        { name: 'Escudo (Segurança)', value: 'fas fa-shield-alt' },
        { name: 'Check (Genérico)', value: 'fas fa-check-circle' },
        { name: 'Diagrama de Projeto', value: 'fas fa-project-diagram' },
    ];

    // Nova lista de ícones específica para Contato
    const contactIconList = [
        { name: 'E-mail', value: 'fas fa-envelope' },
        { name: 'Telefone', value: 'fas fa-phone' },
        { name: 'WhatsApp', value: 'fab fa-whatsapp' },
        { name: 'Instagram', value: 'fab fa-instagram' },
        { name: 'Facebook', value: 'fab fa-facebook' },
        { name: 'LinkedIn', value: 'fab fa-linkedin' },
    ];

    // Função de preenchimento de ícones
    function populateIconSelect(selectId, icons) {
        const selectElement = document.getElementById(selectId);
        if (!selectElement) return;

        selectElement.innerHTML = '<option value="">Selecione um ícone...</option>';

        icons.forEach(icon => {
            const option = document.createElement('option');
            option.value = icon.value;
            option.textContent = icon.name;
            selectElement.appendChild(option);
        });
    }

    // Lógica de Navegação por Abas
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    function activateTab(targetId) {
        tabLinks.forEach(l => l.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        const link = document.querySelector(`.tab-link[href="#${targetId}"]`);
        if (link) link.classList.add('active');
        const content = document.getElementById(targetId);
        if (content) content.classList.add('active');
    }
    tabLinks.forEach(link => {
        link.addEventListener('click', e => {
            if (link.getAttribute('href') === '/logout') return;
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            window.location.hash = targetId;
            activateTab(targetId);
        });
    });
    const currentHash = window.location.hash.substring(1);
    if (currentHash) {
        activateTab(currentHash);
    } else {
        activateTab('about');
    }

    // Função genérica para CRUD
    const api = {
        get: async (endpoint) => fetch(endpoint).then(res => res.json()),
        post: async (endpoint, body) => fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
        put: async (endpoint, body) => fetch(endpoint, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
        delete: async (endpoint) => fetch(endpoint, { method: 'DELETE' }),
    };

    // Função genérica para inicializar uma seção CRUD
    function initializeCrudSection(config) {
        const form = document.getElementById(config.formId);
        const list = document.getElementById(config.listId);
        const idField = document.getElementById(config.idField);
        const clearBtn = document.getElementById(config.clearBtnId);
        async function loadItems() {
            try {
                const items = await api.get(config.endpoint);
                if (!list) return; // Adicionado para segurança
                list.innerHTML = '';
                items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'flex justify-between items-center p-3 bg-gray-50 rounded shadow-sm';
                    itemDiv.innerHTML = `<p class="font-medium">${item[config.displayField]}</p><div><button class="edit-btn text-blue-600 mr-3" data-id="${item.id}">Editar</button><button class="delete-btn text-red-600" data-id="${item.id}">Excluir</button></div>`;
                    list.appendChild(itemDiv);
                });
            } catch (error) { console.error(`Erro ao carregar itens de ${config.endpoint}:`, error); }
        }
        if (form) { // Adicionado para segurança
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const id = idField.value;
                const body = config.getFormData();
                if (id) { await api.put(`${config.endpoint}/${id}`, body); } else { await api.post(config.endpoint, body); }
                form.reset(); idField.value = ''; loadItems();
            });
        }
        if (list) {
            list.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                if (e.target.classList.contains('edit-btn')) {
                    const item = await api.get(`${config.endpoint}/${id}`);
                    config.populateForm(item);
                }
                if (e.target.classList.contains('delete-btn')) {
                    if (confirm(config.deleteConfirmMsg)) { await api.delete(`${config.endpoint}/${id}`); loadItems(); }
                }
            });
        }
        if (clearBtn) { clearBtn.addEventListener('click', () => { form.reset(); idField.value = ''; }); }
        if (list) {
            loadItems();
        }
    }

    // Configuração das Seções
    (async function handleAbout() {
        const form = document.getElementById('about-form');
        if (!form) return;
        try {
            const aboutData = await api.get('/api/about');
            if (aboutData) {
                document.getElementById('about-name').value = aboutData.name || '';
                document.getElementById('about-subtitle').value = aboutData.subtitle || '';
                document.getElementById('about-description').value = aboutData.description || '';
                document.getElementById('about-profileImageUrl').value = aboutData.profileImageUrl || '';
            }
        } catch (error) { console.log("Ainda não há informações 'Sobre'. Preencha o formulário para criar."); }
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const body = { name: document.getElementById('about-name').value, subtitle: document.getElementById('about-subtitle').value, description: document.getElementById('about-description').value, profileImageUrl: document.getElementById('about-profileImageUrl').value, };
            await api.put('/api/about', body);
            alert('Informações "Sobre" salvas com sucesso!');
        });
    })();
    initializeCrudSection({ endpoint: '/api/education', formId: 'education-form', listId: 'education-list', idField: 'education-id', clearBtnId: 'education-clear-btn', displayField: 'degree', deleteConfirmMsg: 'Tem certeza que deseja excluir esta formação?', getFormData: () => ({ degree: document.getElementById('education-degree').value, institution: document.getElementById('education-institution').value, completionYear: document.getElementById('education-completionYear').value, }), populateForm: (item) => { document.getElementById('education-id').value = item.id; document.getElementById('education-degree').value = item.degree; document.getElementById('education-institution').value = item.institution; document.getElementById('education-completionYear').value = item.completionYear; } });
    initializeCrudSection({ endpoint: '/api/experience', formId: 'experience-form', listId: 'experience-list', idField: 'experience-id', clearBtnId: 'experience-clear-btn', displayField: 'jobTitle', deleteConfirmMsg: 'Tem certeza que deseja excluir esta experiência?', getFormData: () => ({ jobTitle: document.getElementById('experience-jobTitle').value, company: document.getElementById('experience-company').value, duration: document.getElementById('experience-duration').value, descriptionItems: document.getElementById('experience-descriptionItems').value.split('\n').filter(line => line.trim() !== ''), }), populateForm: (item) => { document.getElementById('experience-id').value = item.id; document.getElementById('experience-jobTitle').value = item.jobTitle; document.getElementById('experience-company').value = item.company; document.getElementById('experience-duration').value = item.duration; document.getElementById('experience-descriptionItems').value = item.descriptionItems.join('\n'); } });
    initializeCrudSection({ endpoint: '/api/skills', formId: 'skill-form', listId: 'skill-list', idField: 'skill-id', clearBtnId: 'skill-clear-btn', displayField: 'name', deleteConfirmMsg: 'Tem certeza que deseja excluir esta habilidade?', getFormData: () => ({ name: document.getElementById('skill-name').value, iconClass: document.getElementById('skill-iconClass').value, }), populateForm: (item) => { document.getElementById('skill-id').value = item.id; document.getElementById('skill-name').value = item.name; document.getElementById('skill-iconClass').value = item.iconClass; } });
    initializeCrudSection({ endpoint: '/api/courses', formId: 'course-form', listId: 'course-list', idField: 'course-id', clearBtnId: 'course-clear-btn', displayField: 'title', deleteConfirmMsg: 'Tem certeza que deseja excluir este curso?', getFormData: () => ({ title: document.getElementById('course-title').value, iconClass: document.getElementById('course-iconClass').value, }), populateForm: (item) => { document.getElementById('course-id').value = item.id; document.getElementById('course-title').value = item.title; document.getElementById('course-iconClass').value = item.iconClass; } });
    initializeCrudSection({ endpoint: '/api/projects', formId: 'project-form', listId: 'project-list', idField: 'project-id', clearBtnId: 'project-clear-btn', displayField: 'title', deleteConfirmMsg: 'Tem certeza que deseja excluir este projeto?', getFormData: () => ({ title: document.getElementById('project-title').value, shortDescription: document.getElementById('project-shortDescription').value, longDescription: document.getElementById('project-longDescription').value, imageUrl: document.getElementById('project-imageUrl').value, detailImageUrl: document.getElementById('project-detailImageUrl').value, technologies: document.getElementById('project-technologies').value.split('\n').map(tech => tech.trim()).filter(tech => tech), }), populateForm: (item) => { document.getElementById('project-id').value = item.id; document.getElementById('project-title').value = item.title; document.getElementById('project-shortDescription').value = item.shortDescription; document.getElementById('project-longDescription').value = item.longDescription; document.getElementById('project-imageUrl').value = item.imageUrl; document.getElementById('project-detailImageUrl').value = item.detailImageUrl; document.getElementById('project-technologies').value = item.technologies.join('\n'); } });
    initializeCrudSection({ endpoint: '/api/contact-links', formId: 'contact-link-form', listId: 'contact-link-list', idField: 'contact-link-id', clearBtnId: 'contact-link-clear-btn', displayField: 'name', deleteConfirmMsg: 'Tem certeza que deseja excluir este link de contato?', getFormData: () => ({ name: document.getElementById('contact-link-name').value, url: document.getElementById('contact-link-url').value, iconClass: document.getElementById('contact-link-iconClass').value, }), populateForm: (item) => { document.getElementById('contact-link-id').value = item.id; document.getElementById('contact-link-name').value = item.name; document.getElementById('contact-link-url').value = item.url; document.getElementById('contact-link-iconClass').value = item.iconClass; } });

    // Chamadas para preencher os menus de ícones
    populateIconSelect('skill-iconClass', mainIconList);
    populateIconSelect('course-iconClass', mainIconList);
    populateIconSelect('contact-link-iconClass', contactIconList);
});
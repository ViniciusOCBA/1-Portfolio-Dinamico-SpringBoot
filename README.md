

* * *

Portfólio Pessoal Dinâmico com Spring Boot
==========================================

Este é um projeto de um site de portfólio pessoal completo, construído com um backend robusto em Java e Spring Boot e um frontend moderno e dinâmico. A aplicação permite o gerenciamento de todo o conteúdo do portfólio através de um painel de administração seguro, com os dados persistidos em um banco de dados MySQL.
✨ Funcionalidades Principais

----------------------------

* **Conteúdo 100% Dinâmico**: Todas as seções do portfólio (Sobre, Experiência, Projetos, etc.) são carregadas a partir de um banco de dados, sem nenhum conteúdo fixo no HTML.
* **Painel de Administração Seguro**: Uma área privada (`/admin.html`) protegida por login e senha, onde é possível realizar operações de CRUD (Criar, Ler, Atualizar, Deletar) para todo o conteúdo do site.
* **API RESTful**: Um backend bem definido que expõe endpoints para cada tipo de dado (ex: `/api/projects`, `/api/skills`), facilitando a comunicação com o frontend.
* **Frontend Modular**: O JavaScript do frontend público foi refatorado em módulos (ES6) para melhor organização e manutenibilidade.
* **Interface Interativa**: A seção de projetos inclui um carrossel funcional e modais para exibir detalhes, proporcionando uma melhor experiência ao usuário.
* **Autenticação Segura**: O acesso ao painel de administração é protegido pelo Spring Security.

🛠️ Tecnologias Utilizadas
--------------------------

#### Backend

* **Java**
* **Spring Boot**: Framework principal para a construção da aplicação.
* **Spring Web**: Para a criação dos endpoints RESTful.
* **Spring Data JPA**: Para a persistência de dados e comunicação com o banco.
* **Spring Security**: Para o controle de autenticação e autorização.
* **Maven**: Para gerenciamento de dependências e build do projeto.

#### Frontend

* **HTML5**
* **CSS3** com **Tailwind CSS**: Para estilização rápida e responsiva.
* **JavaScript (ES6 Modules)**: Para a dinâmica da página e interatividade.

#### Banco de Dados

* **MySQL**

🚀 Como Executar o Projeto
--------------------------

Para rodar este projeto localmente, siga os passos abaixo:

1. **Pré-requisitos**:
   
   * Ter o Java (versão 24 ou superior) e o Maven instalados.
   * Ter um servidor MySQL rodando na sua máquina.

2. **Clone o Repositório**:
   Bash
      git clone <url-do-seu-repositorio>
      cd portfolio

3. **Configure o Banco de Dados**:
   
   * Abra o arquivo `src/main/resources/application.properties`.
   * Altere as propriedades `spring.datasource.username` e `spring.datasource.password` com as suas credenciais do MySQL.
   * A aplicação criará o banco de dados `portfolio` automaticamente na primeira inicialização, se ele não existir.

4. **Execute a Aplicação**:
   
   * Abra um terminal na raiz do projeto e execute o comando Maven:
   
   Bash
      mvn spring-boot:run

5. **Acesse as Páginas**:
   
   * **Portfólio Público**: Abra seu navegador e acesse `http://localhost:8080`
   * **Painel de Administração**: Acesse `http://localhost:8080/admin.html`

🔐 Acesso ao Painel de Administração
------------------------------------

Para acessar o painel de controle, utilize as credenciais padrão definidas no arquivo `SecurityConfig.java`:

* **Usuário**: `admin`
* **Senha**: `password`



# Leadboost

## Resolução de Problemas

Problemas identificados no projeto. Aqui está um resumo das correções implementadas antes de add um banco de dados:

### Index
1. O atributo `action` foi adicionado ao formulário para especificar para onde os dados devem ser enviados.
2. Valores foram fornecidos para os atributos `name` nos campos de entrada.
3. A tag `form` foi corretamente fechada.
4. A tag `a` foi colocada dentro da tag `form` para garantir que seja parte do formulário.

### Home
5. O problema da tag `<tfoot>` aberta e não fechada foi resolvido. Agora, uma tag `<tbody>` foi adicionada para envolver as linhas da tabela, melhorando a estrutura HTML.
6. A tag `<thead>` foi adicionada para incluir as colunas da tabela no cabeçalho.
7. A tag `<img>` dentro da tag `<nav>` foi corretamente fechada.
8. Um ícone de Bootstrap foi adicionado ao botão "Pesquisar".

### Administrador
9. Os scripts e links foram agrupados em seções separadas para melhor organização.
10. A tag de script foi movida para o final do corpo (`</body>`) para garantir que o HTML seja carregado antes do script.
11. Os caminhos das imagens foram ajustados para garantir que estejam corretos, considerando a estrutura do projeto.
12. Comentários foram adicionados para explicar o propósito de certas seções.

### Form
13. Os elementos no `<head>` foram agrupados para facilitar a leitura.
14. A tag `<footer>` foi corretamente colocada dentro do `<body>`, seguindo as boas práticas.
15. Comentários foram adicionados para explicar certas seções do código.

### Funcionários
16. Os links de CSS e JavaScript foram corrigidos para evitar problemas com diretórios locais.
17. No botão "Baixar", o link correto foi fornecido ou o atributo `href` foi removido, se não necessário.
18. Melhorias foram adicionadas ao formulário de pesquisa, considerando funcionalidades como ação de pesquisa real e destaque visual.
19. Certificou-se de que os IDs nas tabelas são únicos, usando classes em vez de IDs para garantir o bom funcionamento do script de edição.
20. O layout responsivo foi aprimorado, ajustando o tamanho dos campos ou utilizando classes de coluna do Bootstrap conforme necessário.
21. Verificação de atualizações do Bootstrap e outras bibliotecas foi realizada para garantir melhorias de desempenho e segurança.
22. O problema da margem do formulário "Adicionar funcionário" sendo coberta pelo rodapé foi resolvido.

### Perfil do Funcionário
23. O problema no repasse de páginas foi resolvido.

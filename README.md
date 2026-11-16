# Minha Estante — Projeto de Experiência do Usuário

Projeto apresentado ao Centro Universitário [FEI](https://portal.fei.edu.br/), como parte dos requisitos necessários para aprovação na disciplina de Experiência do Usuário (CCP310) do curso de Ciência da Computação, orientado pelo Prof. Dr. [Fagner de Assis Moura Pimentel](http://lattes.cnpq.br/6747210702910392).

Este projeto é desenvolvido pelos seguintes alunos:

- Gabriely Alves de Souza
- Monyse Andrade de Souza

## Conhecendo o problema

**Minha Estante** é o nome do aplicativo desenvolvido neste projeto.

**Breve descrição.** Aplicativo mobile para leitores registrarem os livros que já leram, estão lendo ou querem ler, acompanharem metas de leitura, guardarem sua opinião (nota e resenha) e descobrirem novos livros com recomendações que explicam o motivo da sugestão. Opcionalmente, importa o progresso do Kindle.

**Objetivo.** Reduzir ao mínimo o esforço de registrar e acompanhar a própria leitura, para que o hábito de registrar se mantenha. A pesquisa com usuários mostrou que o problema central não é a falta de vontade, e sim aplicativos que exigem cadastros longos e acabam abandonados.

**Usuário final.** Leitoras jovens adultas (predominantemente 18 a 24 anos) que trabalham e/ou estudam, leem por lazer, têm pouco tempo livre e hoje não mantêm nenhum sistema de registro que funcione. A pesquisa identificou três segmentos, representados por três personas: **Yasmin** (descobre livros nas redes sociais e não tem onde guardar), **Camila** (tem meta de leitura, mas perde a contagem) e **Letícia** (lê no Kindle e não quer manter dois sistemas).

**Principais benefícios para o usuário.**
- Registro rápido: marcar um livro como lido não exige nota, resenha ou categoria.
- Acompanhamento claro da meta, por livros, páginas ou tempo.
- Espaço para guardar a opinião pessoal sobre cada livro.
- Recomendações com motivo explícito (por exemplo, "porque você leu...").
- Integração opcional com o Kindle, evitando atualizar dois lugares.
- Funcionalidades sociais desligadas por padrão, respeitando quem prefere uma experiência privada.
- Acessibilidade tratada como requisito (contraste, leitor de tela e alvos de toque), conforme `docs/7_requisitos_ux.md`.

**Funcionalidades.** O **Minha Estante** oferece: estante de livros (lido, lendo, quero ler); busca e adição de livros; detalhes do livro com categoria opcional; avaliação (nota) e resenha; metas de leitura com painel de progresso e estatísticas; cadastro e login; recomendações personalizadas (aba Buscar, "Buscar & Descobrir"); conexão e sincronização com o Kindle; perfil, privacidade e notificações (aba Perfil).

**Tecnologias e ferramentas computacionais utilizadas.** Google Forms e WhatsApp (coleta de dados com usuários); Markdown e Mermaid (documentação e diagramas); GitHub (versionamento); Figma (protótipo de alta fidelidade). A tecnologia de implementação do aplicativo não faz parte desta entrega, que é focada no processo de UX.

**Contexto de uso.** Uso no celular, em pausas curtas e fragmentadas do dia — no trajeto de transporte público, entre tarefas do trabalho ou da faculdade e à noite — muitas vezes com atenção dividida, pouca luz e possível conexão instável (hipótese). Ver detalhes em `docs/5_cenarios.md`.

## Desenvolvimento

### Descoberta
- [Análise de Concorrência](docs/1_concorrencia.md)
- [Pesquisa e Coleta de Dados com Usuários](docs/2_pesquisa_usuarios.md)
- [Perfil do Usuário](docs/3_perfil_usuario.md)
- [Personas](docs/4_personas.md)
- [Cenário de Análise/Problema](docs/5_cenarios.md)

### Definição
- [Análise de Tarefas](docs/6_analise_tarefas.md)
- [Requisitos de UX e Metas de Usabilidade](docs/7_requisitos_ux.md)
- [Arquitetura de Informação e Fluxo do Usuário](docs/8_arquitetura_fluxo.md)

### Prototipação
- [Prototipação em Papel](docs/9_prototipacao_papel.md)
- [Prototipação de Alta Fidelidade (FIGMA)](docs/10_prototipacao_figma.md)

### Avaliação
- [Planejamento da Avaliação](docs/11_planejamento_avaliacao.md)
- [Avaliação de Usabilidade através de Inspeção Heurística](docs/12_heuristica.md)
- [Teste de Usabilidade com Observação do Usuário](docs/13_teste_usabilidade.md)

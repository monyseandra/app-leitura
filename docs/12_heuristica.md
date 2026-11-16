# Avaliação de IHC através de Inspeção Heurística — Minha Estante

## 1) Avaliação de IHC através de inspeção HEURÍSTICA

**Dez Heurísticas de Nielsen**

### Descrição da avaliação

A avaliação heurística é um método de avaliação de usabilidade definido por Nielsen e Molich (1994), no qual um avaliador identifica possíveis problemas de interação em uma interface por meio da análise de um conjunto de princípios de usabilidade, denominados heurísticas.

No projeto Minha Estante, a avaliação tem como objetivo identificar problemas que possam prejudicar a experiência dos usuários durante a utilização da plataforma, considerando as funcionalidades de pesquisa de livros, organização da estante virtual, acompanhamento de leitura, publicação de resenhas e gerenciamento de perfil.

A avaliação considera as diferentes telas e funcionalidades da plataforma, buscando identificar dificuldades de navegação, falta de feedback, inconsistências visuais, ausência de orientações e possíveis situações que comprometam a utilização do sistema.

### 1.1) Conjunto de heurísticas de Nielsen (1994)

**Tabela 1 — Conjunto de heurísticas de Nielsen (1994)**

| Nº | Heurística | Descrição |
| :---: | :--- | :--- |
| 1 | **Visibilidade do status do sistema** | O sistema deve manter os usuários informados sobre o que está acontecendo, fornecendo feedback adequado após ações como adicionar livros, salvar resenhas, atualizar informações e realizar pesquisas. |
| 2 | **Compatibilidade entre sistema e mundo real** | A plataforma deve utilizar palavras, expressões e conceitos familiares aos leitores, evitando termos técnicos desnecessários. As informações devem aparecer em uma ordem lógica e natural. |
| 3 | **Controle e liberdade para o usuário** | O usuário deve ter liberdade para desfazer ações realizadas por engano, cancelar operações, editar informações e retornar às telas anteriores sem dificuldades. |
| 4 | **Consistência e padrões** | Os elementos da interface, como botões, menus, ícones, cores e nomenclaturas, devem manter padrões consistentes em todas as telas da plataforma. |
| 5 | **Prevenção de erros** | A plataforma deve prevenir situações que possam gerar erros, utilizando validações de campos, confirmações para ações importantes e orientações durante o preenchimento de informações. |
| 6 | **Reconhecimento em lugar de lembrança** | As informações, opções e funcionalidades devem estar visíveis e facilmente identificáveis, evitando que o usuário precise memorizar caminhos ou informações de outras telas. |
| 7 | **Flexibilidade e eficiência de uso** | O sistema deve oferecer uma experiência eficiente tanto para usuários iniciantes quanto para usuários frequentes, disponibilizando atalhos e caminhos simplificados para tarefas recorrentes. |
| 8 | **Projeto minimalista e estético** | A interface deve apresentar somente informações relevantes para cada contexto, evitando excesso de elementos, textos, opções ou informações que possam prejudicar a compreensão. |
| 9 | **Auxiliar os usuários a reconhecer, diagnosticar e recuperar erros** | As mensagens de erro devem utilizar linguagem simples, explicar o que aconteceu e apresentar orientações para que o usuário consiga resolver o problema. |
| 10 | **Ajuda e documentação** | A plataforma deve oferecer orientações acessíveis e objetivas para auxiliar os usuários na utilização de suas funcionalidades, especialmente em tarefas que possam gerar dúvidas. |

### 1.2) Procedimento de avaliação

A avaliação do Minha Estante deve seguir as seguintes etapas:

1. Analisar individualmente as dez heurísticas de Nielsen.
2. Navegar por todas as telas da plataforma, incluindo Estante, Buscar, Progresso, Perfil, Login, Cadastro e funcionalidades de leitura e resenhas.
3. Identificar problemas que possam comprometer a experiência de utilização.
4. Classificar cada problema de acordo com a heurística correspondente.
5. Atribuir um grau de severidade entre 0 e 4, considerando o impacto do problema na utilização da plataforma.
6. Registrar a tela em que a violação foi identificada e incluir uma captura de tela que comprove o problema.
7. Repetir a análise até que não sejam identificadas novas violações.

**Importante:** nesta seção devem ser registradas somente as heurísticas que apresentarem violações. Heurísticas atendidas serão apresentadas na segunda parte do documento.

### 1.3) Tabela 2 — Grau de severidade dos problemas de usabilidade

| Grau de severidade | Tipo | Descrição |
| :---: | :--- | :--- |
| 0 | Sem importância | Não afeta a operação da interface. |
| 1 | Cosmético | Problema visual ou de apresentação, sem necessidade imediata de correção. |
| 2 | Simples | Problema de baixa prioridade, que pode ser corrigido para melhorar a experiência. |
| 3 | Grave | Problema de alta prioridade, que prejudica significativamente a utilização da plataforma. |
| 4 | Catastrófico | Problema extremamente grave, que impede ou compromete seriamente a realização de uma tarefa essencial. |

### 1.4) Declaração de violações identificadas no Minha Estante

As tabelas seguintes apresentam pontos de avaliação preliminar para as funcionalidades do Minha Estante. A severidade indicada é uma classificação inicial, que deve ser confirmada após a inspeção visual e funcional da versão final do protótipo.

#### Violação 1 — Estante: ausência de feedback após operações

| Campo | Descrição |
| :--- | :--- |
| Tela | Estante |
| Heurística violada | 1 — Visibilidade do status do sistema |
| Problema identificado | Deve-se verificar se, após adicionar um livro, alterar seu status ou removê-lo da estante, o sistema apresenta uma confirmação visual da operação. A ausência desse feedback pode deixar o usuário sem saber se a ação foi concluída. |
| Grau de severidade | 2 — Simples |
| Sugestão de melhoria | Implementar mensagens de confirmação, indicadores de carregamento e atualizações visuais após operações realizadas na estante. |
| Print | [Inserir captura da Estante após uma operação] |

#### Violação 2 — Buscar: ausência de orientação durante a pesquisa

| Campo | Descrição |
| :--- | :--- |
| Tela | Buscar |
| Heurística violada | 6 — Reconhecimento em lugar de lembrança |
| Problema identificado | Deve-se verificar se o campo de pesquisa apresenta orientações claras sobre o tipo de informação que pode ser inserida, como título do livro ou nome do autor. A ausência de indicação pode dificultar a compreensão da funcionalidade. |
| Grau de severidade | 1 — Cosmético |
| Sugestão de melhoria | Utilizar textos auxiliares no campo de pesquisa, exemplos de consulta e identificação clara dos filtros disponíveis. |
| Print | [Inserir captura da tela Buscar] |

#### Violação 3 — Detalhes do Livro: falta de confirmação de ações

| Campo | Descrição |
| :--- | :--- |
| Tela | Detalhes do Livro |
| Heurística violada | 3 — Controle e liberdade para o usuário |
| Problema identificado | Deve-se verificar se o usuário consegue cancelar ou corrigir uma alteração realizada por engano, como selecionar um status incorreto ou adicionar uma obra à estante sem intenção. |
| Grau de severidade | 2 — Simples |
| Sugestão de melhoria | Disponibilizar opções de cancelar, editar e remover livros, além de confirmações para operações que possam resultar em perda de informações. |
| Print | [Inserir captura dos detalhes do livro ou da operação] |

#### Violação 4 — Leitura e Resenhas: ausência de validação dos campos

| Campo | Descrição |
| :--- | :--- |
| Tela | Leitura e Resenhas |
| Heurística violada | 5 — Prevenção de erros |
| Problema identificado | Deve-se verificar se os campos de avaliação e resenha possuem validações adequadas. A ausência de orientações pode permitir o envio de informações incompletas ou causar dificuldades durante o preenchimento. |
| Grau de severidade | 2 — Simples |
| Sugestão de melhoria | Implementar validações dos campos, identificação de informações obrigatórias e avisos antes de descartar uma resenha ainda não salva. |
| Print | [Inserir captura do formulário de avaliação ou resenha] |

#### Violação 5 — Progresso: dificuldade na compreensão das estatísticas

| Campo | Descrição |
| :--- | :--- |
| Tela | Progresso |
| Heurística violada | 2 — Compatibilidade entre sistema e mundo real |
| Problema identificado | Deve-se verificar se os indicadores de progresso e estatísticas utilizam nomenclaturas compreensíveis para leitores. Gráficos ou números sem explicações podem dificultar a interpretação dos resultados. |
| Grau de severidade | 2 — Simples |
| Sugestão de melhoria | Utilizar títulos objetivos, descrições dos indicadores e representações visuais acompanhadas de informações que expliquem o significado de cada estatística. |
| Print | [Inserir captura da tela Progresso] |

#### Violação 6 — Perfil: inconsistência na apresentação dos elementos

| Campo | Descrição |
| :--- | :--- |
| Tela | Perfil |
| Heurística violada | 4 — Consistência e padrões |
| Problema identificado | Deve-se verificar se os botões, ícones, cores, tipografia e padrões de navegação seguem a mesma identidade visual das demais seções. Diferenças desnecessárias podem prejudicar a familiaridade do usuário com a interface. |
| Grau de severidade | 1 — Cosmético |
| Sugestão de melhoria | Padronizar os componentes visuais, mantendo as mesmas características de botões, menus, títulos, espaçamentos e elementos interativos. |
| Print | [Inserir captura da tela Perfil] |

#### Violação 7 — Login e Cadastro: ausência de mensagens de erro claras

| Campo | Descrição |
| :--- | :--- |
| Tela | Login e Cadastro |
| Heurística violada | 9 — Auxiliar os usuários a reconhecer, diagnosticar e recuperar erros |
| Problema identificado | Deve-se verificar se situações como campos vazios, formato inválido de e-mail ou senha incorreta apresentam mensagens claras. Mensagens genéricas podem dificultar a identificação e correção do problema. |
| Grau de severidade | 3 — Grave |
| Sugestão de melhoria | Apresentar mensagens próximas aos campos correspondentes, explicando o problema e indicando como o usuário pode corrigi-lo. |
| Print | [Inserir captura de uma situação de erro no Login ou Cadastro] |

#### Violação 8 — Configurações: ausência de orientações sobre funcionalidades

| Campo | Descrição |
| :--- | :--- |
| Tela | Configurações |
| Heurística violada | 10 — Ajuda e documentação |
| Problema identificado | Deve-se verificar se as configurações e opções de acessibilidade apresentam explicações suficientes para que o usuário compreenda suas finalidades. A ausência de orientações pode dificultar a utilização de recursos menos conhecidos. |
| Grau de severidade | 1 — Cosmético |
| Sugestão de melhoria | Incluir descrições breves para as configurações, explicando suas funções e os efeitos das alterações realizadas. |
| Print | [Inserir captura da tela Configurações] |

#### Violação 9 — Estante: ausência de atalhos para tarefas frequentes

| Campo | Descrição |
| :--- | :--- |
| Tela | Estante |
| Heurística violada | 7 — Flexibilidade e eficiência de uso |
| Problema identificado | Deve-se verificar se tarefas frequentes, como adicionar um livro, alterar seu status ou acessar uma resenha, exigem muitas etapas de navegação. Caminhos excessivamente longos podem prejudicar a eficiência dos usuários recorrentes. |
| Grau de severidade | 2 — Simples |
| Sugestão de melhoria | Disponibilizar atalhos para adicionar livros, acessar categorias da estante e atualizar informações diretamente nas telas em que essas ações são utilizadas com frequência. |
| Print | [Inserir captura da navegação da Estante] |

#### Violação 10 — Página Inicial: excesso de informações na interface

| Campo | Descrição |
| :--- | :--- |
| Tela | Página Inicial |
| Heurística violada | 8 — Projeto minimalista e estético |
| Problema identificado | Deve-se verificar se a página inicial apresenta informações, elementos decorativos ou opções em excesso, dificultando a identificação das principais funcionalidades da plataforma. |
| Grau de severidade | 1 — Cosmético |
| Sugestão de melhoria | Priorizar as informações essenciais, organizar os elementos em seções bem definidas e evitar conteúdos que não contribuam diretamente para a navegação ou compreensão da plataforma. |
| Print | [Inserir captura da Página Inicial] |

> **Nota sobre os registros:** as dez declarações acima são hipóteses de inspeção, não dez violações comprovadas. Após testar a versão atual do Minha Estante, devem permanecer somente os problemas efetivamente encontrados. Se uma heurística estiver sendo atendida, ela deverá ser retirada desta seção e considerada na seção de boas práticas.

---

## 2) INDICAÇÃO DE BOAS PRÁTICAS DE HEURÍSTICA — HEURÍSTICAS NÃO VIOLADAS

Nesta etapa, são apresentados exemplos de funcionalidades e decisões de interface do Minha Estante que demonstram a aplicação adequada dos princípios de usabilidade de Nielsen.

Diferentemente da primeira parte, esta seção não apresenta problemas. Seu objetivo é identificar características positivas da plataforma que contribuem para uma experiência de utilização mais intuitiva, eficiente e agradável.

**Exemplos de boas práticas para inspeção:**

### Boa prática 1 — Visibilidade do status do sistema

**Heurística:** 1 — Visibilidade do status do sistema.

**Exemplo no Minha Estante:** a organização dos livros por status de leitura permite que o usuário visualize quais obras estão marcadas como lidas, em andamento ou desejadas.

**Benefício:** facilita a compreensão da situação atual da biblioteca pessoal e permite acompanhar as alterações realizadas na estante.

**Print:** [Inserir captura da Estante com os status dos livros.]

### Boa prática 2 — Compatibilidade entre sistema e mundo real

**Heurística:** 2 — Compatibilidade entre sistema e mundo real.

**Exemplo no Minha Estante:** utilização de expressões familiares ao universo literário, como "Minha Estante", "Livros Lidos", "Quero Ler" e "Resenhas".

**Benefício:** aproxima a linguagem da plataforma do vocabulário utilizado pelos leitores, facilitando a compreensão das funcionalidades.

**Print:** [Inserir captura da navegação principal.]

### Boa prática 3 — Controle e liberdade para o usuário

**Heurística:** 3 — Controle e liberdade para o usuário.

**Exemplo no Minha Estante:** a organização dos livros por categorias de leitura permite que o usuário altere o status de uma obra conforme sua evolução, passando de "Quero Ler" para "Lendo" e posteriormente para "Lido".

**Benefício:** permite que a biblioteca acompanhe as mudanças na experiência de leitura do usuário.

**Print:** [Inserir captura das opções de status de leitura.]

### Boa prática 4 — Consistência e padrões

**Heurística:** 4 — Consistência e padrões.

**Exemplo no Minha Estante:** utilização de uma identidade visual própria, com paleta de cores, tipografia e organização de elementos que devem ser mantidas nas diferentes seções da plataforma.

**Benefício:** facilita o reconhecimento dos componentes e proporciona uma experiência visual uniforme.

**Print:** [Inserir capturas de duas ou mais seções para comparação.]

### Boa prática 5 — Prevenção de erros

**Heurística:** 5 — Prevenção de erros.

**Exemplo no Minha Estante:** a utilização de opções de status de leitura predefinidas permite que o usuário selecione uma categoria existente, em vez de precisar digitar manualmente a classificação de cada livro.

**Benefício:** reduz a possibilidade de inconsistências na organização da biblioteca.

**Print:** [Inserir captura das opções de classificação dos livros.]

### Boa prática 6 — Reconhecimento em lugar de lembrança

**Heurística:** 6 — Reconhecimento em lugar de lembrança.

**Exemplo no Minha Estante:** divisão da navegação em seções identificadas como Estante, Buscar, Progresso e Perfil.

**Benefício:** permite que o usuário reconheça rapidamente onde encontrar cada funcionalidade, sem precisar memorizar caminhos complexos.

**Print:** [Inserir captura do menu de navegação.]

### Boa prática 7 — Flexibilidade e eficiência de uso

**Heurística:** 7 — Flexibilidade e eficiência de uso.

**Exemplo no Minha Estante:** possibilidade de adicionar livros à biblioteca por meio da pesquisa ou da funcionalidade de importação prevista no projeto.

**Benefício:** oferece alternativas para a inclusão de obras, permitindo que o usuário escolha o caminho mais conveniente.

**Print:** [Inserir captura da tela Buscar e da opção de importação, caso implementada.]

### Boa prática 8 — Projeto minimalista e estético

**Heurística:** 8 — Projeto minimalista e estético.

**Exemplo no Minha Estante:** utilização de uma identidade visual relacionada ao universo literário, com organização das funcionalidades em seções específicas, evitando concentrar todas as informações em uma única tela.

**Benefício:** melhora a organização visual e facilita a identificação das funcionalidades principais.

**Print:** [Inserir captura da Estante ou Página Inicial.]

### Boa prática 9 — Auxiliar os usuários a reconhecer, diagnosticar e recuperar erros

**Heurística:** 9 — Auxiliar os usuários a reconhecer, diagnosticar e recuperar erros.

**Exemplo no Minha Estante:** utilização de mensagens explicativas em situações de validação de cadastro, login ou preenchimento de formulários, quando disponíveis na implementação.

**Benefício:** permite que o usuário compreenda o motivo de uma operação não ter sido concluída e saiba como corrigir a situação.

**Print:** [Inserir captura de uma mensagem de validação ou erro.]

### Boa prática 10 — Ajuda e documentação

**Heurística:** 10 — Ajuda e documentação.

**Exemplo no Minha Estante:** disponibilização de orientações e descrições junto às funcionalidades de cadastro de livros, avaliação e publicação de resenhas, quando presentes na interface.

**Benefício:** facilita o aprendizado da plataforma e reduz a necessidade de ajuda externa para realizar tarefas.

**Print:** [Inserir captura das orientações disponíveis na interface.]

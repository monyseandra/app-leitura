# 12. AVALIAÇÃO DE IHC ATRAVÉS DE INSPEÇÃO HEURÍSTICA — MINHA ESTANTE

## 1) Avaliação de IHC através de Inspeção Heurística

**Dez Heurísticas de Nielsen (1994)**

### Descrição da avaliação

A avaliação heurística é um método de inspeção de usabilidade no qual um avaliador identifica possíveis problemas de interação em uma interface com base em princípios consolidados de usabilidade.

No projeto **Minha Estante**, esta avaliação tem como objetivo analisar as telas desenvolvidas, verificando se a interface oferece uma experiência intuitiva, organizada, acessível e adequada às necessidades dos leitores.

Foram consideradas as seguintes telas e funcionalidades: Início, Estante, Buscar, Detalhes do Livro, Progresso, Perfil, Login, Cadastro, Comunidade, Avaliações, Resenhas e Acessibilidade.

### 1.1) Conjunto de heurísticas de Nielsen (1994)

**Tabela 1 — Conjunto de heurísticas de Nielsen (1994)**

| Nº | Heurística | Descrição aplicada ao Minha Estante |
| :---: | :--- | :--- |
| 1 | **Visibilidade do status do sistema** | O sistema apresenta mensagens de confirmação após ações, como alteração do status de leitura, registro de sessões e atualização de páginas. Também informa quando os dados estão salvos no navegador. |
| 2 | **Compatibilidade entre sistema e mundo real** | A plataforma utiliza termos familiares aos leitores, como "Estante", "Quero Ler", "Lendo", "Lidos", "Resenhas" e "Avaliações", facilitando a compreensão das funcionalidades. |
| 3 | **Controle e liberdade para o usuário** | O usuário pode navegar entre telas, retornar às páginas anteriores, alterar o status dos livros, remover títulos e descartar resenhas. |
| 4 | **Consistência e padrões** | A interface mantém padrões visuais de cores, tipografia, botões, ícones, cartões e elementos de navegação nas diferentes telas. |
| 5 | **Prevenção de erros** | Os formulários de cadastro possuem validações de nome, e-mail, senha, confirmação de senha e aceite dos termos. As resenhas também possuem limite de 500 caracteres. |
| 6 | **Reconhecimento em lugar de lembrança** | A navegação principal apresenta as opções Início, Biblioteca, Progresso, Buscar, Comunidade e Perfil, permitindo que o usuário identifique facilmente as funcionalidades disponíveis. |
| 7 | **Flexibilidade e eficiência de uso** | O sistema oferece pesquisa de livros, filtros por status de leitura, atalhos de navegação e registro de sessões para facilitar o acompanhamento das atividades. |
| 8 | **Projeto minimalista e estético** | A interface utiliza uma identidade visual relacionada ao universo literário, com cores harmoniosas, cartões organizados, capas ilustrativas e informações distribuídas por seções. |
| 9 | **Auxiliar os usuários a reconhecer, diagnosticar e recuperar erros** | Os formulários apresentam mensagens próximas aos campos inválidos, explicando o problema e orientando o usuário sobre como corrigi-lo. |
| 10 | **Ajuda e documentação** | A plataforma possui um painel de acessibilidade com orientações sobre navegação por teclado, leitores de tela, ajustes visuais e leitura em voz alta. |

### 1.2) Tabela 2 — Grau de severidade dos problemas de usabilidade

**Tabela 2 — Classificação da severidade**

| Grau de severidade | Tipo | Descrição |
| :---: | :--- | :--- |
| 0 | Sem importância | Não afeta a operação da interface. |
| 1 | Cosmético | Problema visual ou de apresentação menor, sem necessidade urgente de correção. |
| 2 | Simples | Problema de baixa prioridade que pode ser aprimorado para melhorar a experiência. |
| 3 | Grave | Problema de alta prioridade que prejudica significativamente a realização de uma tarefa. |
| 4 | Catastrófico | Problema extremamente grave que impede o usuário de concluir uma tarefa essencial. |

---

### 1.3) Declaração de Violações Identificadas (Inspeção Preliminar)

#### Violação 1 — Perfil: ausência de documentação completa de ajuda
- **Tela:** Perfil e Acessibilidade.
- **Heurística violada:** 10 — Ajuda e documentação.
- **Problema identificado:** O sistema disponibiliza orientações de acessibilidade e informações sobre algumas funcionalidades, porém não apresenta uma seção independente com documentação completa ou tutorial de utilização da plataforma.
- **Grau de severidade:** 1 — Cosmético.
- **Sugestão de melhoria:** Implementar uma seção de ajuda com instruções sobre cadastro, organização de livros, acompanhamento de progresso, avaliações e utilização das ferramentas disponíveis.

#### Violação 2 — Navegação: ausência de orientação detalhada para novos usuários
- **Tela:** Início e Biblioteca.
- **Heurística violada:** 6 — Reconhecimento em lugar de lembrança.
- **Problema identificado:** Embora a navegação principal apresente as seções do sistema, novos usuários podem precisar de orientações adicionais para compreender todas as funcionalidades disponíveis.
- **Grau de severidade:** 2 — Simples.
- **Sugestão de melhoria:** Adicionar pequenas orientações introdutórias ou dicas visuais nas primeiras interações, explicando as principais funcionalidades da plataforma.

**Observação:** As violações acima representam pontos de melhoria identificados na inspeção preliminar, não impedimentos para a utilização do sistema.

---

## 2) Indicação de Boas Práticas de Heurística (Heurísticas Atendidas)

O projeto **Minha Estante** apresenta diversas características alinhadas aos princípios de usabilidade de Nielsen, conforme observado na análise de sua implementação.

1. **Visibilidade do status do sistema (H1):** O sistema apresenta mensagens de confirmação após alterações no status dos livros, registro de sessões e atualização de páginas. Também utiliza barras de progresso e indicadores percentuais para demonstrar a evolução das leituras.

2. **Compatibilidade entre sistema e mundo real (H2):** A linguagem utilizada é familiar ao universo literário, com expressões como "Quero ler", "Lendo", "Lido", "Avaliar livro" e "Minha Estante".

3. **Controle e liberdade para o usuário (H3):** O usuário pode modificar o status de leitura, remover livros, retornar às telas anteriores e descartar resenhas.

4. **Consistência e padrões (H4):** O projeto mantém uma identidade visual padronizada, utilizando variáveis de cores como `--bg`, `--card` e `--pri`, além de componentes visuais reutilizados nas diferentes telas.

5. **Prevenção de erros (H5):** O cadastro apresenta validações de campos obrigatórios, formato de e-mail, senha com mínimo de 8 caracteres, confirmação de senha e aceite dos termos de uso. O campo de resenha também possui limite de 500 caracteres.

6. **Reconhecimento em lugar de lembrança (H6):** A navegação principal fixa (`TABS`) apresenta as opções Início, Biblioteca, Progresso, Buscar, Comunidade e Perfil, facilitando o acesso às funcionalidades.

7. **Flexibilidade e eficiência de uso (H7):** A plataforma disponibiliza pesquisa de livros, filtros por situação de leitura, registro de sessões e atalhos para acessar diferentes funcionalidades.

8. **Projeto minimalista e estético (H8):** O layout utiliza cartões organizados, capas ilustrativas, tipografia e cores harmoniosas, proporcionando uma apresentação visual relacionada ao universo dos livros.

9. **Reconhecimento, diagnóstico e recuperação de erros (H9):** Os formulários apresentam mensagens específicas para problemas de preenchimento, como e-mail inválido, senha insuficiente e divergência na confirmação da senha. O sistema também direciona o foco ao primeiro campo inválido.

10. **Ajuda e documentação (H10):** O painel de acessibilidade disponibiliza ajustes de tamanho de texto, alto contraste, fonte para dislexia, espaçamento, redução de animações e leitura em voz alta. Também apresenta orientações sobre navegação por teclado e utilização de leitores de tela.

---

## 3) Considerações finais

A inspeção heurística do projeto Minha Estante permitiu analisar os principais elementos de interação e identificar características positivas de usabilidade, além de oportunidades de melhoria.

De maneira geral, a plataforma apresenta boa aderência às heurísticas de Nielsen, principalmente em relação à visibilidade das ações, consistência visual, prevenção de erros, reconhecimento das funcionalidades e acessibilidade.

As melhorias sugeridas buscam tornar a experiência ainda mais intuitiva, especialmente para usuários que estão utilizando a plataforma pela primeira vez.

A avaliação poderá ser complementada posteriormente por testes de usabilidade com usuários reais, permitindo identificar dificuldades de utilização e verificar a eficiência das soluções implementadas.

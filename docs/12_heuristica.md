# 12. AVALIAÇÃO DE IHC ATRAVÉS DE INSPEÇÃO HEURÍSTICA — MINHA ESTANTE

## 1) Avaliação de IHC através de Inspeção Heurística

**Dez Heurísticas de Nielsen**

### Descrição da avaliação
A avaliação heurística é um método de inspeção de usabilidade no qual um avaliador identifica problemas de interação em uma interface com base em princípios consolidados de usabilidade[cite: 2]. 

No projeto **Minha Estante**, esta avaliação tem como objetivo analisar as telas desenvolvidas (como Estante, Buscar, Detalhes do Livro, Progresso, Perfil, Login/Cadastro, Comunidade e Acessibilidade) para garantir uma experiência fluida, intuitiva e sem barreiras para os leitores.

### 1.1) Conjunto de heurísticas de Nielsen (1994)

**Tabela 1 — Conjunto de heurísticas de Nielsen (1994)**

| Nº | Heurística | Descrição aplicadada ao Minha Estante |
| :---: | :--- | :--- |
| 1 | **Visibilidade do status do sistema** | O sistema deve manter o usuário informado sobre ações como alteração de status de leitura, salvamento de rascunhos de resenhas e sincronização de dados[cite: 2]. |
| 2 | **Compatibilidade entre sistema e mundo real** | A plataforma deve usar termos familiares aos leitores (ex.: "Estante", "Quero Ler", "Lido", "Resenhas") e uma ordem lógica[cite: 2]. |
| 3 | **Controle e liberdade para o usuário** | O usuário deve poder desfazer ações, cancelar edições, remover livros da estante ou descartar rascunhos sem dificuldades[cite: 2]. |
| 4 | **Consistência e padrões** | Os elementos visuais (botões, ícones, fontes corporativas e variáveis de cores) devem manter um padrão consistente em todas as telas[cite: 2]. |
| 5 | **Prevenção de erros** | O sistema deve prevenir falhas utilizando validações em formulários de cadastro, senhas e limites de caracteres em resenhas[cite: 2]. |
| 6 | **Reconhecimento em lugar de lembrança** | As opções de navegação (Abas principais, filtros de status) devem estar visíveis para evitar que o usuário memorize caminhos[cite: 2]. |
| 7 | **Flexibilidade e eficiência de uso** | A interface deve atender tanto usuários iniciantes quanto frequentes, disponibilizando atalhos e busca rápida[cite: 2]. |
| 8 | **Projeto minimalista e estético** | A interface deve apresentar apenas informações relevantes ao contexto literário, evitando poluição visual[cite: 2]. |
| 9 | **Auxiliar os usuários a reconhecer, diagnosticar e recuperar erros** | Mensagens de erro em campos obrigatórios ou login incorreto devem ser claras e orientar a correção[cite: 2]. |
| 10 | **Ajuda e documentação** | A plataforma deve fornecer orientações de uso e acessibilidade acessíveis de forma clara[cite: 2]. |

### 1.2) Tabela 2 — Grau de severidade dos problemas de usabilidade

| Grau de severidade | Tipo | Descrição |
| :---: | :--- | :--- |
| 0 | Sem importância | Não afeta a operação da interface. |
| 1 | Cosmético | Problema visual ou de apresentação menor, sem necessidade urgente de correção. |
| 2 | Simples | Problema de baixa prioridade que pode ser aprimorado para melhorar a experiência. |
| 3 | Grave | Problema de alta prioridade que prejudica significativamente a realização de uma tarefa. |
| 4 | Catastrófico | Problema extremamente grave que impede o usuário de concluir uma tarefa essencial. |

---

## 1.3) Declaração de Violações Identificadas (Simulação / Inspeção Preliminar)

#### Violação 1 — Estante: ausência de feedback imediato em ações rápidas
- **Tela:** Estante[cite: 2]
- **Heurística violada:** 1 — Visibilidade do status do sistema[cite: 2]
- **Problema identificado:** Ao alterar o status de um livro diretamente, deve-se garantir que o aviso visual (toast/vibração) seja claro para confirmar que a ação foi salva no `localStorage`[cite: 2].
- **Grau de severidade:** 2 — Simples[cite: 2]
- **Sugestão de melhoria:** Assegurar o disparo consistente da função de notificação (`say`) a cada alteração de status[cite: 2].

#### Violação 2 — Login e Cadastro: mensagens de validação de senha
- **Tela:** Login e Cadastro[cite: 2]
- **Heurística violada:** 9 — Auxiliar os usuários a reconhecer, diagnosticar e recuperar erros[cite: 2]
- **Problema identificado:** Caso o usuário digite uma senha menor que 8 caracteres no cadastro, o sistema deve apontar o erro de forma explícita próximo ao campo[cite: 2].
- **Grau de severidade:** 3 — Grave[cite: 2]
- **Sugestão de melhoria:** Manter o foco automático (`focusErr`) no primeiro campo inválido do formulário[cite: 2].

---

## 2) Indicação de Boas Práticas de Heurística (Heurísticas Atendidas)

O projeto **Minha Estante** demonstra forte aderência aos princípios de usabilidade em várias frentes:

1. **Visibilidade do status do sistema (H1):** A barra de progresso percentual e contadores de páginas nos detalhes do livro refletem em tempo real a evolução do leitor.
2. **Compatibilidade com o mundo real (H2):** A linguagem empregada reflete o vocabulário real de leitores ("Quero ler", "Lendo", "Lido", avaliações em estrelas e tags de sensações).
3. **Reconhecimento em lugar de lembrança (H6):** A barra de navegação inferior fixa (`TABS`) mantém as seções principais (*Início, Biblioteca, Progresso, Buscar, Comunidade, Perfil*) sempre acessíveis à distância de um toque.
4. **Projeto Minimalista e Estético (H8):** O uso de variáveis de cores harmoniosas (`--bg`, `--card`, `--pri`) e capas customizadas com gradientes garante uma estética limpa e agradável ao universo literário.
5. **Flexibilidade e Acessibilidade (H7/H10):** O painel de acessibilidade dedicado permite ajustar tamanhos de fonte, ativar alto contraste, fonte para dislexia e até leitura em voz alta por síntese de fala.

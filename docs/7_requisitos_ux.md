# Requisitos de UX e Metas de Usabilidade

## 1) Características da Plataforma

| Característica | Descrição |
| :---- | :---- |
| Descrição do Software | Aplicativo mobile (iOS/Android) para registro, acompanhamento e recomendação de leitura, com navegação por abas e telas single-page por funcionalidade. |
| Descrição do Hardware | Smartphone com conexão à internet (Wi-Fi ou dados móveis) para busca de livros e sincronização; funcionamento básico offline para consulta da estante já carregada localmente. |
| Capacidades da Plataforma | Armazenamento de dados na nuvem (sincronização entre dispositivos); integração com a API do Kindle/Amazon para importar progresso de leitura automaticamente; cadastro e login por e-mail e senha ou conta Google; notificações push opcionais (lembrete diário de leitura); funcionalidades sociais **desligadas por padrão**, ativáveis na aba Perfil (no protótipo testável, existe apenas o interruptor, sem telas sociais); recursos de acessibilidade descritos na seção 4. |
| Restrições da Plataforma | Depende de conexão à internet para buscar novos livros e sincronizar; a integração com o Kindle depende da disponibilidade e estabilidade da API da Amazon, fora do controle da equipe; não haverá leitor de código de barras na primeira versão (funcionalidade futura). |

## 2) Princípios Gerais do Projeto

| Nome | Descrição | Link |
| :---- | :---- | :---- |
| Descrição do Contexto | Produto voltado a leitores que buscam registrar e acompanhar sua leitura com baixa fricção de cadastro — necessidade identificada como a mais recorrente na pesquisa (ver [`3_perfil_usuario.md`](3_perfil_usuario.md)). | — |
| Lei Geral de Proteção de Dados (LGPD) — Lei n.º 13.709/2018 | Regula o tratamento de dados pessoais no Brasil. É especialmente relevante aqui porque a plataforma armazena hábitos de leitura e, ao integrar com o Kindle, credenciais de acesso a uma conta de terceiros — exigindo consentimento explícito, minimização de dados e possibilidade de exclusão de conta. | https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm |
| Lei n.º 10.098/2000 — Lei da Acessibilidade | Estabelece diretrizes para tornar produtos e serviços acessíveis a pessoas com deficiência ou mobilidade reduzida. Orienta decisões como contraste adequado, suporte a leitor de tela e tamanho de fonte ajustável na interface. | https://www.planalto.gov.br/ccivil_03/leis/l10098.htm |
| Lei Brasileira de Inclusão — Lei n.º 13.146/2015 | Estatuto da Pessoa com Deficiência. O art. 63 trata da acessibilidade em sítios da internet; o aplicativo não é um site, mas a lei é usada como referência de que acessibilidade digital é um direito, não um opcional. | https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm |
| WCAG 2.1 (W3C), nível AA | Diretrizes técnicas internacionais de acessibilidade de conteúdo digital, organizadas em quatro princípios: perceptível, operável, compreensível e robusto. Adotadas aqui como critério mensurável (por exemplo, contraste mínimo de 4,5:1), pois a lei cita acessibilidade sem detalhar números. | https://www.w3.org/TR/WCAG21/ |
| ABNT NBR ISO 9241 — Ergonomia da interação humano-sistema | Fornece diretrizes de design centrado no usuário (parte 210) e de usabilidade (parte 11), usadas como base para as metas de usabilidade quantitativas definidas abaixo. | https://www.inf.ufsc.br/~edla.ramos/ine5624/_Walter/Normas/Parte%2011/iso9241-11F2.pdf |

## 3) Metas de Usabilidade

### 3.1 Qualitativo

- **Facilidade de aprendizado**: um novo usuário deve conseguir registrar seu primeiro livro sem precisar de tutorial ou ajuda externa.
- **Eficiência**: usuários recorrentes devem conseguir registrar um livro em poucos toques, sem que nenhuma etapa opcional (nota, resenha, categoria) seja obrigatória para concluir o registro.
- **Satisfação**: o usuário deve sentir que tem controle e visão clara do próprio progresso de leitura, reduzindo a sensação relatada na pesquisa de "não saber quantos livros já li" ou "não saber se estou cumprindo a meta".
- **Acessibilidade**: todas as tarefas principais devem poder ser concluídas por pessoas com baixa visão, uso de leitor de tela ou dificuldade motora, sem depender apenas de cor, de gestos complexos ou de alvos de toque pequenos.

### 3.2 Quantitativo

> A tabela abaixo distribui prioridade relativa entre as metas de usabilidade do produto (pesos que somam 100%), com base na frequência e intensidade das dores identificadas na pesquisa — não são taxas de sucesso isoladas, mas o peso que cada meta deve ter nas decisões de design e nos testes de usabilidade futuros.

| Metas | Porcentagem | Justificativa |
| :---- | :---- | :---- |
| Facilidade e confiabilidade do registro básico (buscar + marcar como lido, sem abandono) | 30% | Dor mais citada na pesquisa: 5 de 5 entrevistadas sem uma solução satisfatória hoje; 8 de 10 no questionário sem app ativo (nunca usaram ou já abandonaram). Maior peso de prioridade do produto. |
| Precisão e clareza no acompanhamento de metas de leitura | 20% | Dor central do Segmento B (persona Camila) e presente em graus variados nos demais segmentos; 4 de 10 no questionário não conseguem medir se estão cumprindo a meta. Embora "definir metas" tenha ficado em posição baixa na priorização de funcionalidades do questionário, a dificuldade de *acompanhar* a meta foi relatada por 5 de 5 entrevistadas — o peso reflete a dor, não o ranking (ver `3_perfil_usuario.md`). |
| Espaço para registrar opinião pessoal (nota/resenha) | 15% | Desejado por 3 de 5 entrevistadas e prioridade média no questionário ("fazer anotações": 7 de 10) — importante, mas não a dor mais urgente. |
| Acessibilidade (requisitos da seção 4) | 15% | **Não vem da pesquisa com usuários** — nenhum instrumento perguntou sobre acessibilidade (limitação declarada). O peso decorre de obrigação legal (Leis 10.098/2000 e 13.146/2015), do contexto de uso relatado (leitura à noite, em trânsito, com atenção dividida, que se beneficia de bom contraste e alvos de toque grandes) e do fato de que leitores com baixa visão estão no público natural de um app de leitura. |
| Estabilidade da integração com o Kindle | 10% | Dor específica do Segmento C (persona Letícia) — relevante, mas atinge uma parcela menor da amostra. |
| Funcionalidades sociais (seguir amigos, compartilhar leituras) | 10% | Baixo interesse identificado tanto no questionário (itens sociais nas últimas posições) quanto na classificação de cartões (1 de 4 participantes rejeitou explicitamente) — peso baixo, mas não nulo. |
| **Total** | **100%** | Distribuição de prioridade entre as metas de usabilidade, calibrada pelos achados consolidados em `3_perfil_usuario.md`. |

## 4) Requisitos de Acessibilidade

Critério adotado: WCAG 2.1 nível AA, como referência técnica das leis citadas na seção 2.

| Área | Requisito | Onde se aplica no produto |
| :---- | :---- | :---- |
| Visão | Contraste mínimo de 4,5:1 para texto e 3:1 para ícones e bordas; texto redimensionável até 200% sem perda de conteúdo; informação nunca transmitida **somente por cor**; modo escuro (desejável já na primeira versão). | Status "Lido / Lendo / Quero ler" (precisa de texto, não só destaque); botão selecionado; leitura à noite. |
| Leitor de tela (TalkBack / VoiceOver) | Todo elemento sem texto visível tem rótulo acessível; ordem de leitura lógica; estados anunciados. | Botão "+" (Adicionar livro), estrelas ("4 de 5 estrelas"), capas de livros, abas de navegação. |
| Gráficos e dados | Alternativa em texto para todo gráfico. | Gráfico "Livros lidos por mês" (a tela já traz um resumo em texto); barra de meta com "16/20" em texto. |
| Toque e motricidade | Alvos de toque de no mínimo 44×44 pt (iOS) / 48×48 dp (Android), com espaçamento; todas as ações possíveis com uma mão e sem gestos complexos. | Botões Quero ler / Lendo / Lido; estrelas de avaliação; botões Pular / Salvar lado a lado. |
| Cognitivo | Linguagem simples; navegação consistente; campos opcionais claramente indicados; possibilidade de desfazer um registro feito por engano. | Campos tracejados "opcional"; "Agora não" / "Pular"; desfazer após marcar como lido. |
| Erros e estados | Mensagens de erro em texto claro, com a solução; botão desabilitado com explicação; não depender de cor ou som para sinalizar erro. | Erro de sincronização do Kindle; "Sincronizar agora" desabilitado. |
| Inclusão na leitura | Metas por **tempo** (além de livros e páginas), pois leitores de audiobook ou com baixa visão nem sempre medem em páginas; formato audiobook reconhecido no registro. | Tela Definir Meta (Tipo: Livros / Páginas / Tempo). |

**Como será verificado**: contraste e tamanho de toque conferidos no protótipo de alta fidelidade; teste com leitor de tela ativado em ao menos uma tarefa; e inclusão da acessibilidade na inspeção heurística (`12_heuristica.md`) e no teste de usabilidade (`13_teste_usabilidade.md`).

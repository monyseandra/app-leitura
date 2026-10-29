# Requisitos de UX e Metas de Usabilidade

## 1) Características da Plataforma

| Característica | Descrição |
| :---- | :---- |
| Descrição do Software | Aplicativo mobile (iOS/Android) para registro, acompanhamento e recomendação de leitura, com navegação por abas e telas single-page por funcionalidade. |
| Descrição do Hardware | Smartphone com conexão à internet (Wi-Fi ou dados móveis) para busca de livros e sincronização; funcionamento básico offline para consulta da estante já carregada localmente. |
| Capacidades da Plataforma | Armazenamento de dados na nuvem (sincronização entre dispositivos); integração com a API do Kindle/Amazon para importar progresso de leitura automaticamente; notificações push opcionais para lembretes de meta. |
| Restrições da Plataforma | Depende de conexão à internet para buscar novos livros e sincronizar; a integração com o Kindle depende da disponibilidade e estabilidade da API da Amazon, fora do controle da equipe; não haverá leitor de código de barras na primeira versão (funcionalidade futura). |

## 2) Princípios Gerais do Projeto

| Nome | Descrição | Link |
| :---- | :---- | :---- |
| Descrição do Contexto | Produto voltado a leitores que buscam registrar e acompanhar sua leitura com baixa fricção de cadastro — necessidade identificada como a mais recorrente na pesquisa (ver [`3_perfil_usuario.md`](3_perfil_usuario.md)). | — |
| Lei Geral de Proteção de Dados (LGPD) — Lei n.º 13.709/2018 | Regula o tratamento de dados pessoais no Brasil. É especialmente relevante aqui porque a plataforma armazena hábitos de leitura e, ao integrar com o Kindle, credenciais de acesso a uma conta de terceiros — exigindo consentimento explícito, minimização de dados e possibilidade de exclusão de conta. | https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm |
| Lei n.º 10.098/2000 — Lei da Acessibilidade | Estabelece diretrizes para tornar produtos e serviços acessíveis a pessoas com deficiência ou mobilidade reduzida. Orienta decisões como contraste adequado, suporte a leitor de tela e tamanho de fonte ajustável na interface. | https://www.planalto.gov.br/ccivil_03/leis/l10098.htm |
| ABNT NBR ISO 9241 — Ergonomia da interação humano-sistema | Fornece diretrizes de design centrado no usuário (parte 210) e de usabilidade (parte 11), usadas como base para as metas de usabilidade quantitativas definidas abaixo. | https://www.inf.ufsc.br/~edla.ramos/ine5624/_Walter/Normas/Parte%2011/iso9241-11F2.pdf |

## 3) Metas de Usabilidade

### 3.1 Qualitativo

- **Facilidade de aprendizado**: um novo usuário deve conseguir registrar seu primeiro livro sem precisar de tutorial ou ajuda externa.
- **Eficiência**: usuários recorrentes devem conseguir registrar um livro em poucos toques, sem que nenhuma etapa opcional (nota, resenha, categoria) seja obrigatória para concluir o registro.
- **Satisfação**: o usuário deve sentir que tem controle e visão clara do próprio progresso de leitura, reduzindo a sensação relatada na pesquisa de "não saber quantos livros já li" ou "não saber se estou cumprindo a meta".

### 3.2 Quantitativo

> A tabela abaixo distribui prioridade relativa entre as metas de usabilidade do produto (pesos que somam 100%), com base na frequência e intensidade das dores identificadas na pesquisa — não são taxas de sucesso isoladas, mas o peso que cada meta deve ter nas decisões de design e nos testes de usabilidade futuros.

| Metas | Porcentagem | Justificativa |
| :---- | :---- | :---- |
| Facilidade e confiabilidade do registro básico (buscar + marcar como lido, sem abandono) | 35% | Dor mais citada na pesquisa: 5 de 5 entrevistadas sem uma solução satisfatória hoje; 8 de 10 no questionário sem app ativo (nunca usaram ou já abandonaram). Maior peso de prioridade do produto. |
| Precisão e clareza no acompanhamento de metas de leitura | 25% | Dor central do Segmento B (persona Camila) e presente em graus variados nos demais segmentos; 4 de 10 no questionário não conseguem medir se estão cumprindo a meta. |
| Espaço para registrar opinião pessoal (nota/resenha) | 15% | Desejado por 3 de 5 entrevistadas e prioridade média no questionário ("fazer anotações": 7 de 10) — importante, mas não a dor mais urgente. |
| Estabilidade da integração com o Kindle | 15% | Dor específica do Segmento C (persona Letícia) — relevante, mas atinge uma parcela menor da amostra. |
| Funcionalidades sociais (seguir amigos, compartilhar leituras) | 10% | Baixo interesse identificado tanto no questionário (itens sociais nas últimas posições) quanto na classificação de cartões (1 de 4 participantes rejeitou explicitamente) — peso baixo, mas não nulo. |
| **Total** | **100%** | Distribuição de prioridade entre as metas de usabilidade, calibrada pelos achados consolidados em `3_perfil_usuario.md`. |

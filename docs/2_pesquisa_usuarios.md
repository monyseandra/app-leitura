# Pesquisa e Coleta de Dados com Usuários

## 1) Identificação de Necessidades dos Usuários e Requisitos de UX

**Que dados coletar?**
- Hábitos de leitura atuais: frequência, formato preferido (físico, e-book, audiobook), dispositivo usado.
- Como o usuário decide o próximo livro e como descobre novas leituras.
- Como o usuário registra (ou não) hoje os livros que já leu — planilha, caderno, app, rede social, memória, nada.
- Experiências anteriores com apps de leitura concorrentes: uso atual, abandono e o motivo concreto do abandono.
- Comportamento em relação a metas de leitura: se estabelece, com qual métrica (livros, páginas, tempo) e se consegue acompanhar o cumprimento.
- O que gera confiança (ou desconfiança) em uma recomendação de livro.
- Interesse — ou desinteresse — por funcionalidades sociais dentro da plataforma (seguir amigos, compartilhar leituras).
- Maior dificuldade percebida hoje para organizar a própria leitura.
- Como o usuário organiza mentalmente as funcionalidades de um app de leitura (o que agruparia junto, para orientar a Arquitetura de Informação da próxima etapa).

**De quem coletar?**
- Leitores a partir de 18 anos, com hábito de leitura recorrente (pelo menos ocasional), sem restrição de gênero literário preferido.
- Buscamos diversidade dentro desse critério: pessoas que leem por lazer, que leem por hábito consolidado ou de forma mais esporádica, e que já tiveram (ou nunca tiveram) contato com algum app de leitura.
- Recrutamento: rede de contatos pessoal do grupo e indicação em cadeia (um participante indica outro).
- Amostra alcançada: **10 respostas no questionário**, **5 entrevistas semiestruturadas** e **4 respostas válidas de classificação de cartões**.

## 2) Aspectos Éticos

Sim, o projeto considera aspectos éticos, pois envolve a coleta de dados pessoais sensíveis ao contexto (hábitos de leitura e comportamento de uso de aplicativos), ainda que não envolva dados como saúde, dados financeiros, ou informações de identificação direta. Pelos conceitos vistos em aula, toda pesquisa com pessoas exige consentimento informado e minimização de dados — coletar apenas o necessário para responder às perguntas de pesquisa, e não mais que isso.

- **Consentimento**: para o questionário, o consentimento não foi embutido dentro do Google Forms — em vez disso, cada pessoa recebeu uma mensagem de permissão pelo WhatsApp junto com o link, explicando o objetivo acadêmico da pesquisa e informando que as respostas seriam anônimas, antes de decidir se responderia. Na entrevista e na classificação de cartões, o mesmo tipo de mensagem foi enviado antes de qualquer coleta, explicando o objetivo do projeto, que a participação é voluntária, que a pessoa pode desistir a qualquer momento sem prejuízo, e pedindo uma confirmação explícita ("sim, aceito") antes de começar.
- **Armazenamento, anonimização e descarte (LGPD — Lei n.º 13.709/2018)**:
  - O questionário não coleta nome nem e-mail — é anônimo por padrão.
  - Nas entrevistas e na classificação de cartões, os participantes são identificados apenas por código (E1, E2, E3...) em todos os documentos de análise; o nome real, quando usado durante a aplicação para organização interna, não é armazenado em nenhum arquivo do projeto.
  - As respostas dadas em áudio são transcritas para texto e o áudio original é descartado logo em seguida — apenas o conteúdo textual permanece registrado.
  - Nenhum dado de pesquisa (bruto ou identificável) é publicado no repositório do GitHub, que é público; apenas as sínteses já anonimizadas.

## 3) Ferramentas de Coleta de Dados

> Optamos por três técnicas complementares — uma quantitativa, uma qualitativa individual por conversa guiada, e uma de elicitação de modelo mental por tarefa de organização — evitando repetir o mesmo mecanismo de coleta sob formatos diferentes.

| Instrumento | Objetivo | Como aplicar | Link/Roteiro |
| :---- | :---- | :---- | :---- |
| **Questionário (Google Forms)** | Quantificar hábitos de leitura, uso/abandono de apps concorrentes, confiança em recomendações e prioridade de funcionalidades, numa amostra maior. | Divulgado por WhatsApp para a rede de contatos do grupo, aberto por cerca de 1 semana. Resposta anônima (sem nome/e-mail), tempo estimado de 5 minutos. | [Formulário aplicado](https://docs.google.com/forms/d/e/1FAIpQLSdzt63NKA133rQwYxE1tmDCjhHYTdVd48OGz8V12D-pDTLSTw/viewform) — roteiro completo em `instrumentos/questionario.md` |
| **Entrevista semiestruturada (áudio, WhatsApp)** | Aprofundar como os leitores decidem o que ler, como organizam (ou tentam organizar) sua leitura hoje, e por que abandonam ferramentas já testadas — informações que o questionário sozinho não captura. | Conduzida em tempo real: uma pergunta por vez, em áudio, aguardando a resposta antes de enviar a próxima, mantendo a conversa natural e permitindo repergunta. Duração aproximada de 10-15 min por participante. | Roteiro: 1) Como é sua relação com a leitura hoje? 2) Como você decide o próximo livro? 3) Como você acompanha os livros que já leu? 4) Já usou algum app para isso — o que fez continuar ou parar? 5) Você estabelece metas de leitura? 6) O que faz você confiar numa recomendação? 7) Qual sua maior dificuldade para organizar a leitura? 8) O que mudaria em como acompanha os livros lidos? — roteiro completo em `instrumentos/roteiro_entrevista.md` |
| **Classificação de cartões (open card sort)** | Entender como os usuários organizam mentalmente as funcionalidades da plataforma — o que colocariam "na mesma gaveta" — informando diretamente a Arquitetura de Informação (menus e telas) na próxima etapa. | Enviada uma lista numerada de 13 funcionalidades por WhatsApp; o participante agrupa os itens como fizer sentido para ele, nomeando cada grupo, seguido da pergunta "por que você separou assim?". Aplicado por texto ou áudio, 5-10 minutos. | Lista de cartões: Registrar livros lidos; Registrar livros que estou lendo; Criar lista de livros que quero ler; Acompanhar progresso; Definir metas; Visualizar estatísticas; Receber recomendações; Avaliar livros; Escrever resenhas; Fazer anotações; Organizar por categorias/gêneros; Acompanhar amigos; Compartilhar leituras — roteiro completo em `instrumentos/classificacao_cartoes.md` |

Os resultados obtidos com esses três instrumentos estão consolidados em `respostas_entrevistas.md` e `resultados_classificacao_cartoes.md`, e servem de base direta para o `3_perfil_usuario.md`.

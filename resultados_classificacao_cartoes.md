# Resultados da Classificação de Cartões (Card Sorting)

> Os participantes são identificados apenas por código, consistente com `respostas_entrevistas.md`. A pesquisa é 100% anônima, nenhum nome foi armazenado em qualquer documento do projeto.

## Respostas válidas (agrupamento por afinidade)

### E1 
- **Estante 1**: Registrar livros lidos; Definir metas de leitura; Registrar livros que estou lendo.
- **Estante 2**: Compartilhar minhas leituras; Receber recomendações personalizadas; Acompanhar o que meus amigos estão lendo.
- **Estante 3**: Avaliar livros (dar nota); Escrever resenhas; Fazer anotações sobre um livro.
- **Estante 4**: Criar lista de livros que quero ler; Organizar livros por categorias/gêneros.
- **Estante 5**: Acompanhar o progresso de leitura; Visualizar estatísticas sobre minhas leituras.

### E2 
- **Grupo 1**: Registrar livros lidos; Registrar livros que estou lendo; Acompanhar o progresso de leitura; Visualizar estatísticas sobre minhas leituras.
- **Grupo 2**: Criar lista de livros que quero ler; Definir metas de leitura; Receber recomendações personalizadas.
- **Grupo 3**: Avaliar livros; Escrever resenhas.
- **Grupo 4**: Fazer anotações sobre um livro; Organizar livros por categorias/gêneros.
- **Grupo 5**: Acompanhar o que meus amigos estão lendo; Compartilhar minhas leituras.

### E4 
- **Estante 1**: Registrar livros lidos; Registrar livros que estou lendo.
- **Estante 2**: Acompanhar o progresso de leitura; Visualizar estatísticas sobre minhas leituras; Definir metas de leitura.
- **Estante 3**: Avaliar livros (dar nota); Escrever resenhas; Fazer anotações sobre um livro.
- **Estante 4**: Organizar livros por categorias/gêneros; Criar lista de livros que quero ler.
- **Estante 5**: Acompanhar o que meus amigos estão lendo; Compartilhar minhas leituras.
- **Estante 6**: Receber recomendações personalizadas.

### E5 
- **Grupo 1 — Minha Estante**: Registrar livros lidos; Registrar livros que estou lendo; Criar lista de livros que quero ler; Organizar livros por categorias/gêneros.
- **Grupo 2 — Meu Progresso**: Acompanhar o progresso de leitura; Definir metas de leitura; Visualizar estatísticas sobre minhas leituras.
- **Grupo 3 — Minha Opinião**: Avaliar livros (dar nota); Escrever resenhas; Fazer anotações sobre um livro.
- **Grupo 4 — Descobrir Livros**: Receber recomendações personalizadas.
- **Grupo 5 — Social**: (vazio — participante declarou que não usaria nenhuma funcionalidade social).

## Síntese — força de cada agrupamento (base: E1, E2, E4-corrigida, E5)

| Cluster | Participantes que confirmam | Força do padrão |
| :---- | :---- | :---- |
| Registrar lido + Registrar lendo | E1, E2, E4, E5 | **4 de 4 — muito forte** |
| **Progresso + Estatísticas** | E1, E2, E4, E5 | **4 de 4 — muito forte** (novidade da correção: essa dupla anda sempre junta, independente de com quem mais se junta) |
| Avaliar + Resenha + Anotações | E1, E4, E5 (E2 separa anotações) | **3 de 4 — forte** |
| Amigos + Compartilhar (grupo social) | E1, E2, E4, E5 (E5 rejeita o conteúdo do grupo, mas mantém os dois itens juntos) | **4 de 4 — muito forte**, com 1 participante rejeitando a funcionalidade em si |
| Progresso/Estatísticas + Metas (o trio completo) | E4, E5 (E1 e E2 mantêm metas separada do progresso) | **2 de 4 — moderado** — metas é o elemento "solto" desse cluster, não o par progresso+estatísticas em si |
| Progresso/Estatísticas + Registro básico (lido/lendo) | Só E2 | **1 de 4 — divergência isolada** — as outras 3 tratam isso como uma seção à parte (um "dashboard"), não junto do registro |
| Quero ler + Categorias/gêneros | E1, E5 (E2 separa; E4 separa) | **2 de 4 — moderado** |
| Recomendações | Sem grupo fixo: E1 (social), E2 (planejamento/metas), E4 (sozinha), E5 (sozinha, "Descobrir Livros") | **Sem consenso** |

## Implicações para a Arquitetura de Informação (próxima etapa)

1. **"Estante" (registro básico: lido + lendo) é um núcleo muito sólido** — deve ser uma seção/aba própria e óbvia no menu principal.
2. **"Progresso + Estatísticas" é, na verdade, o cluster mais unânime de todos (4 de 4)** — mais forte inclusive que o social. Isso indica que uma tela/seção de "Meu Progresso" (combinando as duas) é praticamente consenso entre os participantes, independentemente de "metas" entrar ou não nela.
3. **"Minha Opinião" (avaliar + resenha + anotação) é o segundo núcleo mais forte** — considerar agrupar essas três ações no mesmo fluxo/tela, ativado a partir do registro de um livro.
4. **O grupo social é consistente em composição, mas não em aceitação**, pelo menos 1 participante (E5) rejeitou explicitamente essa funcionalidade. Recomenda-se manter os recursos sociais como uma seção **opcional/desativável**, não como parte central da navegação. Isso cruza com a pergunta do questionário sobre interesse em funcionalidades sociais — vale conferir os resultados do Forms para confirmar essa tendência com mais gente.
5. **Recomendações não têm "casa" fixa** — em vez de um único menu, considerar expor recomendações em mais de um ponto da interface (ex.: dentro do fluxo de "quero ler", dentro do dashboard de progresso, e como seção própria), já que participantes diferentes esperam encontrá-la em lugares diferentes.
6. **Metas é o elemento mais "solto" entre os quatro**: ora fica com o dashboard de progresso (E4, E5), ora fica com o planejamento futuro/quero-ler (E1, E2). Considerar dar acesso a metas a partir dos dois contextos, em vez de escolher um só.


# Requisitos de UX e Metas de Usabilidade

## 1) Características da Plataforma

| Característica | Descrição |
| :---- | :---- |
| Descrição do Software | Plataforma web responsiva denominada Minha Estante, voltada à leitura, organização e avaliação de livros. O sistema permite que os usuários pesquisem livros, organizem suas leituras em uma estante virtual, acompanhem seu progresso, atribuam notas e publiquem resenhas e opiniões sobre as obras. A navegação é organizada por seções, como Estante, Progresso, Buscar e Perfil, proporcionando uma experiência integrada em uma única plataforma. |
| Descrição do Hardware | Computadores, notebooks, tablets e smartphones com acesso à internet, utilizando navegadores modernos, como Google Chrome e Microsoft Edge. A interface deve se adaptar aos diferentes tamanhos de tela, permitindo a utilização tanto em dispositivos móveis quanto em desktops. |
| Capacidades da Plataforma | Interface responsiva; pesquisa e descoberta de livros; organização de obras em uma estante virtual; classificação de livros por status de leitura; registro de avaliações e resenhas; acompanhamento do progresso de leitura; gerenciamento de perfil do usuário; possibilidade de importar livros para a biblioteca pessoal. O protótipo atual utiliza HTML, CSS e JavaScript, com armazenamento local dos dados. A integração com banco de dados e serviços externos está prevista para etapas futuras do desenvolvimento. |
| Restrições da Plataforma | A pesquisa de novos livros e o acesso a recursos externos dependem de conexão com a internet. No protótipo atual, os dados são armazenados localmente, não havendo sincronização automática entre diferentes dispositivos. A persistência das informações depende do armazenamento disponível no navegador. A importação de livros e a integração com serviços externos dependem da implementação de funcionalidades específicas e da disponibilidade de APIs compatíveis. |

## 2) Princípios Gerais do Projeto

| Nome | Descrição | Link |
| :---- | :---- | :---- |
| Descrição do Contexto | O Minha Estante é uma plataforma voltada a leitores que desejam centralizar sua experiência literária em um único ambiente digital. O sistema busca facilitar a organização de livros, o acompanhamento das leituras e o compartilhamento de opiniões por meio de avaliações e resenhas. A proposta é proporcionar uma experiência intuitiva, agradável e personalizada, incentivando o hábito da leitura e permitindo que cada usuário construa seu próprio espaço literário. | — |
| Lei Geral de Proteção de Dados (LGPD) — Lei n.º 13.709/2018 | Estabelece regras para a coleta, o armazenamento e o tratamento de dados pessoais. É relevante para o Minha Estante, pois a plataforma poderá armazenar informações de cadastro, dados de perfil, histórico de leitura, avaliações e resenhas dos usuários. O sistema deve garantir transparência no tratamento das informações, consentimento quando necessário, segurança dos dados e possibilidade de exclusão da conta e das informações pessoais. | https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm |
| Lei n.º 10.098/2000 — Lei da Acessibilidade | Estabelece normas gerais e critérios básicos para a promoção da acessibilidade. Orienta o desenvolvimento de uma interface que possa ser utilizada por pessoas com diferentes necessidades, considerando aspectos como contraste adequado, legibilidade dos textos, navegação por teclado, identificação dos elementos da interface e compatibilidade com tecnologias assistivas. | https://www.planalto.gov.br/ccivil_03/leis/l10098.htm |
| ABNT NBR ISO 9241 — Ergonomia da interação humano-sistema | Fornece diretrizes para o desenvolvimento de sistemas centrados no usuário, considerando aspectos de ergonomia, usabilidade e qualidade da interação. No Minha Estante, essas diretrizes orientam a criação de uma interface intuitiva, eficiente e satisfatória, facilitando a pesquisa de livros, a organização da estante e o registro de avaliações e resenhas. | https://www.inf.ufsc.br/~edla.ramos/ine5624/_Walter/Normas/Parte%2011/iso9241-11F2.pdf |

## 3) Metas de Usabilidade

### 3.1 Qualitativo

- **Facilidade de aprendizado**: um novo usuário deve conseguir compreender a organização da plataforma, localizar livros e adicionar uma obra à sua estante sem precisar de tutorial ou ajuda externa.

- **Eficiência**: usuários recorrentes devem conseguir pesquisar livros, atualizar o status de leitura e registrar avaliações ou resenhas de maneira rápida e intuitiva, evitando etapas desnecessárias e formulários excessivamente complexos.

- **Satisfação**: o usuário deve encontrar um ambiente agradável, organizado e personalizado, que proporcione uma experiência positiva durante a organização de sua biblioteca pessoal e o compartilhamento de suas opiniões literárias.

- **Consistência**: os elementos visuais, botões, menus, ícones e padrões de navegação devem manter uma identidade uniforme em todas as seções da plataforma, facilitando a compreensão e a utilização do sistema.

- **Acessibilidade**: a interface deve oferecer boa legibilidade, contraste adequado, navegação intuitiva e adaptação a diferentes dispositivos, buscando atender usuários com diferentes necessidades e condições de utilização.

### 3.2 Quantitativo

> A tabela abaixo apresenta a distribuição de prioridade relativa entre as metas de usabilidade do Minha Estante. Os pesos totalizam 100% e representam a importância atribuída a cada aspecto durante o desenvolvimento do projeto. Essa distribuição constitui uma proposta inicial de prioridades, que poderá ser validada e ajustada por meio de testes de usabilidade com usuários.

| Metas | Porcentagem | Justificativa |
| :---- | :---- | :---- |
| Facilidade e eficiência na pesquisa e organização de livros | 30% | A pesquisa e a organização das obras representam funcionalidades centrais da plataforma. O usuário deve conseguir localizar livros e adicioná-los à sua estante sem dificuldades ou etapas desnecessárias. |
| Facilidade e eficiência no registro de avaliações e resenhas | 25% | O registro de opiniões pessoais é uma das principais propostas do Minha Estante. O sistema deve permitir que o usuário atribua notas e escreva resenhas de maneira simples, organizada e intuitiva. |
| Clareza no acompanhamento do progresso de leitura | 20% | O acompanhamento permite que o usuário visualize sua atividade literária, consulte seus livros e acompanhe sua evolução ao longo do tempo. |
| Acessibilidade e responsividade da interface | 15% | A plataforma deve oferecer uma experiência consistente em computadores, tablets e smartphones, considerando diferentes necessidades de acesso e utilização. |
| Satisfação e personalização da experiência do usuário | 10% | A organização visual, a identidade da plataforma e a possibilidade de personalização contribuem para tornar o ambiente mais agradável e incentivar o uso contínuo do sistema. |
| **Total** | **100%** | Distribuição de prioridade entre as metas de usabilidade do Minha Estante, considerando as principais funcionalidades e os objetivos do projeto. |

# Status do Projeto — Balneário Sumaúma (APP-BARAL)

Registro do que já foi feito no app até agora, para consulta futura (inclusive fora do Claude Code, ex: Antigravity).

## O que é o projeto

App single-file (`index.html`) de gestão operacional e financeira para o Balneário Sumaúma:
- Dashboard com indicadores financeiros (faturamento, saídas, saldo, lucro)
- PDV / Vendas por mesa-comanda, com cardápio real cadastrado
- Controle de Estoque (compras e perdas com custo médio ponderado)
- Financeiro (contas a pagar + extrato de caixa)
- Backup/restauração via JSON e exportação de relatórios CSV
- Instalável como app (PWA) no celular/tablet

**Stack:** HTML + Tailwind (CDN) + Chart.js (CDN) + FontAwesome (CDN) + JavaScript puro. Dados salvos no `localStorage` do navegador (sem backend/sincronização entre dispositivos).

## Repositório GitHub

`https://github.com/willyancarlosviana-debug/APP-BARAL`

3 branches, sempre mantidas sincronizadas com o mesmo conteúdo de `index.html`/`manifest.json`/`sw.js`/`icons/`:
- **`gh-pages`** — branch que publica o site (GitHub Pages)
- **`main`** — branch padrão do repositório (mantém também o `README.md`)
- **`master`** — branch legada, mantida em fast-forward junto com as outras

**Site publicado (ao vivo):** https://willyancarlosviana-debug.github.io/APP-BARAL/

## Linha do tempo do que foi feito

1. **Remoção da tela de login/autenticação Supabase**, que tinha credenciais placeholder não configuradas e travava o acesso ao app.

2. **Correção de um bug crítico**: um commit anterior (fora desta sessão) tinha apagado as tags de fechamento `</script></body></html>` do arquivo, quebrando toda a execução do JavaScript — nenhum botão respondia. Corrigido.

3. **Organização das branches**: `main`, `master` e `gh-pages` estavam divergentes (a `main` tinha até um sistema de login próprio, com outro projeto Supabase). Sincronizadas para conter a mesma versão.

4. **Inserção do cardápio real** (petiscos, caldos, porções, sucos, bebidas) no lugar dos produtos fictícios de demonstração — 71 itens fiéis aos valores do cardápio oficial:
   - Itens com tamanho (Pequena/Média) viraram produtos separados.
   - Bebidas com preço de "Caixinha" (Skol, Brahma, Império, Original) viraram produto separado.
   - Preço de custo ficou em R$ 0,00 (não vinha no cardápio) — a cadastrar depois.
   - Categoria "Insumos Gerais" foi removida (não usada).

5. **Ajustes de UX no PDV (Vendas)**:
   - Itens com tamanho (Pequena/Média) agora aparecem agrupados em um único card, com botões de tamanho que trocam o preço exibido.
   - Lista de produtos do PDV mudou de grade para lista (um item por linha).
   - Botões "Abrir Atendimento" e "+" (adicionar ao carrinho) ficaram vermelhos.
   - Removido o bloqueio/aviso de estoque ("Esgotado") no PDV e o alerta de estoque crítico no Dashboard — **por enquanto não há controle de estoque mínimo/atual habilitado**, o estoque será cadastrado aos poucos depois.
   - Aba "Dashboard" foi reposicionada na navegação, ficando ao lado de "Configurações" (antes era a primeira aba).

6. **App agora inicia zerado**: sem mesas abertas, vendas, despesas ou transações de exemplo — só o cardápio de produtos.

7. **Edição de estoque liberada a qualquer momento**: a tela "Editar Produto" agora mostra e permite alterar o Estoque Atual e o Estoque Mínimo diretamente (antes só dava pra mudar estoque via "Compras/Entrada").

8. **Suporte a PWA (instalação como app)**:
   - Criado `manifest.json` com nome, cores e ícone da logo do Balneário.
   - Ícones gerados a partir de `Logo definida.jpeg` em `icons/` (192px, 512px, apple-touch-icon).
   - Criado `sw.js` (Service Worker) simples, com estratégia network-first (sempre busca a versão mais nova; usa cache só se estiver offline).
   - Adicionadas tags anti-cache no `<head>` do `index.html` para reduzir problema de navegador mostrar versão antiga após atualização.
   - Sem trava de orientação — funciona em retrato e paisagem (importante para uso em tablet).
   - Testado: Service Worker registra e ativa corretamente no site publicado (HTTPS).

## Estado atual

- ✅ (Versão publicada no site) App funciona sem tela de login, abre direto no Dashboard/menu. **A versão local de 01/11/2026 já tem login provisório e visual novo — ver seção abaixo; ainda não foi commitada nem publicada.**
- ✅ Cardápio real cadastrado (71 itens, fiel aos valores oficiais).
- ✅ PDV testado ponta a ponta: adicionar item, ajustar quantidade, remover — funcionando.
- ✅ App inicia limpo, sem dados fictícios de vendas/despesas.
- ✅ Instalável como app (PWA) no celular e tablet, com ícone da logo.
- ✅ Publicado e sincronizado nas 3 branches, testado no site ao vivo.
- ⚠️ **Estoque ainda não está sendo controlado** (todos os produtos sem quantidade cadastrada, sem bloqueio de venda por estoque). É preciso lançar o estoque real aos poucos pela tela Editar Produto ou por "Compras/Entrada".
- ⚠️ Preço de custo de todos os produtos está em R$ 0,00 — os relatórios de lucro/CMV não vão refletir a realidade até isso ser preenchido.
- ⚠️ Os dados são só locais (localStorage do navegador de quem acessa) — não há sincronização entre dispositivos/pessoas. Se isso for necessário no futuro, será preciso reintroduzir algum backend (Supabase configurado corretamente, Firebase, etc.).
- ⚠️ Quem já tinha o app aberto/instalado antes de uma atualização pode precisar recarregar forçado (Ctrl+Shift+R) ou reinstalar o atalho pra pegar a versão nova.

## Sessão de 01/11/2026 — feito localmente (NÃO commitado / NÃO publicado)

Alterações apenas no `index.html` local; o site publicado continua na versão anterior.

1. **Visual novo (Fase 2 parcial):**
   - Menu lateral verde no computador/tablet; no celular, barra superior com logo + barra inferior com 5 ícones (PDV, Estoque, Financeiro, Dashboard, Ajustes). Botões usam `data-tab` e a classe `nav-active`.
   - Fonte Inter, cartões padronizados (classe `.card`), cards de indicadores do Dashboard redesenhados.
   - Avisos rápidos no Dashboard: contas vencendo em 7 dias e produtos sem preço de custo (`renderDashboardInsights`).
   - PDV: cardápio em grade de cartões (2 colunas no desktop), categorias em pílulas, botão "+" vermelho redondo, botões de tamanho maiores, carrinho fixo ao rolar (desktop) e cardápio antes do carrinho no celular.
2. **Login provisório com 3 perfis (`AuthSystem` no fim do `index.html`):**
   - Usuários: **Baral = Administrador**, **Willyan = Administrador**, **Rihanna = Vendas**.
   - Administrador vê todas as abas; Vendas vê só Vendas/PDV (`switchTab` bloqueia as outras).
   - **Não existem senhas prontas**: cada pessoa cria a sua no primeiro acesso, em cada aparelho (mín. 6 caracteres). Guardada só como hash SHA-256 no `localStorage` (`samauma_auth`); sessão em `samauma_session` ("Manter conectado" usa localStorage).
   - Testado: primeiro acesso, senhas diferentes, senha errada, sair, bloqueio de abas da Rihanna.
   - ⚠️ **É proteção provisória**, só no aparelho: quem mexe no código do navegador contorna; não há recuperação de senha (saída: limpar dados do site). Não colocar senhas no código (repositório público).
3. **Como ver localmente:** na pasta do projeto rodar `python -m http.server 8765 --bind 127.0.0.1` e abrir `http://127.0.0.1:8765/index.html`.

## Decisões tomadas com o usuário

- **Redefinição de senha — DECISÃO ATUAL (01/11/2026): sem recuperação automática.** O usuário desistiu de SMS/e-mail (SMS exigiria contratar serviço pago). Login e senha continuam; **quem esquece a senha pede ao Willyan (administrador), que redefine manualmente** (no Supabase: Authentication → Users). Só o Willyan tem e-mail; os demais não. (Decisão anterior de SMS + e-mail + admin foi abandonada; os celulares informados não serão usados por enquanto.)
- **Usuários e telas (decisão atual):** **Willyan = Administrador** (vê tudo, inclusive Configurações e usuários); **Baral = Gestor** (vê tudo, menos Configurações); **Mãe e Rihanna = Vendas e estoque** (só as telas Vendas/PDV e Estoque; estoque **somente para consulta**, sem botões de gestão nem preço de custo — confirmado pelo usuário). Implementado no `index.html` (`AuthSystem`) e no banco (papéis `admin`, `gestor`, `vendas`).
- **Visão de produto:** site público interativo do balneário (divulgação, cardápio ligado ao cadastro de produtos) + painel `/admin` (atrás de login) + app só de vendas, todos no mesmo banco (Supabase) em tempo real.
  - Fase 1: banco + login real + perfis (Supabase)
  - Fase 2: separar app de vendas e painel admin
  - Fase 3: site público (precisa de fotos, textos, WhatsApp)
  - Fase 4: ligações ao vivo (venda no app aparece no painel/site; controle do site pelo painel)
  - Perguntas em aberto: domínio próprio? cliente reserva/pede pelo site ou é só vitrine?
- **Visual:** gostou do menu lateral; quer algo mais tecnológico/chamativo, com **modo claro e escuro** (botão sol/lua, lembrado por aparelho) e **cards de indicadores em degradê** (verde faturamento, vermelho saídas, ciano saldo, âmbar lucro). **Paleta ainda não escolhida:** A neon floresta (escuro, verde elétrico), B azul noite (escuro, ciano/violeta), C claro vibrante.

## Supabase — o que já existe na conta do usuário (verificado em 01/11/2026)

- Conta logada no Chrome do usuário, com 2 organizações no plano gratuito: "Contas de casa" e "Organização de willyancarlosviana-debug" (3 projetos).
- Projetos da organização willyancarlosviana-debug: `app-mercado` (leste-americano), `ehouse-relatórios` (sa-leste-1) e **`samauma-db` (sa-leste-1) — está PAUSADO**.
- Página do `samauma-db` (id `dglftygowdzgqlmnvnpd`, ambiente "principal"): pausado; dados, backups e arquivos seguros; **pode ser retomado até 07/10/2027**; enquanto pausado não dá para ver tabelas. Há botão de retomar (aparece traduzido como "Projeto de currículo") e opção "Baixar backups". Conteúdo ainda não inspecionado. Plano gratuito costuma limitar projetos ativos — conferir se retomar exige pausar outro.
- **Backup do `samauma-db` baixado e inspecionado (01/11/2026):** não tem nada valioso — só dados de teste de 26/08/2026 (4 produtos: água, peixe frito, cerveja lata, Corona; 4 vendas de teste como "TESTE MESA10000"; despesas e transações vazias). Tabelas antigas `despesas`, `produtos`, `transacoes`, `vendas` com políticas "Acesso total" (qualquer um com a chave pública lê e escreve tudo) — **inseguro, não reaproveitar**. Arquivo: `Downloads\db_cluster-02-09-2026@12-14-32.backup.gz`.
- **Retomar o `samauma-db` não é possível agora:** o plano gratuito limita 2 projetos ativos (`app-mercado` e `ehouse-relatórios` já ocupam). Nada foi pausado.
- **Decisão (usuário):** criar um projeto novo na organização **"Contas de casa"** (plano gratuito, sem projetos), limpo e só do Balneário. Sugestão: nome `balneario-sumauma`, região América do Sul (São Paulo). O usuário cria o projeto (a senha do banco é dele) e depois passa Project URL + chave anon.
- **Decisão revisada (usuário):** o limite de 2 projetos gratuitos vale por pessoa (membro), não por organização; então usar "Contas de casa" provavelmente seria bloqueado. Vai ser criada uma **conta nova no Supabase, com e-mail novo (e senha, não GitHub), usada só para este app** (conta do Baral). Nela: projeto `balneario-sumauma`, região São Paulo; depois passar Project URL + chave anon. Entrar com o mesmo GitHub abriria a conta antiga, por isso não serve.
- **✅ Projeto novo criado (01/11/2026)** na conta Supabase nova (e-mail só do app), organização "Balneário Sumaúma" (plano gratuito), projeto `balneario-sumauma`, região São Paulo (`sa-east-1`), status Healthy. **Project URL: `https://udmnwejvcdbeguuobbli.supabase.co`**. Opções de segurança: RLS automático ligado e exposição automática de novas tabelas desligada. A chave pública (publishable, `sb_publishable_...`) fica em Project Settings → API Keys e pode ir no `index.html`; **a chave secreta (`sb_secret_...`) nunca vai para o código**. Senha do banco: só com o usuário. A conta tem também uma organização criada pelo Vercel Marketplace com um projeto pausado de outro uso — não mexer.
- **✅ Banco montado (01/11/2026):** tabelas `perfis`, `produtos`, `vendas`, `despesas`, `transacoes` (as 4 de dados com `id text` + `data jsonb`, espelhando o que o app guarda hoje), RLS ligado nas 5, 11 políticas, tempo real nas 4 de dados, sem nenhum acesso para o papel anônimo. Regras: **admin** lê/altera tudo; **vendas** lê produtos, lê/lança/atualiza vendas e só **insere** em transações (não lê financeiro nem despesas, não edita produto, não apaga venda). Função `papel_atual()` e gatilho que cria `perfis` com papel `vendas` para todo usuário novo (promover admins manualmente). Obs.: baixa de estoque na venda precisará de função própria, já que `vendas` não edita `produtos`.
- **Cadastro público do Supabase desligado (01/11/2026)** (Authentication → Sign In / Providers): só quem o administrador cria no painel consegue entrar. O login provisório local e a senha inicial antiga foram removidos do código.
- **✅ App ligado ao Supabase (01/11/2026, só local — ainda NÃO publicado):** `index.html` usa `@supabase/supabase-js@2.57.4` (CDN) com a chave pública. **Login real** (`AuthSystem`): o usuário escolhe o nome e a senha é conferida no servidor; e-mails internos `willyan@`, `baral@`, `mae@`, `rihanna@` + `sumauma.app`; o perfil (`admin`/`gestor`/`vendas`) vem de `public.perfis`, preenchido automaticamente pelo gatilho `novo_usuario()` conforme o e-mail (Willyan=admin, Baral=gestor, demais=vendas). **Dados no banco:** `SamaumaStore.set()` mantém o cache local e envia só o que mudou (insert/update/delete em fila); `puxarTudo()` baixa tudo ao entrar; **tempo real** via Realtime atualiza a tela aberta. Ao sair, o cache local é apagado. O 1º gestor a entrar com banco vazio cadastra o cardápio padrão (71 itens). "Apagar tudo" também apaga no banco. Regras extras: `vendas` pode cancelar (apagar) só comandas **abertas**. Limitações: sem fila offline (alterações feitas sem internet não reenviam); a baixa de estoque feita por `vendas` não é gravada no servidor (RLS) — estoque ainda não é controlado.
- **Teste real concluído (01/11/2026):** Willyan entrou pelo Supabase como admin; o cardápio de 71 itens foi gravado no banco; uma comanda de teste criada no app apareceu no servidor e, ao cancelar, foi apagada de lá. `sw.js` corrigido (v2): revalida com o servidor e **não intercepta chamadas ao Supabase** (antes podia servir versão velha e guardar dados reais no cache). Dica: se o navegador mostrar versão antiga, abrir com `?v=N` no fim do endereço ou `Ctrl+Shift+R`.
- **Usuários no Supabase Auth:** criados via painel (Authentication → Users → Add user, "Auto confirm", senha digitada pelo próprio usuário — nenhuma senha fica no código nem no repositório). Estado (confirmado no banco em 01/11/2026): **os 4 usuários existem e estão confirmados**, com perfis corretos: Willyan=admin, Baral=gestor, Mãe=vendas, Rihanna=vendas. Cada tela foi testada pelo usuário no Chrome (tudo certo) e a versão foi publicada. Quem esquecer a senha pede ao Willyan, que redefine pelo painel do Supabase (Authentication → Users).
- **Visual escuro (01/11/2026, local — publicar após aprovação):** tema escuro como padrão, com botão sol/lua (menu lateral e topo do celular) que lembra a escolha por aparelho (`samauma_tema`); paleta "neon floresta" (fundo #07120c, cartões #10241a, destaque #2ee59d). Cards de indicadores do Dashboard em degradê (verde faturamento, vermelho saídas, ciano saldo, âmbar lucro), iguais nos dois temas. Gráficos acompanham o tema. Implementado como overrides `html.dark ...` sobre as classes do Tailwind (sem reescrever as telas). Testado: Dashboard, PDV, Estoque e modal no escuro; Dashboard no claro.
- **REGRA DE ESTOQUE — APLICADA em 01/11/2026 (detalhes da implementação no item seguinte):** o estoque deve ser baixado **quando o item é entregue ao cliente, ou seja, no momento em que é lançado na comanda**, e **não** só ao fechar a conta como o app faz hoje (`finalizeSale`). Ao remover um item da comanda ou cancelar a comanda, a quantidade volta ao estoque. Como `vendas` (Mãe e Rihanna) só consulta produtos, a baixa precisa de uma **função no banco** (`SECURITY DEFINER`) que só permita diminuir/devolver quantidade, sem mudar preço, nome nem apagar produto. Hoje não há estoque definido (tudo zerado), por isso nada disso é urgente — fazer **antes** de cadastrar as quantidades reais.
- **Relatório de fim de dia (01/11/2026, local — publicar após aprovação):** nova aba **Financeiro → Fechamento do dia** (só Willyan e Baral, que veem o Financeiro). Escolhe o dia (padrão hoje) e mostra: total vendido, nº de vendas, ticket médio, descontos, saídas e saldo do dia; por forma de pagamento, por categoria, itens vendidos e lista de vendas; avisa se há comandas ainda abertas (não entram no total). Botões **Imprimir / salvar PDF** (folha branca própria para impressão, em qualquer tema) e **Baixar planilha** (CSV com uma linha por item). Nomes digitados pelos usuários são escapados (sem HTML injetado). Testado com vendas de exemplo: totais conferidos à mão.
- **Regra de estoque implementada (01/11/2026):** função no banco `public.ajustar_estoque(p_id, p_delta)` (`SECURITY DEFINER`, só soma/subtrai a quantidade, exige usuário com perfil, sem acesso para anônimo) — testada como `vendas`: baixa o estoque e o `update` direto continua bloqueado (0 linhas). No app, `SamaumaStore.ajustarEstoque()` atualiza o aparelho na hora e manda só a diferença (atômico, sem corrida entre aparelhos). Lançar item na comanda baixa; diminuir/remover devolve; cancelar comanda aberta devolve tudo; **fechar a conta não baixa de novo**. Comandas novas levam a marca `estoqueBaixado: true`; comandas antigas (sem a marca) mantêm a regra antiga (baixa ao fechar). O estoque pode ficar negativo (sem bloqueio de venda).
- **PDV no celular (01/11/2026):** em telas pequenas (<1024px) a mesa e o cardápio viram **duas telas**: abrir uma mesa com itens mostra a mesa, com botão grande "Adicionar item"; no cardápio há "Voltar à mesa" (com resumo: mesa · itens · total); **tocar no "+" de um produto lança o item e volta sozinho para a mesa**, com aviso "adicionado". Mesa nova ou vazia abre direto no cardápio. No computador as duas partes continuam lado a lado. O aviso (toast) sobe no celular para não cobrir a barra inferior.
- **Hospedagem:** o app está no **GitHub Pages** (`https://willyancarlosviana-debug.github.io/APP-BARAL/`), que serve qualquer computador e celular (HTTPS, instalável). O endereço `127.0.0.1:8765` era só a visualização local de teste da Claude. A conta Vercel (Hobby) do usuário não tem projeto do Balneário; migrar para Vercel só daria um endereço mais curto e publicação automática — é opcional.
- **Quarta usuária confirmada ("Mãe")**, além de Baral, Willyan e Rihanna: papel e nome de login ainda a definir (por enquanto assumir **Vendas**, o perfil mais restrito).
- **Pendente no Supabase:** desligar cadastro público (Authentication → Sign In / Providers), criar os 3 usuários, promover Baral e Willyan a `admin`, ligar o `index.html` (supabase-js + login real + sincronização), configurar redefinição por e-mail e depois SMS. Os celulares de recuperação foram informados pelo usuário, mas **não ficam neste arquivo** (repositório público).
- Dica: o tradutor do Chrome quebra o painel do Supabase ("removeChild"); manter a tradução desligada nesse site.
- (Histórico) Havia dúvida entre: **reativar o `samauma-db`** (provável uso anterior do app) ou criar projeto novo. Antes de reativar, conferir o que há nele. Depois, pegar **Project URL** e chave **anon (pública)**. Nunca usar nem colar a chave `service_role` no código.

## Segurança — pendências

- O remote `origin` do git tinha um token pessoal do GitHub (`ghp_...`) em texto puro; **já foi removido do remote** (URL agora limpa), mas o token foi exposto em conversa: **revogar em github.com/settings/tokens**. Para novos pushes, autenticar com `gh auth login` ou Git Credential Manager.
- Repositório `APP-BARAL` é público (0 forks/estrelas, único contribuidor `willyancarlosviana-debug`); lista de colaboradores convidados só é visível em Settings → Access.
- Fixar versões dos CDNs (Tailwind e Chart.js estão sem versão fixa).

## Próximos passos planejados (ainda não iniciado)

**Sincronização multi-dispositivo em tempo real (Supabase).** Hoje cada aparelho tem seu próprio `localStorage` isolado — se crescer para múltiplos pontos de uso simultâneo (ex: caixa + cozinha, mais de um operador), cada um vê dados diferentes. Plano definido (aguardando decisão de seguir ou não):

- Usar **Supabase** (Postgres gerenciado, plano gratuito) como backend, com 4 tabelas espelhando os dados de hoje (`products`, `sales`, `expenses`, `transactions`), cada uma com `id` + coluna `data jsonb`.
- Padrão **cache local + sincronização em segundo plano**: `SamaumaStore.get()`/`set()` continuam síncronos (nenhuma das ~40 funções de render/handle no `index.html` precisa mudar); só a classe `SamaumaStore` e a inicialização (`SamaumaController.init()`) são reescritas para also gravar/ler do Supabase e escutar mudanças em tempo real (Realtime) de outros aparelhos.
- Badge "Modo Online" no cabeçalho passa a refletir a conexão de verdade com o Supabase.
- **Pré-requisito manual do usuário**: criar um projeto gratuito em supabase.com, rodar um script SQL (já redigido, ver plano completo) pra criar as tabelas e liberar Realtime, e enviar a Project URL + anon key.
- Limitação aceita nesta primeira versão: sem fila de sincronização offline (mudanças feitas sem internet não reenviam sozinhas depois); acesso ao banco fica sem autenticação, no mesmo nível de proteção que o link do app já tem hoje (público, sem senha).
- Plano técnico detalhado salvo em `C:\Users\User\.claude\plans\chat-acabei-de-receber-twinkling-canyon.md` (arquivo local do Claude Code, não faz parte do repositório).

## Como recarregar dados de exemplo no app

Aba **Configurações → Zona de Segurança & Manutenção → "Recarregar Dados Demo"** (com confirmação, pois apaga dados atuais e recarrega o cardápio padrão do sistema).

## Como instalar como app

- **Android (Chrome)**: abrir o link → menu (⋮) → "Instalar app" ou "Adicionar à tela inicial"
- **iPhone/iPad (Safari)**: abrir o link → ícone de compartilhar (□↑) → "Adicionar à Tela de Início"

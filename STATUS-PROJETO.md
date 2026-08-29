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

- ✅ App funciona sem tela de login, abre direto no Dashboard/menu.
- ✅ Cardápio real cadastrado (71 itens, fiel aos valores oficiais).
- ✅ PDV testado ponta a ponta: adicionar item, ajustar quantidade, remover — funcionando.
- ✅ App inicia limpo, sem dados fictícios de vendas/despesas.
- ✅ Instalável como app (PWA) no celular e tablet, com ícone da logo.
- ✅ Publicado e sincronizado nas 3 branches, testado no site ao vivo.
- ⚠️ **Estoque ainda não está sendo controlado** (todos os produtos sem quantidade cadastrada, sem bloqueio de venda por estoque). É preciso lançar o estoque real aos poucos pela tela Editar Produto ou por "Compras/Entrada".
- ⚠️ Preço de custo de todos os produtos está em R$ 0,00 — os relatórios de lucro/CMV não vão refletir a realidade até isso ser preenchido.
- ⚠️ Os dados são só locais (localStorage do navegador de quem acessa) — não há sincronização entre dispositivos/pessoas. Se isso for necessário no futuro, será preciso reintroduzir algum backend (Supabase configurado corretamente, Firebase, etc.).
- ⚠️ Quem já tinha o app aberto/instalado antes de uma atualização pode precisar recarregar forçado (Ctrl+Shift+R) ou reinstalar o atalho pra pegar a versão nova.

## Como recarregar dados de exemplo no app

Aba **Configurações → Zona de Segurança & Manutenção → "Recarregar Dados Demo"** (com confirmação, pois apaga dados atuais e recarrega o cardápio padrão do sistema).

## Como instalar como app

- **Android (Chrome)**: abrir o link → menu (⋮) → "Instalar app" ou "Adicionar à tela inicial"
- **iPhone/iPad (Safari)**: abrir o link → ícone de compartilhar (□↑) → "Adicionar à Tela de Início"

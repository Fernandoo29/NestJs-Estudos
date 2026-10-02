# Rota de Estudo NestJS: aprendizado por repetição

## Como usar esta rota

**A ideia central:** cada tema tem 5 exercícios, cada um com um **projeto diferente**. O que muda é o contexto (loja, biblioteca, clínica...), o que se repete é a **mecânica do tema**. É essa repetição em contextos novos que fixa o aprendizado.

**Regras do método:**

1. **Escreva do zero** em cada exercício. Nada de copiar o projeto anterior. Consultar a documentação é permitido, copiar e colar o projeto passado não.
2. **Os exercícios sobem de dificuldade** dentro do tema: o 1 é básico, o 5 é complexo.
3. **Cada exercício é um projeto novo** (`nest new nome-do-projeto`). Projetos pequenos, de 1 a 3 horas cada.
4. **Checklist de conclusão** de cada exercício: funciona, está testado manualmente (Insomnia/Postman/arquivo `.http`), e você consegue explicar *por que* cada arquivo existe.
5. **Revisão espaçada:** ao começar um tema novo, refaça de memória o exercício 1 do tema anterior (15 a 20 min). Isso conecta os temas.
6. **Diário de dúvidas:** crie um `DUVIDAS.md`. Tudo que travar vai lá, com a resposta que você encontrou.
7. **Não pule temas.** A ordem foi pensada para que cada um use o anterior.

**Stack sugerida:** Node 20+, TypeScript, NestJS 10/11, PostgreSQL (via Docker), Prisma *ou* TypeORM (escolha um e use nos temas de banco; se quiser reforçar mais, refaça um exercício com o outro), Jest, Docker.

---

## Mapa dos temas

| # | Tema | Foco |
| --- | --- | --- |
| 1 | Fundamentos | Módulos, controllers, providers, injeção de dependência |
| 2 | CRUD em memória | Rotas, verbos HTTP, params, query, body, status codes |
| 3 | DTOs, validação e Pipes | class-validator, class-transformer, pipes customizados |
| 4 | Banco de dados (4A e 4B) | ORM, relações, paginação, transações, migrations |
| 5 | Ciclo de vida da requisição | Middleware, Guards, Interceptors, Pipes, Filters |
| 6 | Autenticação (6A e 6B) | JWT, refresh token, hash de senha, OAuth |
| 7 | Autorização | Roles, permissões, ownership, CASL |
| 8 | Configuração e módulos avançados | ConfigModule, providers customizados, módulos dinâmicos |
| 9 | Arquivos e serialização | Upload, download, streaming, serialização de resposta |
| 10 | Cache, filas e tarefas | Cache, Throttler, Schedule, BullMQ, Events |
| 11 | Documentação e versionamento | Swagger/OpenAPI, versionamento de API |
| 12 | Testes | Unitários, integração, E2E, mocks |
| 13 | Tempo real | WebSockets (Gateways), SSE |
| 14 | Microsserviços e mensageria | TCP, Redis, RabbitMQ/Kafka, padrões de comunicação |
| 15 | GraphQL | Code-first, resolvers, dataloaders |
| 16 | Produção | Logs, health checks, segurança, Docker, CI/CD |
| 17 | **Super projeto final** | Tudo junto |

---

# TEMA 1: Fundamentos (Módulos, Controllers, Providers e DI)

**Objetivo:** entender a arquitetura do Nest. É a base de todo o resto. Não se preocupe com banco ou validação aqui.

### Exercício 1.1: Hello Pet Shop

**Projeto:** API de uma pet shop que responde informações fixas. **Desafios:**

- Crie um módulo `pets` com controller e service via CLI (`nest g resource` ou `nest g module/controller/service`).
- `GET /pets` retorna uma lista fixa vinda do **service** (o controller não pode ter dados).
- Explique em comentário o que cada decorator (`@Module`, `@Controller`, `@Injectable`, `@Get`) faz.

### Exercício 1.2: Conversor de unidades

**Projeto:** API que converte medidas (km→milhas, °C→°F, kg→lb). **Desafios:**

- Crie 3 services separados (um por tipo de conversão) e um controller que usa os três via injeção.
- Use `@Param` e `@Query` para receber os valores.
- Faça um `ConversionsModule` que **exporta** um service e outro módulo `ReportsModule` que o importa e usa.

### Exercício 1.3: Sistema de notificações com várias implementações

**Projeto:** serviço que "envia" notificações por e-mail, SMS e push (só `console.log`). **Desafios:**

- Crie uma interface `NotificationSender` e 3 classes que a implementam.
- Use **custom providers** (`provide`/`useClass`) com tokens para injetar a implementação correta.
- Troque a implementação injetada sem mexer no controller.

### Exercício 1.4: Contador de visitas com escopos

**Projeto:** blog com contador de visitas por rota. **Desafios:**

- Prove com logs a diferença entre provider `DEFAULT` (singleton), `REQUEST` e `TRANSIENT`.
- Injete o objeto `Request` num provider de escopo request.
- Documente no README quando usar cada escopo e o custo de performance.

### Exercício 1.5: Mini ERP modular

**Projeto:** três módulos (`clients`, `products`, `orders`) que se relacionam. **Desafios:**

- `orders` depende de `clients` e `products` (importando/exportando corretamente).
- Resolva uma **dependência circular** entre dois services usando `forwardRef` (e depois descreva como evitá-la com refatoração).
- Crie um `SharedModule` global (`@Global`) com um `LoggerService` próprio usado em todos os módulos.

---

# TEMA 2: CRUD em memória (REST na prática)

**Objetivo:** dominar rotas, verbos HTTP e status codes, **sem banco**. Os dados ficam em arrays. Assim você foca no Nest, não no ORM.

### Exercício 2.1: Lista de tarefas

**Projeto:** To-do list simples. **Desafios:**

- CRUD completo: `GET /tasks`, `GET /tasks/:id`, `POST`, `PUT`, `DELETE`.
- Retorne `404` quando não existir (`NotFoundException`) e `201` no POST.
- IDs gerados com `crypto.randomUUID()`.

### Exercício 2.2: Catálogo de livros

**Projeto:** biblioteca pessoal. **Desafios:**

- Diferencie `PUT` (substitui) de `PATCH` (atualiza parcial) e implemente ambos.
- Filtros via query: `GET /books?author=x&year=2020`.
- Ordenação via query: `?sort=title&order=desc`.

### Exercício 2.3: Agenda de contatos com busca

**Projeto:** agenda telefônica. **Desafios:**

- Busca textual: `GET /contacts?search=ana` (nome ou e-mail).
- Paginação manual: `?page=2&limit=10`, com resposta no formato `{ data, total, page, lastPage }`.
- Impeça contatos duplicados (mesmo e-mail) com `ConflictException` (409).

### Exercício 2.4: Sistema de reservas de salas

**Projeto:** reserva de salas de reunião. **Desafios:**

- Rotas aninhadas: `GET /rooms/:roomId/bookings` e `POST /rooms/:roomId/bookings`.
- Regra de negócio: não permitir reservas com horários sobrepostos na mesma sala.
- Rota de ação: `PATCH /bookings/:id/cancel` (não é um CRUD puro, é uma transição de estado).

### Exercício 2.5: Controle de estoque

**Projeto:** estoque de uma loja com movimentações. **Desafios:**

- Produtos e movimentações (`IN`/`OUT`) com saldo calculado.
- Impeça saída maior que o saldo (`BadRequestException` com mensagem clara).
- Rota de relatório: `GET /products/:id/history?from=...&to=...`.
- Use `@HttpCode`, `@Header` e `@Redirect` em pelo menos uma rota cada, só para conhecer.

---

# TEMA 3: DTOs, Validação e Pipes

**Objetivo:** garantir que dados inválidos não entrem na aplicação. Refaça mentalmente o CRUD do tema 2, agora com validação.

> Setup padrão em todos: `ValidationPipe` global com `whitelist: true`, `forbidNonWhitelisted: true` e `transform: true`.

### Exercício 3.1: Cadastro de usuários

**Projeto:** cadastro com nome, e-mail, idade, senha. **Desafios:**

- `CreateUserDto` com `@IsString`, `@IsEmail`, `@Min`, `@MinLength`.
- `UpdateUserDto` usando `PartialType` (`@nestjs/mapped-types`).
- Mensagens de erro personalizadas em português.

### Exercício 3.2: Formulário de pedido de comida

**Projeto:** pedido de restaurante com itens. **Desafios:**

- DTO aninhado: pedido com lista de itens (`@ValidateNested`, `@Type`, `@ArrayMinSize`).
- Enum validado (`@IsEnum`) para tipo de entrega.
- Campos condicionais (`@ValidateIf`): endereço obrigatório só se for entrega.

### Exercício 3.3: Filtros de busca tipados

**Projeto:** busca de imóveis. **Desafios:**

- `QueryDto` com `@Type(() => Number)` para preço mínimo/máximo, página e limite.
- Valores padrão (`page = 1`, `limit = 10`) e limite máximo (`@Max(100)`).
- Valide `@Query` de datas (`@IsDateString`) e booleanos vindos como string.

### Exercício 3.4: Pipes customizados

**Projeto:** API de cupons de desconto. **Desafios:**

- Crie um `ParseCouponCodePipe` (normaliza maiúsculas e valida formato).
- Use `ParseIntPipe`, `ParseUUIDPipe`, `ParseEnumPipe` e `DefaultValuePipe` nas rotas.
- Pipe que transforma `"2024-01-31"` em objeto `Date` ou lança erro.

### Exercício 3.5: Validadores customizados

**Projeto:** cadastro de empresas brasileiras. **Desafios:**

- Decorator próprio `@IsCNPJ()` e `@IsCPF()` com `registerDecorator`.
- Validador **assíncrono** (`@ValidatorConstraint({ async: true })`) que checa se o e-mail já existe via service injetado.
- Padronize o formato de erro de validação com `exceptionFactory` (ex.: `{ campo: [mensagens] }`).

---

# TEMA 4: Banco de dados (ORM)

Divido em dois subtemas. Escolha **Prisma** ou **TypeORM** e use o mesmo nos 10 exercícios. Se sobrar fôlego, refaça os exercícios 4A.1 e 4B.1 com o outro ORM.

## 4A: CRUD com banco e relações

### Exercício 4A.1: Blog simples

**Projeto:** posts de um blog. **Desafios:**

- Suba PostgreSQL com `docker-compose`.
- CRUD de `Post` persistido, com migration inicial.
- `createdAt`/`updatedAt` automáticos e *soft delete* (`deletedAt`).

### Exercício 4A.2: Biblioteca com autor e livros (1:N)

**Projeto:** autores e seus livros. **Desafios:**

- Relação um-para-muitos; `GET /authors/:id` traz os livros junto.
- Ao deletar autor, defina o comportamento (cascade ou bloqueio) e justifique.
- Valide que `authorId` existe ao criar o livro.

### Exercício 4A.3: Escola com alunos e cursos (N:N)

**Projeto:** matrículas. **Desafios:**

- Relação muitos-para-muitos com tabela intermediária que tem campos próprios (`nota`, `dataMatricula`).
- Rotas: matricular, desmatricular, listar cursos de um aluno, alunos de um curso.
- Evite matrícula duplicada (constraint única composta).

### Exercício 4A.4: Rede social de receitas

**Projeto:** usuários, receitas, ingredientes, comentários e curtidas. **Desafios:**

- 4 ou mais entidades inter-relacionadas.
- Contagem de curtidas/comentários na listagem **sem N+1 queries** (prove com log de queries).
- Relação 1:1 (`User` ↔ `Profile`).

### Exercício 4A.5: Clínica médica

**Projeto:** médicos, pacientes e consultas. **Desafios:**

- Enum de status da consulta e regras de transição (`AGENDADA → REALIZADA | CANCELADA`).
- Impeça dois agendamentos para o mesmo médico no mesmo horário (índice único + tratamento do erro do banco).
- Seed inicial (`prisma db seed` ou script próprio).

## 4B: Consultas avançadas, transações e performance

### Exercício 4B.1: Catálogo de e-commerce com filtros

**Projeto:** produtos com categorias e marcas. **Desafios:**

- Filtros dinâmicos combinados (categoria, faixa de preço, busca textual, em estoque).
- Paginação real no banco (`skip/take` ou `limit/offset`) e `total`.
- Ordenação dinâmica segura (whitelist de campos).

### Exercício 4B.2: Carteira digital

**Projeto:** transferência de saldo entre contas. **Desafios:**

- **Transação**: debitar e creditar atomicamente, com rollback se algo falhar.
- Evite saldo negativo mesmo com requisições concorrentes (lock ou checagem atômica).
- Extrato paginado com filtros por período.

### Exercício 4B.3: Painel de vendas

**Projeto:** relatórios de uma loja. **Desafios:**

- Agregações: total por mês, top 10 produtos, ticket médio (`groupBy`/`QueryBuilder`/raw query).
- Uma rota com *raw query* tipada.
- Índices criados em migration e justificados.

### Exercício 4B.4: Sistema de ingressos

**Projeto:** venda de ingressos com estoque limitado. **Desafios:**

- Garanta que nunca se vende mais que o estoque (concorrência).
- Reserva temporária (expira em 10 min) com status.
- Teste com 20 requisições simultâneas (script simples) para provar a consistência.

### Exercício 4B.5: Mini CMS multi-tenant

**Projeto:** vários clientes (tenants) usando a mesma API. **Desafios:**

- Todo dado pertence a um `tenantId`; nenhuma query pode vazar dados de outro tenant.
- Repository/service base que aplica o filtro automaticamente.
- Migrations versionadas com uma alteração destrutiva simulada (renomear coluna sem perder dados).

---

# TEMA 5: Ciclo de vida da requisição (Middleware, Guards, Interceptors, Filters)

**Objetivo:** entender a ordem: `Middleware → Guard → Interceptor (antes) → Pipe → Handler → Interceptor (depois) → Exception Filter`.

### Exercício 5.1: Logger de requisições

**Projeto:** API de qualquer tema com auditoria de acesso. **Desafios:**

- `LoggerMiddleware` registrando método, rota, status e tempo de resposta.
- Aplique só em algumas rotas usando `configure(consumer)` com `forRoutes` e `exclude`.
- Adicione um `X-Request-Id` gerado por requisição.

### Exercício 5.2: Respostas padronizadas

**Projeto:** API de cinemas. **Desafios:**

- `TransformInterceptor` que envolve toda resposta em `{ success, data, timestamp }`.
- `TimeoutInterceptor` (RxJS `timeout`) que devolve `408` se demorar demais.
- Descubra e escreva a ordem de execução dos componentes com `console.log` em cada um.

### Exercício 5.3: Filtro global de exceções

**Projeto:** API de pagamentos fictícios. **Desafios:**

- `HttpExceptionFilter` global com formato único de erro (código, mensagem, path, timestamp).
- Exceções de domínio próprias (`InsufficientFundsException`) mapeadas para o status correto.
- Filtro específico que converte erros do banco (chave duplicada) em `409`.

### Exercício 5.4: Guards e decorators customizados

**Projeto:** API com área pública e área restrita por **API Key** (ainda sem JWT). **Desafios:**

- `ApiKeyGuard` lendo header `x-api-key`.
- Decorator `@Public()` usando `SetMetadata` e `Reflector` para liberar rotas.
- Decorator de parâmetro `@CurrentIp()` e um decorator composto com `applyDecorators`.

### Exercício 5.5: Idempotência e cache de resposta

**Projeto:** API de checkout. **Desafios:**

- Interceptor de **idempotência**: mesmo header `Idempotency-Key` retorna a resposta anterior sem reprocessar.
- Interceptor que mede e registra métricas por rota (contagem e tempo médio).
- Documente o que cada camada (middleware/guard/interceptor/pipe/filter) resolve melhor.

---

# TEMA 6: Autenticação

## 6A: JWT e fundamentos

### Exercício 6A.1: Cadastro e login básico

**Projeto:** sistema de anotações pessoais. **Desafios:**

- `POST /auth/register` com senha em hash (bcrypt/argon2) e `POST /auth/login`.
- Nunca retorne a senha em resposta nenhuma.
- Mensagem de erro igual para "usuário não existe" e "senha errada" (e explique o porquê).

### Exercício 6A.2: JWT com Passport

**Projeto:** álbum de fotos privado. **Desafios:**

- `JwtModule` + `JwtStrategy` + `JwtAuthGuard`.
- Rota `GET /me` retornando o usuário logado, usando decorator `@CurrentUser()`.
- Guard global com `APP_GUARD` e rotas públicas via `@Public()`.

### Exercício 6A.3: Estratégia Local + JWT

**Projeto:** app de hábitos. **Desafios:**

- Login com `passport-local` e proteção das demais rotas com `passport-jwt`.
- Cada usuário só vê **seus** hábitos (filtro por `userId` em todas as queries).
- Expiração curta do token e tratamento do erro de token expirado.

### Exercício 6A.4: Recuperação de senha e verificação de e-mail

**Projeto:** plataforma de cursos. **Desafios:**

- Fluxo "esqueci minha senha" com token de uso único e expiração (e-mail simulado por log ou Mailhog).
- Verificação de e-mail antes de permitir login.
- Troca de senha exigindo a senha atual.

### Exercício 6A.5: Rate limit no login

**Projeto:** painel administrativo. **Desafios:**

- `@nestjs/throttler` mais rigoroso nas rotas de auth.
- Bloqueio temporário da conta após 5 tentativas erradas.
- Registro das tentativas de login (auditoria) em tabela própria.

## 6B: Sessões avançadas e login social

### Exercício 6B.1: Access token + Refresh token

**Projeto:** app de finanças pessoais. **Desafios:**

- Access token de 15 min e refresh token de 7 dias, com secrets diferentes.
- `POST /auth/refresh` e `POST /auth/logout` (invalidando o refresh).
- Refresh token guardado **com hash** no banco.

### Exercício 6B.2: Rotação de refresh token e múltiplos dispositivos

**Projeto:** app de streaming. **Desafios:**

- Cada login cria uma sessão (dispositivo, IP, data).
- Rotação: cada refresh gera um novo token e invalida o antigo; reuso do antigo derruba a sessão (detecção de roubo).
- `GET /auth/sessions` e `DELETE /auth/sessions/:id`.

### Exercício 6B.3: Cookies HttpOnly

**Projeto:** rede social minimalista. **Desafios:**

- Tokens entregues em cookies `HttpOnly`, `Secure`, `SameSite`.
- Configure CORS com `credentials: true` para um front fictício.
- Explique em README a diferença de risco entre localStorage e cookie HttpOnly (XSS vs CSRF).

### Exercício 6B.4: Login social (OAuth2)

**Projeto:** agregador de links. **Desafios:**

- Login com Google ou GitHub via `passport-google-oauth20`/`passport-github2`.
- Vincule conta social a conta existente pelo e-mail.
- Permita que um usuário tenha vários provedores.

### Exercício 6B.5: 2FA (TOTP)

**Projeto:** cofre de senhas. **Desafios:**

- Ativação de 2FA com QR code (`otplib`) e códigos de recuperação.
- Login em duas etapas (token parcial → código TOTP → token completo).
- Desativar 2FA exige senha + código.

---

# TEMA 7: Autorização

**Objetivo:** responder "o que este usuário **pode** fazer?" (depois do "quem é ele?" do tema 6).

### Exercício 7.1: Roles simples

**Projeto:** painel de uma escola (aluno, professor, admin). **Desafios:**

- Enum `Role`, decorator `@Roles()` e `RolesGuard` com `Reflector`.
- Admin cria professores; professor lança notas; aluno só lê as suas.
- Retorne `403` (e não `401`) corretamente.

### Exercício 7.2: Ownership (dono do recurso)

**Projeto:** app de documentos. **Desafios:**

- Só o dono edita/deleta; admin pode tudo.
- Implemente via guard/policy reutilizável, não com `if` espalhado nos controllers.
- Teste 4 cenários por rota: dono, outro usuário, admin, anônimo.

### Exercício 7.3: Permissões granulares (RBAC completo)

**Projeto:** ERP com módulos (vendas, financeiro, RH). **Desafios:**

- Tabelas `Role`, `Permission` e `RolePermission` (ex.: `sales:create`, `finance:read`).
- `@RequirePermissions('sales:create')` e guard que checa no banco (com cache).
- Endpoint para admin editar permissões de um papel.

### Exercício 7.4: ABAC com CASL

**Projeto:** plataforma de blog colaborativo. **Desafios:**

- `CaslAbilityFactory` com regras: autor edita seus posts, editor edita qualquer post de sua categoria, leitor só lê.
- `PoliciesGuard` + `@CheckPolicies()`.
- Filtro de listagem baseado em permissões (usuário só **vê** o que pode ler).

### Exercício 7.5: Organizações e times

**Projeto:** gerenciador de projetos (estilo Trello simplificado). **Desafios:**

- Usuário pertence a várias organizações com papéis diferentes em cada uma.
- Convites por e-mail com token e aceite.
- Guard que resolve o papel conforme `:orgId` da rota.

---

# TEMA 8: Configuração e módulos avançados

### Exercício 8.1: Variáveis de ambiente tipadas

**Projeto:** API de clima (consome API externa fictícia). **Desafios:**

- `ConfigModule.forRoot({ isGlobal: true })`, arquivos `.env.development` e `.env.production`.
- Validação do `.env` na inicialização (Joi ou Zod): app não sobe se faltar variável.
- `registerAs` para agrupar configs (`database`, `jwt`, `app`).

### Exercício 8.2: Módulo dinâmico próprio

**Projeto:** biblioteca interna de "mailer". **Desafios:**

- `MailerModule.forRoot(options)` e `forRootAsync(...)`.
- Reutilize em dois projetos com configs diferentes.
- Documente o padrão `register` vs `forRoot` vs `forFeature`.

### Exercício 8.3: Providers assíncronos e factories

**Projeto:** app que conecta em múltiplos serviços externos. **Desafios:**

- `useFactory` com `inject` para criar um cliente HTTP configurado.
- `provide` assíncrono: o app só sobe depois que a conexão for estabelecida.
- Use `useValue` para injetar um mock em ambiente de teste.

### Exercício 8.4: Consumindo APIs externas

**Projeto:** agregador de CEP, câmbio e clima. **Desafios:**

- `HttpModule` (axios) com timeout, retry e tratamento de erro de terceiros.
- Camada de "adapter" que isola a API externa do seu domínio.
- Fallback quando a API externa falha.

### Exercício 8.5: Ciclo de vida da aplicação

**Projeto:** app com conexões que precisam abrir e fechar corretamente. **Desafios:**

- `OnModuleInit`, `OnApplicationBootstrap`, `OnModuleDestroy`, `OnApplicationShutdown`.
- `enableShutdownHooks()` e encerramento gracioso (finalizar requisições pendentes).
- Log mostrando a ordem exata dos hooks.

---

# TEMA 9: Arquivos e serialização

### Exercício 9.1: Upload de avatar

**Projeto:** perfil de usuário. **Desafios:**

- `FileInterceptor` + `Multer`; salve em disco.
- Valide tipo (jpeg/png) e tamanho máximo com `ParseFilePipe`.
- Nome único para evitar sobrescrita.

### Exercício 9.2: Galeria com múltiplos arquivos

**Projeto:** álbum de eventos. **Desafios:**

- `FilesInterceptor` e `FileFieldsInterceptor`.
- Registro dos arquivos no banco (nome original, path, mimetype, tamanho).
- Exclusão do arquivo físico ao apagar o registro.

### Exercício 9.3: Download e streaming

**Projeto:** biblioteca de documentos. **Desafios:**

- Download com `StreamableFile` e `Content-Disposition`.
- Geração de PDF/CSV sob demanda (relatório) com streaming.
- Download protegido: só quem tem permissão acessa.

### Exercício 9.4: Upload para nuvem

**Projeto:** marketplace de produtos com imagens. **Desafios:**

- Upload para S3 (ou MinIO local via Docker).
- URL pré-assinada (*presigned URL*) para upload direto do front.
- Estratégia para limpar arquivos órfãos.

### Exercício 9.5: Serialização de resposta

**Projeto:** API de usuários com dados sensíveis. **Desafios:**

- `ClassSerializerInterceptor` com `@Exclude()`, `@Expose()`, `@Transform()`.
- Respostas diferentes por papel (`groups`): admin vê mais campos que usuário comum.
- Classes de resposta (`ResponseDto`) separadas das entidades.

---

# TEMA 10: Cache, filas e tarefas agendadas

### Exercício 10.1: Cache em memória

**Projeto:** catálogo de produtos com muitas leituras. **Desafios:**

- `CacheModule` e `@UseInterceptors(CacheInterceptor)` com TTL.
- Invalide o cache ao criar/atualizar/deletar.
- Chave de cache considerando query params.

### Exercício 10.2: Cache com Redis

**Projeto:** ranking de jogos. **Desafios:**

- Redis via Docker como store de cache.
- Cache manual com `CACHE_MANAGER` (get/set/del).
- Meça o ganho de tempo (com e sem cache) e registre no README.

### Exercício 10.3: Tarefas agendadas

**Projeto:** sistema de assinaturas. **Desafios:**

- `@nestjs/schedule` com `@Cron`, `@Interval`, `@Timeout`.
- Job diário que marca assinaturas vencidas.
- Impeça execução duplicada do mesmo job (lock simples).

### Exercício 10.4: Filas com BullMQ

**Projeto:** envio de e-mails em massa. **Desafios:**

- Producer (endpoint) e Consumer (`@Processor`) com Redis.
- Retentativas com backoff exponencial e fila de falhas (*dead letter*).
- Endpoint de status do job e progresso (`job.updateProgress`).

### Exercício 10.5: Eventos internos e rate limiting

**Projeto:** loja com ações pós-compra. **Desafios:**

- `@nestjs/event-emitter`: evento `order.created` dispara 3 listeners independentes (e-mail, estoque, pontos).
- Listener que falha não pode quebrar os outros.
- `ThrottlerModule` com limites diferentes por rota (público vs autenticado) e armazenamento no Redis.

---

# TEMA 11: Documentação e versionamento

### Exercício 11.1: Swagger básico

**Projeto:** API de uma biblioteca (reaproveite um CRUD). **Desafios:**

- `@nestjs/swagger` com `DocumentBuilder`; disponibilize em `/docs`.
- `@ApiTags`, `@ApiOperation`, `@ApiResponse` em todas as rotas.
- `@ApiProperty` nos DTOs com exemplos.

### Exercício 11.2: Swagger com autenticação

**Projeto:** API com JWT. **Desafios:**

- `addBearerAuth()` e `@ApiBearerAuth()`; teste rotas protegidas pelo próprio Swagger.
- Documente os erros (`401`, `403`, `404`, `422`) com schemas.
- Esconda rotas internas (`@ApiExcludeEndpoint`).

### Exercício 11.3: Plugin do CLI e geração de tipos

**Projeto:** API com muitos DTOs. **Desafios:**

- Ative o plugin `@nestjs/swagger` no `nest-cli.json` para reduzir decorators.
- Exporte o `swagger.json` e gere um cliente TypeScript com `openapi-typescript` ou `orval`.
- Documente upload de arquivos e respostas paginadas genéricas (`ApiPaginatedResponse`).

### Exercício 11.4: Versionamento de API

**Projeto:** API de produtos com mudança incompatível. **Desafios:**

- `app.enableVersioning` por URI (`/v1`, `/v2`), depois por header.
- Controller v1 e v2 coexistindo, com `v2` mudando o formato da resposta.
- Estratégia de depreciação documentada (headers `Deprecation`/`Sunset`).

### Exercício 11.5: Documentação viva

**Projeto:** API pública para desenvolvedores externos. **Desafios:**

- Swagger separado para API pública e API interna.
- Exemplos de requisição reais para cada rota.
- README completo: como rodar, variáveis, endpoints principais, decisões de arquitetura.

---

# TEMA 12: Testes

### Exercício 12.1: Testes unitários de service

**Projeto:** calculadora de frete. **Desafios:**

- `Test.createTestingModule` e service testado isolado.
- Mock de dependências com `jest.fn()`/`useValue`.
- Cobertura dos casos felizes e de erro (mínimo 90% no service).

### Exercício 12.2: Testes de controller

**Projeto:** CRUD de tarefas. **Desafios:**

- Controller testado com service mockado.
- Verifique chamadas (`toHaveBeenCalledWith`) e exceções.
- Teste dos Pipes e DTOs de validação isoladamente.

### Exercício 12.3: Testes de Guards e Interceptors

**Projeto:** API com roles. **Desafios:**

- Teste `RolesGuard` com `ExecutionContext` mockado.
- Teste um interceptor com `CallHandler` mockado (RxJS `of`).
- Teste um exception filter.

### Exercício 12.4: Testes E2E com Supertest

**Projeto:** API completa de blog com auth. **Desafios:**

- `supertest` contra a aplicação real (`INestApplication`).
- Fluxo completo: registrar → login → criar post → listar → deletar.
- Banco de testes isolado (Docker/Testcontainers), limpo a cada suíte.

### Exercício 12.5: TDD de ponta a ponta

**Projeto:** sistema de cupons com regras complexas. **Desafios:**

- Escreva os testes **antes** (red → green → refactor) para 5 regras de negócio.
- Use *factories* de dados de teste.
- Pipeline que roda os testes e falha se a cobertura cair.

---

# TEMA 13: Tempo real (WebSockets e SSE)

### Exercício 13.1: Chat público

**Projeto:** sala de chat única. **Desafios:**

- `@WebSocketGateway`, `@SubscribeMessage`, `@MessageBody`.
- Broadcast de mensagens e eventos de entrada/saída.
- Teste com um cliente simples HTML ou `socket.io-client`.

### Exercício 13.2: Salas e mensagens privadas

**Projeto:** chat com múltiplas salas. **Desafios:**

- `join`/`leave` de rooms e mensagens apenas para uma sala.
- Mensagem privada entre dois usuários.
- Lista de usuários online por sala.

### Exercício 13.3: WebSocket autenticado

**Projeto:** chat de suporte. **Desafios:**

- Valide JWT no handshake (guard ou middleware de gateway).
- Persista as mensagens no banco e carregue o histórico.
- Trate desconexão e reconexão do cliente.

### Exercício 13.4: Notificações em tempo real

**Projeto:** painel de pedidos de um restaurante. **Desafios:**

- Ao criar um pedido via REST, notifique a cozinha via WebSocket (integração service ↔ gateway).
- Atualizações de status do pedido para o cliente específico.
- Escale com adapter Redis (duas instâncias do app funcionando juntas).

### Exercício 13.5: Server-Sent Events

**Projeto:** dashboard de métricas ao vivo. **Desafios:**

- Rota `@Sse()` retornando `Observable` com eventos periódicos.
- Compare com WebSocket e documente quando escolher cada um.
- Barra de progresso de um job longo (ligado a uma fila BullMQ do tema 10).

---

# TEMA 14: Microsserviços e mensageria

### Exercício 14.1: Primeiro microsserviço (TCP)

**Projeto:** serviço de cálculo de impostos separado da API principal. **Desafios:**

- `NestFactory.createMicroservice` com transporte TCP.
- API principal chama via `ClientProxy` (`send` para request-response).
- `@MessagePattern` no microsserviço.

### Exercício 14.2: Eventos assíncronos (Redis)

**Projeto:** notificações de uma loja. **Desafios:**

- Use `emit` + `@EventPattern` (fire-and-forget) com Redis como transporte.
- Dois consumidores diferentes para o mesmo evento.
- Compare `send` vs `emit` e quando usar cada.

### Exercício 14.3: RabbitMQ

**Projeto:** processamento de pedidos (API → fila → worker). **Desafios:**

- Transporte RMQ com filas duráveis e `ack` manual.
- Mensagem com falha vai para *dead letter queue*.
- Escale 3 workers consumindo a mesma fila.

### Exercício 14.4: Arquitetura com API Gateway

**Projeto:** mini e-commerce com serviços `users`, `products` e `orders`. **Desafios:**

- Um gateway HTTP único e 3 microsserviços, cada um com seu banco.
- Autenticação resolvida no gateway e propagada aos serviços.
- Tratamento de erros entre serviços (`RpcException` → HTTP correto).

### Exercício 14.5: Saga e consistência eventual

**Projeto:** fluxo de compra (reservar estoque → cobrar → confirmar). **Desafios:**

- Orquestração por eventos: se o pagamento falha, o estoque é devolvido (compensação).
- Idempotência dos consumidores (evento repetido não duplica efeito).
- Padrão *outbox* simplificado para não perder eventos.

---

# TEMA 15: GraphQL

### Exercício 15.1: Primeiro schema (code-first)

**Projeto:** catálogo de filmes. **Desafios:**

- `@nestjs/graphql` + Apollo; `@ObjectType`, `@Field`, `@Resolver`, `@Query`.
- Query de lista e busca por id.
- Use o playground para testar.

### Exercício 15.2: Mutations e Inputs

**Projeto:** lista de desejos. **Desafios:**

- `@Mutation` com `@InputType` e validação com `class-validator`.
- Tratamento de erros em GraphQL (mensagens e `extensions`).
- Update parcial e delete.

### Exercício 15.3: Relações e N+1

**Projeto:** blog (autor → posts → comentários). **Desafios:**

- `@ResolveField` para relações.
- Provoque e **resolva o N+1** com DataLoader.
- Paginação estilo *cursor* (connections).

### Exercício 15.4: Autenticação e autorização em GraphQL

**Projeto:** app de tarefas colaborativo. **Desafios:**

- Guard JWT adaptado ao contexto GraphQL (`GqlExecutionContext`).
- Decorator `@CurrentUser()` para GraphQL.
- Campos restritos por papel.

### Exercício 15.5: Subscriptions

**Projeto:** quadro de votação ao vivo. **Desafios:**

- `@Subscription` com `graphql-ws` e `PubSub`.
- Filtre eventos por argumento (ex.: só votos de uma enquete).
- Limite de profundidade/complexidade de queries para segurança.

---

# TEMA 16: Produção (logs, saúde, segurança, deploy)

### Exercício 16.1: Logging profissional

**Projeto:** API de pagamentos. **Desafios:**

- Logger estruturado (JSON) com `nestjs-pino` ou Winston.
- `correlationId` por requisição presente em todos os logs.
- Redação de dados sensíveis (senha, token, cartão).

### Exercício 16.2: Health checks e métricas

**Projeto:** qualquer API sua. **Desafios:**

- `@nestjs/terminus`: `/health` checando banco, Redis e disco.
- Endpoint `/metrics` no formato Prometheus (`prom-client`).
- Diferença entre *liveness* e *readiness* documentada.

### Exercício 16.3: Hardening de segurança

**Projeto:** API pública exposta na internet. **Desafios:**

- `helmet`, CORS restrito por ambiente, limite de tamanho de body.
- Proteção contra mass assignment e injeção (revise seus DTOs e queries).
- Checklist OWASP API Top 10 aplicado ao seu projeto, item por item.

### Exercício 16.4: Docker e docker-compose

**Projeto:** API + PostgreSQL + Redis. **Desafios:**

- Dockerfile *multi-stage* (imagem final pequena, usuário não-root).
- `docker-compose` com healthchecks e volumes.
- Migrations rodando automaticamente no deploy.

### Exercício 16.5: CI/CD

**Projeto:** repositório com pipeline. **Desafios:**

- GitHub Actions: lint → testes → build → imagem Docker.
- Deploy em um serviço (Railway, Render, Fly.io ou VPS).
- Variáveis de ambiente seguras e rollback documentado.

---

# TEMA 17: SUPER PROJETO FINAL

## Plataforma de Cursos Online: "LearnHub"

Usa **todos** os temas. Antes de começar, escreva um documento curto de arquitetura (diagrama de módulos, entidades, fluxos principais). Só então comece a codar. Entregue em **fases**, e a cada fase a API continua funcionando.

### Fase 1: Base (Temas 1, 2, 3, 4A)

- Módulos: `users`, `courses`, `lessons`, `categories`.
- CRUD completo com PostgreSQL, DTOs validados, relações (curso → aulas, curso ↔ categorias).

### Fase 2: Segurança (Temas 5, 6, 7)

- Registro, login, refresh token com rotação, verificação de e-mail, recuperação de senha.
- Papéis: `STUDENT`, `INSTRUCTOR`, `ADMIN`. Instrutor só edita seus cursos.
- Filtro global de exceções, interceptor de resposta padronizada, logger de requisições.

### Fase 3: Regras de negócio (Temas 4B, 8, 9)

- Matrícula em cursos, progresso por aula (concluída/não), certificado em PDF.
- Upload de vídeo/capa/materiais (S3 ou MinIO) e download protegido para matriculados.
- Configuração tipada por ambiente.
- Pagamento simulado com transação: cria matrícula e registra pagamento atomicamente.

### Fase 4: Performance e assíncrono (Tema 10)

- Cache da listagem pública de cursos (Redis) com invalidação.
- Fila de e-mails (boas-vindas, confirmação de matrícula, certificado).
- Job agendado que lembra alunos inativos há 7 dias.
- Eventos internos: `enrollment.created` dispara e-mail, atualiza estatísticas e libera acesso.
- Throttler nas rotas sensíveis.

### Fase 5: Tempo real e avaliações (Temas 13, 14)

- Chat/dúvidas por aula via WebSocket autenticado.
- Notificações em tempo real ao aluno.
- Serviço de certificados ou de notificações extraído como microsserviço (RabbitMQ ou Redis).

### Fase 6: Qualidade e documentação (Temas 11, 12)

- Swagger completo com auth e exemplos; API versionada (`/v1`).
- Testes unitários nos services principais e E2E nos fluxos: cadastro → login → matrícula → progresso.
- Cobertura mínima definida e verificada no CI.

### Fase 7: Produção (Tema 16)

- Logs estruturados, `/health`, `/metrics`, helmet, CORS.
- Docker multi-stage, docker-compose, pipeline de CI/CD e deploy real.

### Fase 8 (opcional): GraphQL (Tema 15)

- Camada GraphQL paralela só para o catálogo público, com DataLoader.

### Critérios de conclusão do super projeto

- [ ] Qualquer pessoa consegue rodar com um único comando (`docker compose up`).
- [ ] README com arquitetura, decisões e como testar.
- [ ] Todos os fluxos principais cobertos por testes E2E.
- [ ] Você consegue explicar, sem olhar, o caminho de uma requisição desde o middleware até a resposta.

---

## Checklist de progresso

Marque cada exercício ao concluir.

- [ ] **Tema 1:** 1.1 · 1.2 · 1.3 · 1.4 · 1.5
- [ ] **Tema 2:** 2.1 · 2.2 · 2.3 · 2.4 · 2.5
- [ ] **Tema 3:** 3.1 · 3.2 · 3.3 · 3.4 · 3.5
- [ ] **Tema 4A:** 4A.1 · 4A.2 · 4A.3 · 4A.4 · 4A.5
- [ ] **Tema 4B:** 4B.1 · 4B.2 · 4B.3 · 4B.4 · 4B.5
- [ ] **Tema 5:** 5.1 · 5.2 · 5.3 · 5.4 · 5.5
- [ ] **Tema 6A:** 6A.1 · 6A.2 · 6A.3 · 6A.4 · 6A.5
- [ ] **Tema 6B:** 6B.1 · 6B.2 · 6B.3 · 6B.4 · 6B.5
- [ ] **Tema 7:** 7.1 · 7.2 · 7.3 · 7.4 · 7.5
- [ ] **Tema 8:** 8.1 · 8.2 · 8.3 · 8.4 · 8.5
- [ ] **Tema 9:** 9.1 · 9.2 · 9.3 · 9.4 · 9.5
- [ ] **Tema 10:** 10.1 · 10.2 · 10.3 · 10.4 · 10.5
- [ ] **Tema 11:** 11.1 · 11.2 · 11.3 · 11.4 · 11.5
- [ ] **Tema 12:** 12.1 · 12.2 · 12.3 · 12.4 · 12.5
- [ ] **Tema 13:** 13.1 · 13.2 · 13.3 · 13.4 · 13.5
- [ ] **Tema 14:** 14.1 · 14.2 · 14.3 · 14.4 · 14.5
- [ ] **Tema 15:** 15.1 · 15.2 · 15.3 · 15.4 · 15.5
- [ ] **Tema 16:** 16.1 · 16.2 · 16.3 · 16.4 · 16.5
- [ ] **Super projeto final:** Fases 1 a 7

## Sugestão de ritmo

- **1 exercício a cada 1 ou 2 dias** (1 a 3 horas cada) é um ritmo sustentável.
- **Temas 1 a 7** são o núcleo: se o tempo for curto, priorize esses antes dos demais.
- **Temas 13 a 15** podem ser feitos em qualquer ordem depois do tema 10, conforme o seu interesse.
- Se travar num exercício por mais de 1 hora, anote a dúvida, avance para o próximo e volte depois.
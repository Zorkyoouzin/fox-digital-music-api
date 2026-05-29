# Fox Digital Music — API

API REST para gerenciamento de músicas desenvolvida em Node.js com MongoDB.

## Modificações

Ângelo Gabriel Menezes Barbosa

---

## Como Rodar

**Pré-requisitos:** Node.js e MongoDB instalados.

```bash
npm install
node server.js
```

A API estará disponível em: http://localhost:5000

---

## Endpoints

- `GET /api/music` — Lista todas as músicas
- `POST /api/music` — Cadastra uma nova música
- `GET /api/music/:id` — Busca uma música por ID
- `PUT /api/music/:id` — Atualiza uma música
- `DELETE /api/music/:id` — Exclui uma música

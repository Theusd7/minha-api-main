import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());


let tarefas = [];


app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});


app.post("/tarefas", (req, res) => {
  const { titulo, concluida } = req.body;

  if (!titulo) {
    return res.status(400).json({ erro: "Título é obrigatório" });
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo,
    concluida: concluida ?? false
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});


app.patch("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  const { titulo, concluida } = req.body;

  if (titulo !== undefined) tarefa.titulo = titulo;
  if (concluida !== undefined) tarefa.concluida = concluida;

  res.json({
    mensagem: "Tarefa atualizada com sucesso",
    tarefa
  });
});


app.delete("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = tarefas.findIndex(t => t.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  const removida = tarefas.splice(indice, 1)[0];

  res.json({
    mensagem: "Tarefa removida com sucesso",
    tarefa: removida
  });
});

app.listen(PORT, () => {
  console.log(`API de Tarefas rodando em http://localhost:${PORT}`);
});

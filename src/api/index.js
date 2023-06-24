const express = require("express");
const morgan = require("morgan");

const PORT = 8080;
const app = express();

// Adicionar o middleware para conversão do body
app.use(express.json());
app.use(morgan("dev"));

const clients = [];

app.get("/", (req, res) => {
    res.send("Client API is running");
});

app.get("/clients", (req, res) => {
    res.json(clients);
})

app.get("/clients/:id", (req, res) => {
    const client = clients.find(client => client.id === +req.params.id);

    if (!client) {
        res.status(404).json({ message: "cliente com o id informado não existe" });
        return;
    }

    res.json(client);
});

app.post("/clients", (req, res) => {
    const newClient = {
        ...req.body,
        id: (clients[clients.length - 1]?.id ?? 0) + 1
    };

    clients.push(newClient);

    res.status(201).json(newClient);
});

app.put("/clients/:id", (req, res) => {
    const index = clients.map(client => client.id).indexOf(+req.params.id);

    if (index === -1) {
        res.status(404).json({ message: "cliente com o id informado não existe" });
        return;
    }

    clients[index] = {
        ...clients[index],
        ...req.body
    };

    res.json(clients[index]);
});

app.delete("/clients/:id", (req, res) => {
    const index = clients.map(client => client.id).indexOf(+req.params.id);

    if (index === -1) {
        res.status(404).json({ message: "cliente com o id informado não existe" });
        return;
    }

    clients.splice(index, 1);

    res.status(204).json();
});

app.listen(PORT, () => {
    console.log("Client API está rodando na porta: "+PORT);
});
import { Divider, FloatButton, Typography, notification } from "antd";
import { ClientsTable } from "../components/ClientsTable";
import { useEffect, useState } from "react";
import { Client } from "../types/client";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

export function ListClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    function getClients() {
        axios.get("http://localhost:8080/clients")
            .then(res => {
                setClients(res.data);
            })
            .catch(() => notification.error({ 
                message: "Error", 
                description: "Ocorreu um erro ao buscar os clientes" 
            }))
            .finally(() => {
                setLoading(false);
            });
        }

    useEffect(() => {
        getClients();
    }, []);

    function removeClient(id: number) {
        axios.delete(`http://localhost:8080/clients/${id}`)
            .then(() => {
                const filteredClient = clients.filter(client => client.id !== id);

                setClients(filteredClient);
            })
            .catch(() => notification.error({ message: "Erro", description: "Não foi possível remover o cliente" }))
    }

    return (
        <div>
            <Typography.Title>Listagem de Clientes</Typography.Title>
            <Divider />
            <ClientsTable onRemoveClient={removeClient} dataSource={clients} loading={loading} />
            <FloatButton tooltip="Adicionar cliente" type="primary" shape="square" icon={<PlusOutlined />} />
        </div>
    );
}
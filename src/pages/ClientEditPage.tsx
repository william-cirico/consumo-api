import { Typography, message, notification } from "antd";
import { ClientForm } from "../components/ClientForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Client } from "../types/client";

export function ClientEditPage() {
    const { id } = useParams();
    const [client, setClient] = useState<Client>();

    function getClient(id: string) {
        axios.get(`http://localhost:8080/clients/${id}`)
            .then(res => {
                setClient(res.data);
            })
            .catch(() => notification.error({ message: "Erro", description: "Ocorreu um erro ao buscar o usuário" }))
    }

    useEffect(() => {
        if (id) {
            getClient(id);
        }
    }, [id]);

    const navigate = useNavigate();

    const [isUpdating, setIsUpdating] = useState(false);
    function handleEditClient(data: any) {
        setIsUpdating(true);

        axios.put(`http://localhost:8080/clients/${id}`, data)
            .then(() => {
                message.success("Cliente atualizado com sucesso!");
                navigate("/");
            })
            .catch(() => notification.error({ 
                message: "Falha", 
                description: "Não foi possível atualizar o cliente" 
            }))
            .finally(() => setIsUpdating(false));
    }

    return (
        <>
            <Typography.Title>Editar Cliente</Typography.Title>
            <ClientForm loading={isUpdating} initialValues={client} onFinish={handleEditClient} />
        </>
    );
}
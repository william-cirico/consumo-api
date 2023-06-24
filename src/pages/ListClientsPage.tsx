import { Divider, Typography } from "antd";
import { ClientsTable } from "../components/ClientsTable";

export function ListClientsPage() {
    return (
        <div>
            <Typography.Title>Listagem de Clientes</Typography.Title>
            <Divider />
            <ClientsTable />
        </div>
    );
}
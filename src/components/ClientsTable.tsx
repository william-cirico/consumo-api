import { Button, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Client } from "../types/client";
import dayjs from "dayjs";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

export function ClientsTable() {
    function renderSex(sex: string) {
        if (sex === "M") {
            return <Tag color="#108ee9">Masculino</Tag>
        } else {
            return <Tag color="pink">Feminino</Tag>
        }
    }

    const columns: ColumnsType<Client> = [
        {
            title: "Nome",
            dataIndex: "name",
            key: "name",
            sorter: true,
        },
        {
            title: "Sexo",
            dataIndex: "sex",
            key: "sex",
            render: renderSex
        },
        {
            title: "Data de nascimento",
            dataIndex: "birthdate",
            key: "birthdate",
            render: birthdate => dayjs(birthdate).format("DD/MM/YYYY")
        },
        {
            key: "actions",
            align: "center",
            render: () => <Space>
                <Button type="primary" title="visualizar detalhes do cliente" icon={<EyeOutlined />} />
                <Button type="primary" danger icon={<DeleteOutlined />} />
            </Space>
        }
    ]; 

    return (
        <Table 
            columns={columns}
            locale={{
                emptyText: "sem clientes cadastrados"
            }}
            dataSource={[
                { id: 1, name: "Will", sex: "M", birthdate: "2000-03-26", cep: "890000-000", city: "Blumenau", state: "SC"},
                { id: 2, name: "Ana", sex: "F", birthdate: "2000-03-26", cep: "890000-000", city: "Blumenau", state: "SC"}
            ]}
        />
    );
}
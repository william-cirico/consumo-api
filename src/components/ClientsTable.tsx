import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import dayjs from "dayjs";
import { Client } from "../types/client";

type Props = TableProps<any> & {
    onRemoveClient: (id: number) => void;
}

export function ClientsTable(props: Props) {
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
            render: (_, record) => <Space>
                <Button type="primary" title="visualizar detalhes do cliente" icon={<EyeOutlined />} />
                <Popconfirm 
                    title="Atenção" 
                    description="Tem certeza que deseja remover o cliente?"
                    okText="Sim"
                    cancelText="Não"
                    onConfirm={() => props.onRemoveClient(record.id)}
                >
                    <Button type="primary" danger icon={<DeleteOutlined />} />
                </Popconfirm>
            </Space>
        }
    ];

    return (
        <Table
            {...props}
            columns={columns}
            locale={{
                emptyText: "sem clientes cadastrados"
            }}
            rowKey={"id"}
        />
    );
}
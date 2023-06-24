import { Button, Col, Divider, Form, FormProps, Input, Row, notification } from "antd";
import { SexRadio } from "./SexRadio";
import { EnvironmentOutlined } from "@ant-design/icons";
import { LoadingInput } from "./LoadingInput";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = FormProps & {
    loading: boolean;
}

export function ClientForm({  loading, ...rest }: Props) {
    const [loadingCep, setLoadingCep] = useState(false);

    const [form] = Form.useForm();

    function onCEPBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
        setLoadingCep(true);

        const cep = e.target.value;

        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => {
                const cepData = res.data;

                form.setFieldsValue({
                    state: cepData.uf,
                    city: cepData.localidade
                });
            })
            .catch(() => notification.error({ message: "Erro", description: "Falha ao obter o CEP" }))
            .finally(() => setLoadingCep(false));
    }

    useEffect(() => {
        if (rest.initialValues) {
            form.setFieldsValue(rest.initialValues);
        }
    }, [rest])

    return (
        <Form
            layout="vertical"
            size="large"
            form={form}
            {...rest}
        >
            <Form.Item
                label="Nome"
                name="name"
                rules={[
                    { required: true, message: "nome é obrigatório" }
                ]}
            >
                <Input placeholder="digite o nome do cliente" />
            </Form.Item>
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Data de nascimento"
                        name="birthdate"
                        rules={[
                            { required: true, message: "data de nascimento é obrigatória" }
                        ]}
                    >
                        <Input type="date" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Sexo"
                        name="sex"
                        rules={[
                            { required: true, message: "sexo do cliente é obrigatório" }
                        ]}
                    >
                        <SexRadio />
                    </Form.Item>
                </Col>
            </Row>
            <Divider>Endereço</Divider>
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="CEP"
                        name="cep"
                        rules={[
                            { required: true, message: "cep é obrigatório" }
                        ]}
                    >
                        <LoadingInput onBlur={onCEPBlur} loading={loadingCep} addonAfter={<EnvironmentOutlined />} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Estado"
                        name="state"
                        rules={[
                            { required: true, message: "estado é obrigatório" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Cidade"
                        name="city"
                        rules={[
                            { required: true, message: "cidade é obrigatória" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button loading={loading} type="primary" block htmlType="submit">{!!rest.initialValues ? "Editar" : "Cadastrar"}</Button>
            </Form.Item>
        </Form>
    );
}
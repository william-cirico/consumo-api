import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <Result 
            status={404}
            title="Página não encontrada"
            extra={<Link to={"/"}><Button type="primary">Voltar a página inicial</Button></Link>}
        />
    );
}
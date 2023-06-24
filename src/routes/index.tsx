import { createBrowserRouter } from "react-router-dom";
import { ListClientsPage } from "../pages/ListClientsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ClientRegisterPage } from "../pages/ClientRegisterPage";
import { ClientEditPage } from "../pages/ClientEditPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ListClientsPage />,
        errorElement: <NotFoundPage />
    },
    {
        path: "clientes/cadastro",
        element: <ClientRegisterPage />
    },
    {
        path: "clientes/:id",
        element: <ClientEditPage />
    },
]);
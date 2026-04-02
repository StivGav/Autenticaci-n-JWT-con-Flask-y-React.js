import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Private = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) {
            navigate("/login");
        }
    }, [store.token]);

    return (
        <div className="container mt-5 text-center">
            {store.token ? (
                <div>
                    <h1>Página Privada</h1>
                    <p>Bienvenido. Solo tú puedes ver este contenido porque estás autenticado.</p>
                    <div className="alert alert-info">
                        Tu token activo es: {store.token.substring(0, 20)}...
                    </div>
                </div>
            ) : (
                <h1>Cargando...</h1>
            )}
        </div>
    );
};

import { useEffect } from "react";
import { userLogout } from "../../scripts/user/scripts";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            await userLogout();         
            navigate("/");
        };
        fetchData();
    }, [navigate]);
};
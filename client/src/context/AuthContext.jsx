import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const res = await api.get("/users/profile");

            setUser(res.data.user);

        } catch (err) {

            console.log(err);

            logout();

        }

        setLoading(false);

    };

    const login = async (email, password) => {

        const res = await api.post("/auth/login", {

            email,
            password,

        });

        localStorage.setItem("token", res.data.token);

        setUser(res.data.user);

        return res.data;

    };

    const register = async (data) => {

        const res = await api.post("/auth/register", data);

        return res.data;

    };

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                login,

                register,

                logout,

                fetchProfile,

                isAuthenticated: !!user,

            }}

        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);
import React, { useState, useCallback, useEffect } from "react";

const AuthContext = React.createContext({
    token: "",
    isDoctor: true,
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
});

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem("token");
    return {
        token: storedToken,
    };
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    const doctorData = localStorage.getItem("isDoctor")

    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);
    const [isDoctor, setisDoctor] = useState(doctorData === null ? false : doctorData === "doctor")
    const [id, setId] = useState(null)

    const userIsLoggedIn = !!token;

    useEffect(() => {
        if (userIsLoggedIn && id === null) {
            const getData = async () => {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}${isDoctor ? "doctor" : "user"}/details`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer : ${token}`
                    }
                });

                const res_data = await res.json()
                setId(isDoctor ? res_data.HealthCareID : res_data.HealthID)
            }

            getData()
        }
        else
            return;
        // eslint-disable-next-line
    }, [id])

    const logoutHandler = useCallback(() => {
        setToken(null);
        setisDoctor(false)
        setId(null)
        localStorage.removeItem("isDoctor")
        localStorage.removeItem("token");
    }, []);

    const loginHandler = (token, isDoctor, id) => {
        setToken(token);
        setisDoctor(isDoctor === "doctor")
        setId(id)
        localStorage.setItem("isDoctor", isDoctor);
        localStorage.setItem("token", token);
    };

    const contextValue = {
        isDoctor: isDoctor,
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        id: id,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
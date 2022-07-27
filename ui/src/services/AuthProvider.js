import React, { useEffect, useState } from 'react';
import Service from './Service';
const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Service.post('/user/me',{},false).then(res=>{
            setUser(res.data)
            setLoading(false)
        })
       return;
    }, [])

    return (
        <AuthContext.Provider value={{user}}>
            { !loading && children }
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};

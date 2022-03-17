///Router que verifica el estado de la sesión, en caso de que no esté iniciada, redirigirá al login. 
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { LoginScreen } from '../components/auth/LoginScreen';

export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth__box-container">
                <Switch>
                    <Route 
                        exact
                        path="/auth/:actualPage"
                        component={ LoginScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>

        </div>
    )
}

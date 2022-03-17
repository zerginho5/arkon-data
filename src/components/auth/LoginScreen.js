/*Pantalla inicial que aparece al entrar a la app. 
El método de inicio de sesión mediante cuenta de Google está habilitado usando un dispatch personalizado. 
En caso contrario, también es posible ingresar mediante un usuario personalizado creado desde la consola de Firebase. 

*/
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    startLoginEmailPassword,
    startGoogleLogin
} from '../../actions/auth';
import logo from '../../imgs/logo.png'
export const LoginScreen = () => {
    const dispatch = useDispatch();
    //Variable que muestra el state del reducer. 
    const { loading } = useSelector(state => state.ui);
    //Variable que muestra la contraseña como texto o como caracteres ocultos. 
    const [passShowedLogin, setPassShowedLogin] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //Método que hace el dispatch para comenzar con el inicio de sesión mediante usuario personalizado. 
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password));
    }
    //Método que hace el dispatch para comenzar con el inicio de sesión mediante cuenta de Google 
    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }
    return (
        <>
            <div className="container-fluid h-100">
                <div className="row text-center login-page">
                    <div className="col-md-12 login-form">
                        <div className="row">
                            <div className="col-md-12 login-form-header">
                                <img src={logo} className="img-fluid"
                                    alt="Task logo" width="50%" />
                            </div>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="form-outline mt-4 mb-4 text-center">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"
                                            style={{ color: 'white', background: '#0275d8', borderColor: '#0275d8' }}>
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>
                                    <input type="text"
                                        placeholder="Correo electrónico"
                                        name="email"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        className="form-control form-control-lg"
                                        autoComplete="off"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)} />
                                </div>

                            </div>
                            <div className="form-outline mb-3 text-center">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"
                                            style={{ color: 'white', background: '#0275d8', borderColor: '#0275d8' }}>
                                            <i className="fas fa-key"></i>
                                        </span>
                                    </div>
                                    <input
                                        type={passShowedLogin ? "text" : "password"}
                                        placeholder="Contraseña"
                                        name="password"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        className="form-control form-control-lg"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)} />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button"
                                            onClick={() => setPassShowedLogin(!passShowedLogin)}>
                                            <i className={passShowedLogin ? "fa fa-eye-slash" : "fa fa-eye"}
                                                aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center text-lg-start mt-4 mb-2 pt-2">
                                <button type="submit" className="btn btn-primary btn-large" disabled={loading}
                                    style={{ 'paddingLeft': '2.5rem', 'paddingRight': '2.5rem', fontSize: '18px' }}>
                                    Iniciar sesión
                                </button>
                            </div>
                            <div className="border-top"></div>
                            <div className="text-center text-lg-start mb-4 pt-2">
                                <button type="button" className="btn btn-secondary btn-large" onClick={handleGoogleLogin}
                                    style={{ 'paddingLeft': '2.5rem', 'paddingRight': '2.5rem', fontSize: '18px' }}>
                                    Cuenta de Google <i className="fab fa-google"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

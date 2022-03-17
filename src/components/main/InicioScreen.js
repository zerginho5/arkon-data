import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
export const InicioScreen = () => {
    const user = useSelector(state => state.auth);
    useEffect(() => {
        getTareas()
    }, [])
    const [tareas, setTareas] = useState([])
    useEffect(() => {
        timer.current = setInterval(() => {
            const idx = tareas.find((val) => val.estatus == 'I')
            if (idx) {
                console.log("actualizando", tareas)
                updateTarea({ ...idx, tiempoReg: idx.tiempoReg + 1 })
            }
        }, 60000);
        return () => {
            if (timer.current !== null) clearInterval(timer.current);
        };
    }, [tareas])
    const [desc, setDesc] = useState("")
    const [fechaFin, setFechaFin] = useState("")
    const [duracion, setDuracion] = useState("")
    const [tempObj, setTemp] = useState(undefined)
    const [adding, setAdding] = useState(false)
    const baseURL = "https://arkon-data-api-hyqab.ondigitalocean.app/api/tareas/"
    const getTareas = async () => {
        axios
            .get(baseURL + '?q=' + user.metadata)
            .then((res) => initCounter(res.data))
            .catch((err) => console.log(err));
    }
    const createTarea = async () => {
        if (tempObj) {
            const item = {
                ...tempObj,
                "descripcion": desc,
                "fechaFin": fechaFin,
                "duracion": duracion,
            }
            axios.put(baseURL + tempObj.id + "/", item)
                .then((res) => {
                    setAdding(false)
                    setTemp(undefined)
                    resetValues()
                    getTareas()
                });
        } else {
            const item = {
                "descripcion": desc,
                "fechaFin": fechaFin,
                "duracion": duracion,
                "tiempoReg": 0,
                "estatus": "P",
                "usuario": user.metadata
            }
            axios.post(baseURL, item)
                .then((res) => {
                    setAdding(false)
                    resetValues()
                    getTareas()
                });
        }

    }
    const timer = useRef(null);
    const updateTarea = async (val) => {
        const id = val.id
        delete val.id
        axios.put(baseURL + id + "/", val)
            .then((res) => getTareas());
    }
    const deleteTarea = async (val) => {
        const id = val.id
        console.log(id)
        axios.delete(baseURL + id + "/")
            .then((res) => getTareas());
    }
    const initCounter = (arrTareas) => {
        const idx = arrTareas.find((val) => val.estatus == 'I')
        if (idx) {

        }
        setTareas(arrTareas)
        return () => {
            if (timer.current !== null) clearInterval(timer.current);
        };
    }
    const resetValues = () => {
        setDesc("")
        setFechaFin("")
        setDuracion("")
    }
    const toggleEdit = (obj) => {
        setTemp(obj)
        setDesc(obj.descripcion)
        setFechaFin(obj.fechaFin)
        setDuracion(obj.duracion)
        setAdding(true)
    }
    const toggleAdd = () => {
        setTemp(undefined)
        setAdding(true)
        resetValues()
    }
    const toggleClose = () => {
        setTemp(undefined)
        setAdding(false)
        resetValues()
    }
    return (
        <>
            <div className="card m-3">
                <h5 className="card-header d-flex justify-content-between align-items-center">
                    Tareas
                    {adding ?
                        <button type="button" className="btn btn-sm btn-danger" onClick={() => toggleClose()}>
                            <i className="fas fa-times"></i>
                        </button>
                        :
                        <button type="button" className="btn btn-sm btn-success" onClick={() => toggleAdd()}>
                            <i className="fas fa-plus"></i>
                        </button>
                    }
                </h5>
                {adding ?
                    <div className="card-body row">
                        <div className="col-12 col-lg-6">
                            <label>
                                DESCRIPCION
                            </label>
                            <input
                                type="text"
                                className="form-control number font"
                                name="haplan"
                                onChange={(e) => {
                                    setDesc(e.target.value)
                                }}
                                value={desc}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="col-12 col-lg-6">
                            <label>
                                FECHA DE FIN
                            </label>
                            <input
                                type="date"
                                className="form-control number font"
                                name="haplan"
                                onChange={(e) => {
                                    setFechaFin(e.target.value)
                                }}
                                value={fechaFin}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="col-12 col-lg-6">
                            <label>
                                DURACIÓN
                            </label>
                            <div className="input-group mb-3">
                                <input
                                    type="number"
                                    className="form-control number font"
                                    name="haplan"
                                    onChange={(e) => {
                                        setDuracion(e.target.value)
                                    }}
                                    value={duracion}
                                    autoComplete="off"
                                    required
                                />
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        Minutos
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-center mt-2">
                            <button type="button" className="btn btn-primary btn-large" onClick={createTarea}
                                style={{ 'paddingLeft': '2.5rem', 'paddingRight': '2.5rem', fontSize: '18px' }}>
                                Añadir
                            </button>
                        </div>
                    </div>
                    :
                    <div className="card-body row">
                        {tareas.filter((val) => val.estatus == 'P' || val.estatus == 'I').length != 0 &&
                            <div className="col-12 col-md-6">
                                <h5 className="card-title">PENDIENTES</h5>
                                <ul className="list-group p-0 m-0">
                                    {tareas.filter((val) => val.estatus == 'P' || val.estatus == 'I').map((val, idx) =>
                                        <li key={idx}
                                            className={"list-group-item p-1 m-0 w-100" +
                                                (idx % 2 == 0 ? 'list-group-item-dark' : '')}>
                                            <div className='row'>
                                                <div className='col-12 text-center'>
                                                    <div className='d-flex justify-content-between align-items-center text-center'>
                                                        <div className="input-group mb-1">
                                                            {idx == 0 &&
                                                                <div className="input-group-prepend">
                                                                    <button className="btn btn-primary" type="button"
                                                                        onClick={() => updateTarea({ ...val, estatus: 'C' })}>
                                                                        <i className="fas fa-check"></i>
                                                                    </button>
                                                                </div>
                                                            }
                                                            <input type="text" disabled
                                                                className="form-control text-center" placeholder={val.descripcion}
                                                                aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                            {idx == 0 &&
                                                                <div className="input-group-append">
                                                                    <button className="btn btn-secondary" type="button"
                                                                        onClick={() => toggleEdit(val)}>
                                                                        <i className="fas fa-edit"></i>
                                                                    </button>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='col-12 d-flex justify-content-between align-items-center m-0'>
                                                    <div className="input-group">
                                                        {idx == 0 &&
                                                            <div className="input-group-prepend">
                                                                {val.estatus == 'P' ?
                                                                    <button className="btn btn-success" type="button"
                                                                        onClick={() => updateTarea({ ...val, estatus: 'I' })}>
                                                                        <i className="fas fa-play"></i>
                                                                    </button> :
                                                                    val.estatus == 'I' &&
                                                                    <>
                                                                        <button className="btn btn-danger" type="button"
                                                                            onClick={() => updateTarea({ ...val, estatus: 'P' })}>
                                                                            <i className="fas fa-stop"></i>
                                                                        </button>
                                                                        <button className="btn btn-warning"
                                                                            onClick={() => updateTarea({ ...val, tiempoReg: 0 })}
                                                                            type="button">
                                                                            <i className="fas fa-sync"></i>
                                                                        </button>
                                                                    </>
                                                                }

                                                            </div>
                                                        }
                                                        <input type="text" disabled
                                                            className="form-control text-center" placeholder={val.tiempoReg + ' min'}
                                                            aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                        <div className="input-group-append">
                                                            {idx != 0 &&
                                                                <button className="btn btn-secondary" type="button"
                                                                    onClick={() => toggleEdit(val)}>
                                                                    <i className="fas fa-edit"></i>
                                                                </button>}
                                                            <button className="btn btn-danger" type="button"
                                                                onClick={() => deleteTarea(val)}>
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        }
                        {tareas.filter((val) => val.estatus == 'C').length != 0 &&
                            <div className="col-12 col-md-6">
                                <h5 className="card-title">COMPLETADAS</h5>
                                <ul className="list-group p-0 m-0">
                                    {tareas.filter((val) => val.estatus == 'C').map((val, idx) =>
                                        <li key={idx}
                                            className={"list-group-item p-1 m-0 w-100" +
                                                (idx % 2 == 0 ? 'list-group-item-dark' : '')}>
                                            <div className='row'>
                                                <div className='col-12 text-center m-0 p-0'>
                                                    <p className='m-0 p-0'>{val.descripcion}</p>
                                                </div>
                                                <div className='col-12 d-flex justify-content-between align-items-center'>
                                                    <div className="input-group mb-3">
                                                        <input type="text" disabled
                                                            className="form-control text-center" placeholder={val.tiempoReg + ' min'}
                                                            aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        }
                    </div>
                }
            </div>
        </>
    )
}

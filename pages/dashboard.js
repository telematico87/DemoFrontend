import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../demo/service/ProductService';
import { LayoutContext } from '../layout/context/layoutcontext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UsuarioAppService } from '../services/UsuarioAppService';

const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

const Dashboard = () => {
    const [products, setProducts] = useState(null);
    const menu1 = useRef(null);
    const menu2 = useRef(null);
    const [lineOptions, setLineOptions] = useState(null);
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();
    const [usuarioApps, setUsuarioApps] = useState(new Array(12));

    let emptyUsuarioApp = {
        id: null,
        idApp: null,
        nombre: ''
    };

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        const usuarioAppService = new UsuarioAppService();
        var token=localStorage.getItem('token')?localStorage.getItem('token'):'';
        var usuario=localStorage.getItem('usuario')?localStorage.getItem('usuario'):'';

        usuarioAppService.getAppsUsuario(token,usuario).then((data)=>{
            setUsuarioApps(data);

        });

    }, []);

  

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    return (
        <div className="grid">
                            {usuarioApps!=null?           
                                usuarioApps.map((each, index) => {
                                                                                                    
                                        return (

                                            <div className="col-12 lg:col-6 xl:col-3">
                                            <div className="card mb-0"  style={{ height:'100px',width:'280px'}}>

                                            <div  >
                                                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ display: 'inline', float: 'left',width:'50px' ,height:'30px',margin:'0px 0px 0px 5px'}}>
                                                        <i className="pi pi-fw pi-check-square" />
                                                    </div>
                                                    <div className="flex align-items-center justify-content-left" style={{ display: 'inline', float: 'left',margin:'5px 0px 0px 10px' }} >
                                                        <span className=" text-500 font-medium justify-content-center">{each.nombre}</span>
                                                        
                                                    </div>
                                                    </div>   
                                                
                                               
                                            </div>
                                        </div>

                       
                                        )
                                    }):     <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
                                    <div className="flex flex-column align-items-center justify-content-center">
                                        <img src="/demo/images/access/logo-orange.svg" alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                                        <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%)' }}>
                                            <div className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style={{ borderRadius: '53px' }}>
                                                <div className="flex justify-content-center align-items-center bg-pink-500 border-circle" style={{ height: '3.2rem', width: '3.2rem' }}>
                                                    <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
                                                </div>
                                                <h1 className="text-900 font-bold text-5xl mb-2">Acceso denegado</h1>
                                                <div className="text-600 mb-5">No tiene permisos para ver esta pagina.</div>
                                                <img src="/demo/images/access/asset-access.svg" alt="Error" className="mb-5" width="80%" />
                                                <Button icon="pi pi-arrow-left" label="Logearse" text onClick={() => router.push('/')} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                                }                 



         
        </div>
    );
};

export default Dashboard;

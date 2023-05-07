import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { UsuarioService } from '../../services/UsuarioService';
import { Password } from 'primereact/password';
import { ClienteService } from '../../services/ClienteService';
import { RolService } from '../../services/RolService';
import {Calendar} from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { UsuarioAppService } from '../../services/UsuarioAppService';

const Usuarios = () => {
    let emptyUsuario = {
        id: 0,
        nombre: '',
        apellido_materno:'',
        apellido_paterno:'',
        email: '',
        password:'',
        imagenPerfil: '',
        fechaVencimiento: '',
        rol: '',
        cliente: '',
        idrol: 0,
        idcliente: 0
    };
   
   
    const [Usuarios, setUsuarios] = useState(null);
    const [UsuarioDialog, setUsuarioDialog] = useState(false);
    const [deleteUsuarioDialog, setDeleteUsuarioDialog] = useState(false);
    const [deleteUsuariosDialog, setDeleteUsuariosDialog] = useState(false);
    const [Usuario, setUsuario] = useState(emptyUsuario);
    const [selectedUsuarios, setSelectedUsuarios] = useState(null);
    const [correoOk, setcorreoOk] = useState(false);
    const [usuarioApps, setUsuarioApps] = useState(new Array(12));

    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [file, setFile] = useState();

    const [dropdownRoles, setdropdownRoles] = useState([/* your data */]);
    const [dropdownClientes, setdropdownClientes] = useState([/* your data */]);


    useEffect(() => {

     

        var token=localStorage.getItem('token')?localStorage.getItem('token'):'';
        const usuarioAppService = new UsuarioAppService();

        var usuario=localStorage.getItem('usuario')?localStorage.getItem('usuario'):'';

        usuarioAppService.getAppsUsuario(token,usuario).then((data)=>{
            setUsuarioApps(data);
        });

        /*combo clientes */
        const clienteService = new ClienteService();

        clienteService.getClientes(token).then(data => setdropdownClientes(data)); 

           /*combo clientes */
           const rolService = new RolService();

           rolService.getRoles(token).then(data => setdropdownRoles(data)); 
   
   
           
        const usuarioService = new UsuarioService();

        usuarioService.getUsuarios(token).then((data) => {
  
            setUsuarios(data);

            console.log(Usuarios);
            
        });
        
    
    }, []);

    const formatCurrency = (value) => {
        return '';
    };

    const openNew = () => {
        setUsuario(emptyUsuario);
        setSubmitted(false);
        setUsuarioDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUsuarioDialog(false);
    };

    const hideDeleteUsuarioDialog = () => {
        setDeleteUsuarioDialog(false);
    };

    const hideDeleteUsuariosDialog = () => {
        setDeleteUsuariosDialog(false);
    };



    async function postData() {
   
  

      }


    const saveUsuario = () => {
        setSubmitted(true);
        console.log(Usuario);

        
        if (Usuario.nombre.trim() && Usuario.email  && Usuario.password  && Usuario.fechaVencimiento && Usuario.idcliente && Usuario.idrol) { 
            
         
            
            if (Usuario.id) {

                const postData = {
                    id:Usuario.id,
                    nombre:Usuario.nombre,
                    email:Usuario.email,
                    password:Usuario.password,
                    imagenPerfil:file,
                    fechaVencimiento: Usuario.fechaVencimiento,
                    idCliente: Usuario.idcliente,
                    idRol: Usuario.idrol
                };

                let json=JSON.stringify(postData)
          
                const usuarioService = new UsuarioService();
                var token=localStorage.getItem('token')?localStorage.getItem('token'):'';
        

                const res=usuarioService.putData(json,token).then(data => {
                    
                    usuarioService.getUsuarios(token).then((data1) => {
                        setUsuarios(data1);
                    });       
                });      
               
                //setSeccions(_seccions);
                toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Usuario Actualizado', life: 3000 });
                setUsuarioDialog(false);
                setUsuario(emptyUsuario);  

        
            }else{
               
                const postData = {
                 
                    id:Usuario.id,
                    nombre:Usuario.nombre,
                    email:Usuario.email,
                    password:Usuario.password,
                    imagenPerfil:file,
                    fechaVencimiento: Usuario.fechaVencimiento,
                    idCliente: Usuario.idcliente,
                    idRol: Usuario.idrol
                };

                let json=JSON.stringify(postData)
     
                const usuarioService = new UsuarioService();
                var token=localStorage.getItem('token')?localStorage.getItem('token'):'';
        

                const res=usuarioService.postData(json,token).then(data => {
                    
                    usuarioService.getUsuarios(token).then((data1) => {
                        setUsuarios(data1);
                    });       
                });      
                

           
                toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Usuario Creado', life: 3000 });
                setUsuarioDialog(false);
                setUsuario(emptyUsuario);  

                //window.location.reload(false);
            
                
        

            }
        }
    };

    const editUsuario = (Usuario) => {
        console.log('Usuario');
        console.log(Usuario);


        setUsuario({ ...Usuario });

        setFile(Usuario.imagenPerfil);
        setUsuarioDialog(true);
    };

    const confirmDeleteUsuario = (Usuario) => {
        setUsuario(Usuario);
        setDeleteUsuarioDialog(true);
    };

    const deleteUsuario = () => {

        var token=localStorage.getItem('token')?localStorage.getItem('token'):'';        
        const usuarioService = new UsuarioService();

        const res =  usuarioService.deleteUsuario(Usuario.id,token).then(data => {
                    
            usuarioService.getUsuarios(token).then((data1) => {
                setUsuarios(data1);
            });       
        });      
        
        setDeleteUsuarioDialog(false);
        setUsuario(emptyUsuario);
        toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Usuario Borrado', life: 3000 });
        
   
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < Usuarios.length; i++) {
            if (Usuarios[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteUsuariosDialog(true);
    };

    const deleteSelectedUsuarios = () => {
        let _Usuarios = Usuarios.filter((val) => !selectedUsuarios.includes(val));
        setUsuarios(_Usuarios);
        setDeleteUsuariosDialog(false);
        setSelectedUsuarios(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuarios Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _Usuario = { ...Usuario };
        _Usuario['category'] = e.value;
        setUsuario(_Usuario);
    };

    const onInputChange = (e, name) => {
        
        const val = (e.target && e.target.value) || '';

     
        let _Usuario = { ...Usuario };
        _Usuario[`${name}`] = val;
        console.log(_Usuario);

        setUsuario(_Usuario);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _Usuario = { ...Usuario };
        _Usuario[`${name}`] = val;

        setUsuario(_Usuario);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />
                
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
               
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.code}
            </>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={`/demo/images/Usuario/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />
            </>
        );
    };

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.price)}
            </>
        );
    };

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    };

    const ratingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Reviews</span>
                <Rating value={rowData.rating} readOnly cancel={false} />
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>

            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editUsuario(rowData)} />
                <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteUsuario(rowData)} />
            </>
        );
    };

    let handleChangeCorreo = ( email ) => {
      
        // don't remember from where i copied this code, but this works.
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if ( re.test(email) ) {
            setcorreoOk(true);
        }
        else {
            setcorreoOk(false);
        }
    
    }


    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Administrar Usuarios</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    function fileUploadButton(){
        document.getElementById('fileButton').click();
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
    
      const handleChange = async (e) => {

        console.log(e.target.files);
        console.log(e.target.files[0]);
        const base64 =await  convertBase64(e.target.files[0]);
        console.log(base64);
        setFile(base64);
       

        
    }

    const UsuarioDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveUsuario} />
        </>
    );
    const deleteUsuarioDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUsuarioDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteUsuario} />
        </>
    );
    const deleteUsuariosDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUsuariosDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedUsuarios} />
        </>
    );

    return (
        <div className="grid crud-demo">
              {usuarioApps!=null?     
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={Usuarios}
                        selection={selectedUsuarios}
                        onSelectionChange={(e) => setSelectedUsuarios(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Usuarios"
                        globalFilter={globalFilter}
                        emptyMessage="No Usuarios found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                  
                        <Column field="id" header="id" sortable headerStyle={{ minWidth: '15rem' }}>d</Column>
                        <Column field="nombre" header="nombre" sortable  headerStyle={{ minWidth: '15rem' }}></Column>
                        
                        <Column field="apellido_paterno" header="Apellido Paterno" ></Column>
                        <Column field="apellido_materno" header="Apellido Materno"   headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="rol" header="Rol"   headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="email" header="Correo"   headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        </DataTable>

                    <Dialog visible={UsuarioDialog} style={{ width: '650px' }} header="Usuario " modal className="p-fluid" footer={UsuarioDialogFooter} onHide={hideDialog}>
                        {Usuario.image && <img src={`/demo/images/Usuario/${Usuario.image}`} alt={Usuario.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="p-fluid formgrid grid">
                        
                        <div className="p-fluid formgrid grid"  style={{ margin: '0px 0px 15px 0px' }}>
                                    <div className="field col-12 md:col-5"  >
                                        
                                                                <img 
                                                                className="foto_imagen"
                                                                src={file}
                                                                style={{ margin: '0px 0px 0px 45px' }}
                                                                width='200px'
                                                                height='200px'
                                                         
                                                                alt=""
                                                                />

                                            <input  id="fileButton" accept="image/*"  hidden type="file" onChange={(e) =>{handleChange(e);onInputChange(e.target.files[0],'imagenPerfil')}}/>
                                                                    <Button  id="btn-cargarfoto" style={{ width: '200px',margin: '0px 0px 0px 45px' }} label="Cargar Foto"  onClick={fileUploadButton} className="p-button-info mr-2 mb-2" />
                                    
                                        </div>

                                                <div className="field col-12 md:col-6" >
                                                        <div className="field col-12 md:col-12" >
                                                            <label htmlFor="name">Nombre</label>
                                                            <InputText id="nombre" placeholder="Nombres Completos" value={Usuario.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !Usuario.nombre })} />
                                                            {submitted && !Usuario.nombre && <small className="p-invalid">Nombre es requerido.</small>}
                                                            </div>
                                                            <div className="field col-12 md:col-12">
                                                        <label htmlFor="correo">Correo</label>
                                                        <InputText id="correo" placeholder="Email" value={Usuario.email} onChange={(e) => {onInputChange(e, 'email');handleChangeCorreo(Usuario.email)}} required autoFocus className={classNames({ 'p-invalid': submitted && !Usuario.email })} />
                                                        {submitted && !Usuario.email && <small className="p-invalid">El correo es requerido</small>}
                                                        {submitted && !correoOk && <small className="p-invalid">Introduzca correo válido</small>}
                                                        
                                                        </div>
                                                    <div className="field col-12 md:col-12">
                                                        <label htmlFor="name">Password</label>
                                                        <Password  placeholder="Password" value={Usuario.password} onChange={(e) => { onInputChange(e, 'password')}} toggleMask />
                                                        {submitted && !Usuario.password && <small className="p-invalid">El password es requerido</small>}
                                                    </div>
                                                </div>

                            </div>                   
                              

                            

                        
                            <div className="field col-12 md:col-3" >
                                            <label htmlFor="address">Fecha Vencimiento</label>
                                                    <Calendar inputId="calendar" 
                                                    dateFormat="yy-mm-dd"
                                                    value={Usuario.fechaVencimiento!=''?new Date(Usuario.fechaVencimiento):new Date()} 
                                                    onChange={(e) => onInputChange(e, 'fechaVencimiento')} 
                                                    className={classNames({ 'p-invalid': submitted && !Usuario.fechaVencimiento })} />
                                                    {submitted && !Usuario.fechaVencimiento && <small className="p-invalid">Fecha de Vencimiento es requerido.</small>}
                                                                       
                                            </div> 

                            <div className="field col-12 md:col-4" >
                                <label htmlFor="role">Roles</label>
                                <Dropdown id="role" filter value={Usuario.idrol} onChange={(e) => onInputChange(e, 'idrol')}  options={dropdownRoles} optionLabel="name" placeholder="Seleccionar Docente" className={classNames({ 'p-invalid': submitted && !Usuario.idrol })}>

                                </Dropdown>
                                {submitted && !Usuario.idrol && <small className="p-invalid">El rol es requerido.</small>}
                
                            </div>
                                            
                            <div className="field col-12 md:col-5" >
                                <label htmlFor="address">Cliente</label>
                                <Dropdown id="tipoDocumento" filter value={Usuario.idcliente} onChange={(e) => onInputChange(e, 'idcliente')}  options={dropdownClientes} optionLabel="name" placeholder="Seleccionar Cliente" className={classNames({ 'p-invalid': submitted && !Usuario.idcliente })}>

                                </Dropdown>
                                {submitted && !Usuario.idcliente && <small className="p-invalid">Cliente es requerido.</small>}
                
                            </div>
                            <div className="formgrid grid">
                              
                            </div>
                            </div>
                    </Dialog>

                    <Dialog visible={deleteUsuarioDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsuarioDialogFooter} onHide={hideDeleteUsuarioDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Usuario && (
                                <span>
                                    Desea borrar el usuario<b>{Usuario.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUsuariosDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsuariosDialogFooter} onHide={hideDeleteUsuariosDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Usuario && <span>Are you sure you want to delete the selected Usuarios?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>:     <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
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

export default Usuarios;

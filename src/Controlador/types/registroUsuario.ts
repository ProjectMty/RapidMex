export interface User {
    //   id?: number;
    contrasena: string;
    correo: string;
    nombre: string;
    apaterno: string;
    amaterno: string;
    telefono: string;
    empresa: string;
};

export interface login {
    correo: string;
    contrasena: string;
    
}

export interface Dest{
    AMaterno: string;
    APaterno: string;
    Calle: string;
    CodigoPostal: string;
    Colonia: string;
    Estado: string;
    IdDestinatario: number;
    Municipio: string;
    Nombre: string;
    NumExterior: string;
    Pais: string;
    Referencia: string;
    Telefono: string;
    idCliente: number;
    activo: boolean;
}


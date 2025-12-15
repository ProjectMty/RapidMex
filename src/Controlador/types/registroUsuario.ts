export interface User {
    //   id?: number;
    usuario: string;
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
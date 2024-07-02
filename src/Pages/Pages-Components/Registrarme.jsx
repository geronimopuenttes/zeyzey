import { useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { setDoc, doc, collection } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Registrarme.css";

export const Registrarme = () => {
    // Router navigation
    const navigate = useNavigate();

    // Form validation schema
    const schema = yup.object().shape({
        Email: yup.string().required(),
        NombreUsuario: yup.string().required(),
        Password: yup.string().required(),
    });

    // React Hook Form
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const [user] = useAuthState(auth);

    useEffect(() => {
        // If user is already logged in, redirect to another page
        if (user) {
            navigate("/terreno");
        }
    }, [user, navigate]);

    // Form submission handler to create user name
    const createUserName = async (data) => {
        try {
            // Create a document reference with the user's email as the document ID
            const userDocRef = doc(collection(db, "Usuarios"), data.Email);

            // Set the document with the specified ID
            await setDoc(userDocRef, {
                UserName: data.NombreUsuario,
            });

            // Call the registrar function to create the authentication user
            await registrar(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    // Function to register user
    const registrar = async (data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.Email, data.Password);
            navigate("/terreno"); // Redirect to profile page after successful registration
        } catch (error) {
            console.log(error.message);
        }
    };
    const iniciarSesion = () => {
        navigate("/inicio");
    }
    return (
        <div className="Registro">
            <div className="Registrarme">
                <h1 className="Titulo">Registrarme</h1>
                <form onSubmit={handleSubmit(createUserName)} className="Fields">
                    <div className="Forma">
                        <div className="Fields">
                            <input placeholder="Nombre De Usuario" {...register("NombreUsuario")} className="Field" />
                            <input placeholder="Email" {...register("Email")} className="Field" />
                            <input placeholder="Contraseña" type="password" {...register("Password")} className="Field" />
                        </div>
                        <div className="Fields">
                            <input type='submit' className="Boton" />
                        </div>
                    </div>
                </form>
                <div className="Fields">
                    <h3 className="Titulo">Ya tengo cuenta</h3>
                    <button onClick={iniciarSesion} className="Boton">Iniciar Sesion</button>
                </div>
            </div>
        </div>
    );
};

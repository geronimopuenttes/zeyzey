import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { auth } from "./firebase-config";
import { db } from './firebase-config';
import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { Navbar } from './Componentes/Navbar';
import { useAuthState } from "react-firebase-hooks/auth";

// Import your pages
import { Home } from "./Pages/Home";
import { IniciarSesion } from "./Pages/Pages-Components/IniciarSesion";
import { Registrarme } from "./Pages/Pages-Components/Registrarme";
import { Terreno } from "./Pages/Terreno";
import { CrearVivero } from './Pages/CrearVivero';
import { Viveros } from './Pages/Viveros';
import { Pruebas } from "./Componentes/Pruebas";
import { Vivero } from './Componentes/Vivero';
import { Perfil } from './Pages/Perfil';
import { Notificaciones } from './Componentes/Notificaciones';

// Create context
export const AppContext = createContext();

function App() {
  // Firestore collection reference
  const postRef = collection(db, "Usuarios");

  // State variables
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState("");
  const [selectedVivero, setSelectedVivero] = useState(false);
  const [whichVivero, setWhichVivero] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [cantidadFilas, setCantidadFilas] = useState(0);
  const [cantidadColumnas, setCantidadColumnas] = useState(0);
  const [cuadricula, setCuadricula] = useState([]);
  const [actNotificaciones, setActNotificaciones] = useState(false);
  const [showNotificaciones, setShowNotificaciones] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // State to track data fetching
  const [viveroAgua, setViveroAgua] = useState([]);
  const [viveroMan, setViveroMan] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchUserName = async () => {
      try {
        // Reference to the document with the user's email as ID
        const docRef = doc(db, "Usuarios", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCurrentUser(data.UserName); // Set the currentUser to the UserName from the document
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserName();
  }, [user]);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        if (!user) {
          console.error('User not authenticated');
          return;
        }

        // Reference the collection using the user's email
        const collectionRef = collection(db, user.email);
        const querySnapshot = await getDocs(collectionRef);

        const today = new Date();
        const viveroAguaTemp = [];
        const viveroManTemp = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const fechaAgua = data.FechaAgua ? data.FechaAgua.toDate() : null;
          const fechaMantenimiento = data.FechaMantenimiento ? data.FechaMantenimiento.toDate() : null;

          if (fechaAgua) {
            const dayDiffAgua = Math.ceil((today - fechaAgua) / (1000 * 60 * 60 * 24));
            if (dayDiffAgua >= 3) {
              viveroAguaTemp.push(doc.id);
            }
          }

          if (fechaMantenimiento) {
            const dayDiffMan = Math.ceil((today - fechaMantenimiento) / (1000 * 60 * 60 * 24));
            if (dayDiffMan >= 7) {
              viveroManTemp.push(doc.id);
            }
          }
        });

        setViveroAgua(viveroAguaTemp);
        setViveroMan(viveroManTemp);
        setDataFetched(true);
      } catch (error) {
        console.error('Error fetching collection data:', error);
      }
    };

    if (user) {
      fetchCollectionData();
    }
  }, [user]); // Only run this effect when `user` changes

  return (
    <div className="App">
      {/* Provide context to the application */}
      <AppContext.Provider value={{ setSelectedVivero, currentUser, selectedVivero, whichVivero, setWhichVivero, setCheckedItems, checkedItems, cantidadFilas, cantidadColumnas, setCantidadColumnas, setCantidadFilas, cuadricula, setCuadricula, actNotificaciones, setActNotificaciones, dataFetched, setDataFetched, viveroAgua, setViveroAgua, viveroMan, setViveroMan }}>
        <Router basename="/zeyzey">
          <Navbar />
          <Routes>
            {/* Define routes for different pages */}
            <Route path="/" element={<Home />} />
            <Route path="/inicio" element={<IniciarSesion />} />
            <Route path="/registro" element={<Registrarme />} />
            <Route path="/terreno" element={<Terreno />} />
            <Route path="/crearvivero" element={<CrearVivero />} />
            <Route path="/vivero" element={<Vivero />} />
            <Route path="/viveros" element={<Viveros />} />
            <Route path="/pruebas" element={<Pruebas />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import DoubbleBubble from "../components/spinner/DoubleBubble";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {

  const dispatch = useDispatch();

  // espera de para verificar si el usuario esta logueado o no
  const [checking, setChecking] = useState(true);
  // user logged
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged( async(user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        // carga las notas del usuario
        dispatch(startLoadingNotes(user.uid));
        
      } else {
        setIsLoggedIn(false);
      }
  
      setChecking(false);
    });
  }, [dispatch, setChecking,setIsLoggedIn]);

  if (checking) {
    return(
      <div>
        {/* Pantalla de carga */}
        <DoubbleBubble speed={5} customText={'Loading'}/>
      </div>
    )
  };

  return (
    <BrowserRouter>

      <Routes>
        
          <Route path="/auth/*" element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <AuthRouter />
            </PublicRoute>
          } />
        
        <Route path="/*" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <JournalScreen />
          </PrivateRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
};

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {

  const dispatch = useDispatch();

  // espera de para verificar si el usuario esta logueado o no
  const [checking, setChecking] = useState(true);
  // user logged
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking,setIsLoggedIn]);

  if (checking) {
    return (
      <h1>Espere...</h1>
    )
  }

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

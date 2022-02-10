import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from 'react-loading-screen';
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
      setInterval(() => {
        setChecking(false);
      }, 500);      
    });
  }, [dispatch, setChecking,setIsLoggedIn]);


  return (
    <BrowserRouter>

      { checking &&
        <LoadingScreen
          loading={true}
          bgColor='#f1f1f1'
          spinnerColor='#8F497B'
          textColor='#676767'
          text='Loading...'
        />
      }

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

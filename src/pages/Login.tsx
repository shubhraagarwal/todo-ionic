/* eslint-disable no-restricted-globals */
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { loginUser, getCurrentUser, firestore, auth } from '../firebaseConfig';
import { toast } from '../toast';
import AuthRoute from '../components/AuthRoute';
import Home from './Home';
const Login: React.FC = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const history = useHistory();
  async function login() {
    // const res = await loginUser(username, password);
    // if (!res) {
    //   toast('error');
    //   return false;
    // } else {
    //   toast('Success');
    //   getCurrentUser().then((user) => {
    //     window.location.href = '/home';
    //   });
    // }
    setAuthenticating(true);

    auth
      .signInWithEmailAndPassword(username, password)
      .then((result) => {
        history.push(`/home/${auth.currentUser.uid}`);
      })
      .catch((error) => {
        auth.createUserWithEmailAndPassword(username, password);
        login();
      });
    return (
      <AuthRoute>
        {' '}
        <Redirect to={`/home${auth.currentUser.uid}`} />{' '}
      </AuthRoute>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login!!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          placeholder="Username"
          onIonChange={(e: any) => setusername(e.target.value)}
          className="ion-padding"
        />
        <IonInput
          placeholder="Password"
          onIonChange={(e: any) => setpassword(e.target.value)}
          className="ion-padding"
          type="password"
        />
        <IonButton onClick={login} className="ion-padding">
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;

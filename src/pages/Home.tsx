import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonList,
} from '@ionic/react';
import { getCurrentUser, firestore, auth, functions } from '../firebaseConfig';
import './Home.css';
import { Link, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import { useEffect } from 'react';
import AuthRoute from '../components/AuthRoute';
import { toast } from '../toast';

const Home = () => {
  // const addTodo = functions.httpsCallable('addTodo');
  const [todo, settodo] = useState('');
  const [updateemail, setupdateemail] = useState('');
  const [todos, setTodos] = useState([]);

  const onSubmitTodo = (e: any) => {
    e.preventDefault();

    firestore.collection(`users/${auth.currentUser.uid}/todos`).add({
      todo: todo,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      completed: false,
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  // function updateTodo(id: any, completed: boolean) {
  //   firestore.collection(`users/${auth.currentUser.uid}/todos`).doc(id).update({
  //     completed: !completed,
  //   });
  // }

  function deleteTodo(id: any) {
    firestore
      .collection(`users/${auth.currentUser.uid}/todos`)
      .doc(id)
      .delete();
  }

  function getTodos() {
    firestore
      .collection(`users/${auth.currentUser.uid}/todos`)
      .onSnapshot(function (querySnapshot) {
        setTodos(
          querySnapshot.docs.map((doc: any) => ({
            // eslint-disable-next-line no-labels
            id: doc.id,
            todo: doc.data().todo,
          }))
        );
      });
  }

  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
  }

  function updateEmail() {
    user.updateEmail(updateemail);
    toast('Email Updated Successfully');
  }
  return (
    <IonPage className="home">
      <IonHeader>
        <IonToolbar>
          <IonTitle>To-Do</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form className="ion-padding" onSubmit={onSubmitTodo}>
          <IonItem>
            <label>What task are you upto?</label>
            <input
              value={todo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                settodo(e.target.value)
              }
            />
          </IonItem>
          <IonButton className="ion-margin-top mx-auto" type="submit">
            Add To-do
          </IonButton>
        </form>
        {todos.map((todo) => (
          <IonList className="ion-list">
            <IonItem>
              <IonLabel key={todo.id}>{todo.todo}</IonLabel>

              <IonButton onClick={() => deleteTodo(todo.id)}>Delete</IonButton>
            </IonItem>
          </IonList>
        ))}
      </IonContent>
      <IonContent>
        <IonList className="ion-list">
          <IonItem>{email}</IonItem>
          <form>
            <input
              value={updateemail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setupdateemail(e.target.value)
              }
            />
            <IonButton onClick={() => updateEmail()}>Update Email</IonButton>
          </form>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;

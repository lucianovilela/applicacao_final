import React, { createContext } from "react";
const ContextAuth = createContext();
import * as firebase from "firebase";

export default ContextAuth;
const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          //console.log('action.user', action.user)
          return {
            ...prevState,
            isSignout: false,
            user: action.user,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null,
          };
        case "RESTORE_USER_INFO":
          console.log("RESTORE_USER_INFO", action);
          return {
            ...prevState,
            userInfo: [...action.payload],
          };

        case "RESTORE_USER_INFO":
          console.log("RESTORE_USER_INFO", action);
          return {
            ...prevState,
            horasLivres: [...action.payload],
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      user: {},
      userToken: null,
      userInfo: [],
      horasLivres: [],
    }
  );

  const listenerUser = (user) => {
    console.log("onChangeUser", user);
    dispatch({ type: "SIGN_IN", user: user });
    firebase
      .firestore()
      .collection("registros_tempo")
      .doc(user.uid)
      .get()
      .then((snap) => {
        console.log("dentro do get", snap.data());
        dispatch({
          type: "RESTORE_USER_INFO",
          payload: [...snap.data().userInfo],
        });
      });
  };

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    console.log("setting onChangeUser");
    const bootstrapAsync = async () => {
      firebase.auth().onAuthStateChanged(listenerUser);
    };
    bootstrapAsync();
  }, []);

  const action = React.useMemo(() => ({
    signIn: async ({ email, password }) => {
      ///console.log('signIn:', email, password)

      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (result) =>
          dispatch({ type: "SIGN_IN", user: result.user })
        );
    },
    signOut: async () => {
      return firebase
        .auth()
        .signOut()
        .then(async (result) => dispatch({ type: "SIGN_OUT" }));
    },
    signUp: async ({ email, password }) => {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (result) =>
          dispatch({ type: "SIGN_IN", user: result.user })
        );
    },
    saveUserInfo: async (obj) => {
      console.log(obj, state.user);
      firebase
        .firestore()
        .collection("registros_tempo")
        .doc(state.user.uid)
        .set({ userInfo: [...obj] })
        .then((error) => {
          if (!error) {
            dispatch({ type: "RESTORE_USER_INFO", payload: obj });
          }
          console.log(error);
        });
    },

    getHorasLivres: async (data) => {
      firebase
        .firestore()
        .collection("horas_livres")
        .get()
        .then((snap) => {
          snap.forEach((item) => {
            console.log(item.data().horas);
            dispatch({
              type: "GET_HORAS_FREE",
              payload: item.data().horas,
            });
          });
        });
    },
  }));
  return (
    <ContextAuth.Provider value={{ action, state }}>
      {children}
    </ContextAuth.Provider>
  );
};

export { AuthProvider };

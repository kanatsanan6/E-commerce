import { useState } from "react";
import "./LoginPage.css";
import { auth, database } from "../../firebase/firebase";
import { child, get, ref, set } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../StateProvider/StateProvider";

function LoginPage() {
  const navigate = useNavigate();

  const [showRegis, setShowRegis] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Add to Basket
  const mergeBasket = (user) => {
    // Get basket from localStorage
    let localBasket = [];
    if (localStorage.length !== 0) {
      localBasket = JSON.parse(localStorage.getItem("basket"));
    }
    // Get existed basket from database
    const dbRef = ref(database);
    get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
      let dbBasket = [];
      if (snapshot.val() !== null) {
        if (snapshot.val().basket !== undefined)
          dbBasket = snapshot.val().basket;
      }
      // Merge basket
      const newBasket = dbBasket.concat(localBasket);
      // Update to database
      set(ref(database, `users/${user.uid}`), {
        username: user.displayName,
        email: user.email,
        basket: newBasket,
      });
    });
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/");
        mergeBasket(userCredential.user);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  const register = (username, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        login(email, password);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  return (
    <div className="loginpage">
      {showRegis ? (
        <div>
          <p>NAME:</p>
          <input
            type="text"
            placeholder="Firstname Lastname"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
      ) : null}

      <div>
        <p>EMAIL:</p>
        <input
          type="email"
          placeholder="example@test.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div>
        <p>PASSWORD:</p>
        <input
          type="password"
          placeholder="Password@111"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      {showRegis ? (
        <>
          <button onClick={() => register(username, email, password)}>
            Register
          </button>
          <div>
            <h4>
              Already have an account?
              <a onClick={() => setShowRegis(false)}> Click here to Login</a>
            </h4>
          </div>
        </>
      ) : (
        <>
          <button onClick={() => login(email, password)}>Login</button>
          <div>
            <p>
              Don't have an account?
              <a onClick={() => setShowRegis(true)}> Click here to Register</a>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default LoginPage;

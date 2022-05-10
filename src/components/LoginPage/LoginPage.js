import { useState } from "react";
import "./LoginPage.css";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [showRegis, setShowRegis] = useState(false);

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(`userLogin: ${userCredential.user.email}`);
        setUser("");
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  const register = (user, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: user,
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
            onChange={(e) => setUser(e.target.value)}
            value={user}
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
          <button onClick={() => register(user, email, password)}>Register</button>
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

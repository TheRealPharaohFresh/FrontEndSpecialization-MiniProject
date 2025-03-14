import { useState, useEffect, FormEvent } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../config/firebaseConfig";
import { db } from "../config/firebaseConfig";
import styles from "../styles/Login.module.css";
import Register from "../components/Register";
import DisplayData from "../components/DisplayData";  
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      await fetchUserData(userCredential.user.uid);
      alert("Login successful!");
      <Navigate to='/' replace/>;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


 
  const fetchUserData = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setUserData(userDoc.data() as { name: string; email: string; age?: number });
      } else {
        console.log("No user data found!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      alert("Logged out!");
    } catch (err: any) {
      console.error("Logout error:", err.message);
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserData(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      {user ? (
        <div className={styles.userInfo}>
          <h2>Welcome, {userData?.name || "User"}!</h2>
          <p>Email: {userData?.email}</p>
          {userData?.age && <p>Age: {userData.age}</p>}
          <button className={styles.button} onClick={handleLogout}>Logout</button>

          <DisplayData />
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}

      {!user && <Register />}
    </div>
  );
};

export default Login;


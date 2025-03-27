import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/user/user-hello")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return (
    <div>
      <h1>Conectando papu</h1>
      {user ? <p>Username: {user.message}</p> : <p>Loading...</p>}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/users/123")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return (
    <div>
      <h1>Welcome to Chismebook</h1>
      {user ? <p>Username: {user.username}</p> : <p>Loading...</p>}
    </div>
  );
}

export default App;

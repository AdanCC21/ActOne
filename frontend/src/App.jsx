import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/story-hello")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      {user ? <h1 className="text-green-400">Message: {user.message}</h1> : <p className="text-red-600">Loading...</p>}
    </div>
  );
}

export default App;

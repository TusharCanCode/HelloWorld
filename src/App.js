import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Context/AuthContext";
import Search from "./pages/search/Search";
import { getUser } from "./API"

function App() {
  const { user, dispatch } = useContext(AuthContext);
  useEffect(() => {
    getUser(dispatch);
  }, [])
  return (
    <>
      <Router>
        {user ?
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={user ? <Navigate to="/" /> : <Login />} />
            <Route exact path='/chat' element={<Chat />} />
            <Route path='/profile/:userID' element={<Profile />} />
            <Route path='/search/:userID' element={<Search />} />
          </Routes>
          : <Login />}
      </Router>
    </>
  );
}

export default App;

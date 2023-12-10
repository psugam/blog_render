import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route , Link} from "react-router-dom";
import {Home} from './pages/Home.jsx'
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { PostDetails } from "./pages/PostDetails.jsx";
import { CreatePost } from "./pages/CreatePost.jsx";
import { EditPage } from "./pages/EditPage.jsx";
import {ProfilePage } from './pages/ProfilePage.jsx'
import {UserContextProvider} from './contexts/UserContext.jsx';
import { UpdatePost } from "./pages/UpdatePost.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserContextProvider>
        <Routes>
        <Route path='/' element={<Home/>} />  
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/posts/post/:id' element={<PostDetails/>}/>
        <Route path='/write' element={<CreatePost/>}/>
        <Route path="/edit/:id" element={<EditPage/>}/>
        <Route path='/profile/:id' element={<ProfilePage />} />
        <Route path='update/:id' element={<UpdatePost/>}/>
        <Route path="/error/login" element={
        <>
        <Navbar/>
        <div className="h-[50vh] flex flex-col justify-center items-center text-center font-medium text-2xl font-serif space-y-10">
        <p>There was some error in logging in . Please try again with correct credentials.
        </p>
          <h3 className="bg-slate-300 p-2 border-r-2 rounded-2xl hover:bg-slate-400"
          ><Link to='/login'>Go back</Link></h3>
        
        </div>
        <Footer />
        </>
        }
        />
        <Route path="/error/register" element={
        <>
        <Navbar/>
        <div className="h-[50vh] flex flex-col justify-center items-center text-center font-medium text-2xl font-serif space-y-10">
        <p>There was some error in registering . Please try again with correct credentials.
        </p>
          <h3 className="bg-slate-300 p-2 border-r-2 rounded-2xl hover:bg-slate-400"
          ><Link to='/register'>Go back</Link></h3>
        
        </div>
        <Footer />
        </>
        }
        />
        </Routes>
        </UserContextProvider>

    </>
  );
}

export default App;

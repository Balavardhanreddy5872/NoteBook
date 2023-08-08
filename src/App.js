import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/Notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null)

  const showalert = (type, msg) => {
    setAlert({
      type: type,
      msg: msg
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);

  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              < Route path="/" element={<Home  showAlert={showalert}/>}></Route>
              < Route path="/about" element={<About />}></Route>
              < Route path="/login" element={<Login showAlert={showalert} />}></Route>
              < Route path="/signup" element={<Signup  showAlert={showalert}/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>

    </>
  );
}

export default App;

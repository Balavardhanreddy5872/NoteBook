import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let navigate  =  useNavigate();
    const handleLogout =() =>{
       localStorage.removeItem('token');
       navigate("/login")
    }
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname)
        // eslint-disable-next-line
    }, [location]);
    return (
        <>
        {/* Navbar  */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" style={{ position: 'sticky' }}>
                <div className="container-fluid">
                    <img style={{ width: '20px', margin: '5px' }} src='https://downloadr2.apkmirror.com/wp-content/uploads/2023/07/12/64b2507034eb4_com.eterno-384x384.png' alt='DailyHunt' />
                    <Link className="navbar-brand" to='/'>NoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex" >
                            <Link type="button" className="btn btn-primary mx-1" to='/login'>Login</Link>
                            <Link type="button" className="btn btn-primary mx-1" to = '/signup'>SignUp</Link>
                        </form>:<form className="d-flex" >
                            <Link type="button" className="btn btn-primary mx-3" to='/userdetails'>Deatils</Link>
                            <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
                        </form>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

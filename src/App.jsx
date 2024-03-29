import { React, useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar.jsx";
import Inbox from "./Components/inbox/Inbox.jsx";
import PendingConnections from "./Components/pending-connections/PendingConnections.jsx";
import MyProfile from "./Components/profile/MyProfile.jsx";
import Landing from "./Components/Landing/Landing.jsx";
import Discover from "./Components/Discover/Discover.jsx";
import CreateUserForm from "./Components/Landing/CreateUserForm";
import Login from "./Components/Landing/Login";
import LandingContext from "./context/LandingContext";
import InboxContext from "./context/InboxContext.js";
import "../src/ComponentStyles/CreateSlashLogin.css";

function App() {

    const { login, buttonPressed, userData } = useContext(LandingContext)
    const { threads, fetchAllUserThreads, profiles, handleDisplayingThreads } = useContext(InboxContext)

    // useEffect(() => {
    //     if (userData) {
    //         return fetchAllUserThreads()
    //     }
    // }, [login, userData])

    useEffect(() => {
        if (userData) {
            fetchAllUserThreads()

            const interval = setInterval(() => {
                console.log('fetched threads')
                fetchAllUserThreads()
            }, 5000)

            return () => clearInterval(interval)
        }
    }, [login, userData])

    useEffect(() => {
        handleDisplayingThreads()
    }, [threads ? threads.length : null])



    if (!login) {
        if (!buttonPressed) return (<Landing />)
        else if (buttonPressed === 'createUserButton') return (<CreateUserForm />)
        else if (buttonPressed === 'loginButton') return (<Login />)
    }


    else {

        return (

            <div className='App-container'>

                <Navbar userData={userData} />

                <Routes>

                    <Route path='/' element={<Discover />} />
                    <Route path='/inbox' element={<Inbox />} />
                    <Route path='/connections' element={<PendingConnections />} />
                    <Route path='/profile' element={<MyProfile />} />

                </Routes>

            </div>

        )
    }

}
export default App;

import React, { useEffect } from 'react'
import Users from './UsersContainer';
import '../../ComponentStyles/Discover.css'
import {useContext} from 'react'
import DiscoverContext from '../../context/DiscoverContext';
import SingleUserModal from './SingleUserModal';
import SearchModal from './SearchModal';

function Discover() {

    const {addUsers, singleModal, addSingleUser, searchModal} = useContext(DiscoverContext)

    useEffect(() => {
        fetch('https://find-luv.herokuapp.com/api/users')
        .then(response => response.json())
        .then(data => addUsers(data))
    }, []);

    useEffect(() => {
        fetch('https://find-luv.herokuapp.com/api/users')
        .then(response => response.json())
        .then(data => addSingleUser(data[0]))
    }, [])

    return (
        <div>
        <Users />
        <SingleUserModal show={singleModal} />
        <SearchModal show={searchModal} />
        </div>
    )

}

export default Discover
import React, { useState, useEffect } from 'react'

function DisplayThreads({ threads, dummyUser }) {
    const [profiles, setProfiles] = useState([])

    console.log(threads)

    useEffect(() => {

        let arrayOfIds = []

        threads.forEach((elem) => {
            if (elem.recipient_user_id === dummyUser.user_id) {
                return arrayOfIds.push(elem.sender_user_id)
            }

            else {
                return arrayOfIds.push(elem.recipient_user_id)
            }
        })

        createProfilesArray(arrayOfIds)
    }, [])

    const fetchProfileData = (id) => {
        fetch(`https://find-luv.herokuapp.com/api/users/${id}`)
            .then(res => res.json())
            .then(data => { return { data } })
    }


    const createProfilesArray = (arrayOfIds) => {
        let arrayOfProfiles = []
        arrayOfIds.forEach((elem) => {

            fetch(`https://find-luv.herokuapp.com/api/users/${elem}`)
                .then(res => res.json())
                .then(data => { arrayOfProfiles.push(data) })
        })

        setProfiles(arrayOfProfiles)
    }

    const handleClick = (e) => {
        console.log(e.target.id)
    }


    return (
        <>
            {threads.map((elem) => {

                return (
                    <div id={elem.thread_id} onClick={handleClick} >
                        {elem.thread_id}
                    </div>
                )
            })
            }

        </>
    );



}


export default DisplayThreads
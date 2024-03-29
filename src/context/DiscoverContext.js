import { useState, createContext } from 'react';

// create your context
const DiscoverContext = createContext()

export const DiscoverProvider = ({children}) => {
    
    /* Setting the initial state of the context. */
    const [users, setUsers] = useState(null)
    const [singleUser, setSingleUser] = useState(null)
    const [singleModal, setSingleModal] = useState(false)
    const [searchModal, setSearchModal] = useState(false)
    const [searchUserModal, setSearchUserModal] = useState(false)
    const [distance, setDistance] = useState(null)
    const [age1, setAge1] = useState(null)
    const [age2, setAge2] = useState(null)
    const [gender, setGender] = useState(null)
    const [name, setName] = useState(null)
    const [userName, setUserName] = useState(null)
    const [index1, setIndex1] = useState(0)
    const [index2, setIndex2] = useState(23)
    const [pages, setPages] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21])
    const [clickedUser, setClickedUser] = useState(null)

    /**
     * AddUsers is a function that takes in data and sets the state of users to the data that was
     * passed in.
     * @param data - The data that is being passed in from the API call.
     */
    const addUsers = (data) => {
        setUsers(data);
    }

    /**
     * This function takes in a single user object and sets the state of the singleUser to that object.
     * @param data - the data that is being passed in from the parent component
     */
    const addSingleUser = (data) => {
        setSingleUser(data);
    }

    /**
     * When the user clicks the like button, the user's id is sent to the server and the user's liked
     * array is updated with the id of the user they liked.
     * @param id1 - the id of the user who is liking the other user
     * @param id2 - the id of the user you are liking
     * @param firstName - the first name of the user you are liking
     */
    const likeUser = (id1, id2) => {
        
        let data = {
            liked: id1
        }

        let fetchData ={
            method: "PATCH",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        }

        fetch(`https://find-luv.herokuapp.com/api/liked/${id2}`, fetchData)
        .then(() => {
            console.log(`Liked user ${id2}`)
        })
        .catch(error => {
            console.error(error);
        })
        setSingleModal(false)
    }

    
    /**
     * If the id is less than 1, set the index1 to 0 and index2 to 23. If the id is greater than 20,
     * set index2 to id*24 and index1 to id*24-22. Otherwise, set index2 to id*24 and index1 to
     * id*24-23.
     * @param id - the id of the clicked item
     */
    const updateIndexes = (id) => {
        if(id < 1) {
            setIndex1(0)
            setIndex2(23)
        } else if(id > 20) {
            setIndex2(id*24)
            setIndex1(id*24-22)
        } else {
            setIndex2(id*24)
            setIndex1(id*24-23)
        } 
    }
    
    
    /* Returning the context provider with the value of the context. */
    return <DiscoverContext.Provider value={{
        users,
        addUsers,
        singleUser,
        addSingleUser,
        singleModal,
        setSingleModal,
        searchModal,
        setSearchModal,
        distance,
        setDistance,
        age1,
        age2,
        setAge1,
        setAge2,
        gender,
        setGender,
        pages,
        index1,
        index2,
        setIndex1,
        setIndex2,
        updateIndexes,
        clickedUser,
        setClickedUser,
        likeUser,
        name,
        setName,
        searchUserModal,
        setSearchUserModal,
        userName,
        setUserName
    }}>
        {children}
    </DiscoverContext.Provider>
}

/* Exporting the context so that it can be used in other files. */
export default DiscoverContext
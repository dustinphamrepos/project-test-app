import React, { useState } from "react";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfor";

const MyComponent = (props) => {

    const [listUsers, setListUsers] = useState([
        {
            id: 1,
            name: 'Pham',
            address: 'HCMC',
            age: '16'
        },
        {
            id: 2,
            name: 'Trung',
            address: 'HN',
            age: '50'
        },
        {
            id: 3,
            name: 'Duc',
            address: 'NY',
            age: '69'
        }
    ])

    const handleAddNewUser = (newUser) => {
        setListUsers([
                newUser,
                ...listUsers,
            ]
        )
    }

    const handleDeleteUser = (userId) => {
        let listUsersClone = [...listUsers]
        listUsersClone = listUsersClone.filter(item => item.id !== userId)
        setListUsers(listUsersClone)
    }

    return (
        <>
            <AddUserInfor
                handleAddNewUser={handleAddNewUser}
            />
            <br></br>
            <DisplayInfor
                listUsers={listUsers}
                handleDeleteUser={handleDeleteUser}
            />
        </>
    )
}


export default MyComponent
import React, { useState } from "react";

const AddUserInfor = (props) => {
    const [userName, setUserName] = useState('')
    const [userAge, setUserAge] = useState('')
    const [userAddress, setUserAddress] = useState('')

    const handleOnChangeName = (e) => {
        setUserName(e.target.value)
    }

    const handleOnChangeAge = (e) => {
        setUserAge(e.target.value)
    }

    const handleOnChangeAddress = (e) => {
        setUserAddress(e.target.value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + '-random',
            name: userName,
            age: userAge,
            address: userAddress
        })
    }
    return (
        <div>
            My name is {userName} and I'm from {userAddress}
            <form onSubmit={e => handleOnSubmit(e)}>
                <label>Your name: </label>
                <br />
                <input
                    value={userName}
                    onChange={(event) => handleOnChangeName(event)}
                    type="text"
                />
                <br />
                <label>Your age: </label>
                <br />
                <input
                    value={userAge}
                    onChange={(event) => handleOnChangeAge(event)}
                    type="text"
                />
                <br />
                <label>Your address: </label>
                <br />
                <input
                    value={userAddress}
                    onChange={(event) => handleOnChangeAddress(event)}
                    type="text"
                />
                <br />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddUserInfor
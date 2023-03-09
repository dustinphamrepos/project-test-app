import React from "react";
import './DisplayInfor.scss'
import logo from "../logo.svg"



const DisplayInfor = (props) => {
    const { listUsers } = props
    return (
        <div className="display-infor-container">
            {true &&
                <>
                    {listUsers.map(user => {
                        return (
                            <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                <div>
                                    My name is {user.name}, I'm from {user.address} and my age is {user.age}
                                </div>
                                <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
                                <hr />
                            </div>
                        )
                    })}
                </>
            }
            <img src={logo} />
        </div>
    )
}

export default DisplayInfor
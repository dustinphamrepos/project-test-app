import React from "react";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfor";
class MyComponent extends React.Component {

    state = {
        listUsers: [
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
        ]
    }

    handleAddNewUser = (newUser) => {
        console.log(newUser)
        this.setState({
            listUsers: [
                newUser,
                ...this.state.listUsers,
            ]
        })
    }

    handleDeleteUser = (userId) => {
        let listUsersClone = [...this.state.listUsers]
        listUsersClone = listUsersClone.filter(item => item.id !== userId)
        this.setState({
            listUsers: listUsersClone
        })
    }
    render() {
        return (
            <>
                <AddUserInfor
                    handleAddNewUser={this.handleAddNewUser}
                />
                <br></br>
                <DisplayInfor
                    listUsers={this.state.listUsers}
                    handleDeleteUser={this.handleDeleteUser}
                />
            </>
        )
    }
}

export default MyComponent
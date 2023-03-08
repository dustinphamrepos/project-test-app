import React from "react";
import DisplayInfor from "./DisplayInfor";
import UserInfor from "./UserInfor";
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
    render() {
        return (
            <>
                <UserInfor />
                <br></br>
                <DisplayInfor listUsers={this.state.listUsers} />
            </>
        )
    }
}

export default MyComponent
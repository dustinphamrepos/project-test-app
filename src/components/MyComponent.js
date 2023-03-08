import React from "react";
import DisplayInfor from "./DisplayInfor";
import UserInfor from "./UserInfor";
class MyComponent extends React.Component {

    state = {
        listUsers: [
            {
                id: 1,
                name: 'Pham',
                address: 'HCMC'
            },
            {
                id: 2,
                name: 'Trung',
                address: 'HN'
            },
            {
                id: 3,
                name: 'Duc',
                address: 'NY'
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
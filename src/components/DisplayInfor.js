import React from "react";
class DisplayInfor extends React.Component {

    state = {
        isShowListUsers: true
    }
    handleShowHide() {
        this.setState({
            isShowListUsers: !this.state.isShowListUsers
        })
    }
    render() {
        const { listUsers } = this.props
        console.log(listUsers)
        return (
            <>
                <div>
                    <button onClick={() => this.handleShowHide()}>{this.state.isShowListUsers === true ? 'Hide list users' : 'Show list users'}</button>
                </div>
                {this.state.isShowListUsers && <div>
                    {listUsers.map(user => {
                        return (
                            <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                <div>
                                    My name is {user.name}, I'm from {user.address} and my age is {user.age}
                                </div>
                                <hr />
                            </div>
                        )
                    })}
                </div>}

            </>
        )
    }
}

export default DisplayInfor
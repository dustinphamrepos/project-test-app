import React from "react";
import './DisplayInfor.scss'
import logo from "../logo.svg"
class DisplayInfor extends React.Component {
    constructor(props) {
        console.log('>> call constructor 1')
        super(props)
        this.state = {
            isShowListUsers: true
        }
    }

    handleShowHide() {
        this.setState({
            isShowListUsers: !this.state.isShowListUsers
        })
    }

    componentDidMount() {
        console.log('>> call me did mount')
        setTimeout(() => {
            document.title = 'Trung Duc'
        }, 3000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('>> call me did update', this.props, prevProps)
        if (this.props.listUsers !== prevProps.listUsers) {
            if (this.props.listUsers.length === 5) {
                alert('aaa')
            }
        }
    }

    render() {
        console.log('>> call me render')
        const { listUsers } = this.props
        console.log(listUsers)
        return (
            <div className="display-infor-container">
                <div>
                    <button onClick={() => this.handleShowHide()}>{this.state.isShowListUsers === true ? 'Hide list users' : 'Show list users'}</button>
                </div>
                {this.state.isShowListUsers &&
                    <>
                        {listUsers.map(user => {
                            return (
                                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                    <div>
                                        My name is {user.name}, I'm from {user.address} and my age is {user.age}
                                    </div>
                                    <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
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
}

export default DisplayInfor
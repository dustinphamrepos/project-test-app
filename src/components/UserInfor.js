import React from "react";

class UserInfor extends React.Component {
    state = {
        name: 'Duc',
        age: 27,
        address: 'HCMC'
    }

    // handleOnMoverOver = event => {
    //     console.log(event)
    // }

    // handleClick(event) {
    //     console.log('>>> click me by button')
    //     console.log('My name is: ', this.state.name)
    //     console.log(event.target)
    //     this.setState({
    //         name: 'Trung Duc',
    //         age: 18
    //     })
    // }

    handleOnChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleOnChangeAge = (e) => {
        this.setState({
            age: e.target.value
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
    }
    
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm from {this.state.address}
                <form onSubmit={e => this.handleOnSubmit(e)}>
                    <label>Your name: </label>
                    <input
                        value={this.state.name}
                        onChange={(event) => this.handleOnChangeName(event)}
                        type="text"
                    />
                    <label>Your age: </label>
                    <input
                        value={this.state.age}
                        onChange={(event) => this.handleOnChangeAge(event)}
                        type="text"
                    />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default UserInfor
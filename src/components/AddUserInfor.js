import React from "react";

class AddUserInfor extends React.Component {
    state = {
        name: '',
        age: '',
        address: ''
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

    handleOnChangeAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        this.props.handleAddNewUser({
            id: Math.floor((Math.random()*100) + 1) + '-random',
            name: this.state.name,
            age: this.state.age,
            address: this.state.address
        })
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
                    <label>Your address: </label>
                    <input
                        value={this.state.address}
                        onChange={(event) => this.handleOnChangeAddress(event)}
                        type="text"
                    />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddUserInfor
import React from "react";
class MyComponent extends React.Component {

    state = {
        name: 'Duc',
        age: 27,
        address: 'HCMC'
    }
    handleOnMoverOver = event => {
        console.log(event)
    }
    handleClick(event) {
        console.log('>>> click me by button')
        console.log('My name is: ', this.state.name)
        console.log(event.target)
        this.setState({
            name: 'Trung Duc',
            age: 18
        })
    }

    handleOnChangeInput = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
    }
    render() {
        return (
            <div>
                My first component
                My name is {this.state.name} and I'm from {this.state.address}
                <button onMouseOver={this.handleOnMoverOver}>Click me!</button>
                <button onClick={(e) => {this.handleClick(e)}}>Click me!</button>
                <form onSubmit={e => this.handleOnSubmit(e)}>
                    <input
                        onChange={(event) => this.handleOnChangeInput(event)}
                        type="text"
                    />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default MyComponent
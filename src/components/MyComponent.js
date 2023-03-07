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
    render() {
        return (
            <div>
                My first component
                My name is {this.state.name} and I'm from {this.state.address}
                <button onMouseOver={this.handleOnMoverOver}>Click me!</button>
                <button onClick={(event) => {this.handleClick(event)}}>Click me!</button>
            </div>
        )
    }
}

export default MyComponent
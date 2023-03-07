import React from "react";
class MyComponent extends React.Component {

    state = {
        name: 'Duc',
        age: 27,
        address: 'HCMC'
    }
    handleOnMoverOver(event) {
        console.log(event)
    }
    handleClick() {
        console.log('>>> click me by button')
        console.log('My name is: ', this.state.name)
    }
    render() {
        return (
            <div>
                My first component
                My name is {this.state.name} and I'm from {this.state.address}
                <button onMouseOver={this.handleOnMoverOver}>Click me!</button>
                <button onClick={this.handleClick}>Click me!</button>
            </div>
        )
    }
}

export default MyComponent
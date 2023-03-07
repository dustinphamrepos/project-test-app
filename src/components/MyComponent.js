import React from "react";
class MyComponent extends React.Component {

    state = {
        name: 'Duc',
        age: 27,
        address: 'HCMC'
    }
    render() {
        return (
            <div>
                My first component
                My name is {this.state.name} and I'm from {this.state.address}
            </div>
        )
    }
}

export default MyComponent
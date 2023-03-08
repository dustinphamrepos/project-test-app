import React from "react";
class DisplayInfor extends React.Component {
    render() {
        console.log(this.props)
        return (
            <>
                <div>{this.props.myName}</div>
                <div>{this.props.yourName}</div>
                <div>{this.props.yourAge}</div>
                <div>{this.props.myCourses}</div>
            </>
        )
    }
}

export default DisplayInfor
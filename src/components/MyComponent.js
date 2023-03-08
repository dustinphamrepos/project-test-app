import React from "react";
import DisplayInfor from "./DisplayInfor";
import UserInfor from "./UserInfor";
class MyComponent extends React.Component {
    render() {
        const yourName = "Mai"
        const courses = ['PHP', 'JS', 'C++']
        return (
            <>
                <UserInfor />
                <br></br>
                <DisplayInfor myName="Duc" yourName={yourName} />
                <DisplayInfor yourAge={20} />
                <DisplayInfor myCourses={courses} />
            </>
        )
    }
}

export default MyComponent
import { useEffect } from "react";

const TableQuiz = (props) => {
    const { listQuizzes, fetchListQuizzes } = props
    useEffect(() => {
        fetchListQuizzes()
    }, [])

    return (
        <>
            <div>List quizzes: </div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuizzes && listQuizzes.map((quiz, index) => {
                        // console.log(quiz)
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td>{quiz.id}</td>
                                <td>{quiz.name}</td>
                                <td>{quiz.description}</td>
                                <td>{quiz.difficulty}</td>
                                <td style={{ display: "flex", gap: "15px" }}>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => props.handleClickEditQuiz(quiz)}
                                    >
                                        Edit
                                    </button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </>
    );
}

export default TableQuiz;
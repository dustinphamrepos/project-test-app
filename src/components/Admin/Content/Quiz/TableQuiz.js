import { useTranslation } from 'react-i18next'
import { useEffect } from "react";

const TableQuiz = (props) => {
    const { t } = useTranslation()

    const { listQuizzes, fetchListQuizzes } = props
    useEffect(() => {
        fetchListQuizzes()
    }, [])

    return (
        <>
            <div>{t('tableQuiz.tableQuiz-1')}</div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">{t('tableQuiz.tableQuiz-2')}</th>
                        <th scope="col">{t('tableQuiz.tableQuiz-3')}</th>
                        <th scope="col">{t('tableQuiz.tableQuiz-4')}</th>
                        <th scope="col">{t('tableQuiz.tableQuiz-5')}</th>
                        <th scope="col">{t('tableQuiz.tableQuiz-6')}</th>
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
                                        {t('tableQuiz.tableQuiz-7')}
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => props.handleClickDeleteQuiz(quiz)}
                                    >
                                        {t('tableQuiz.tableQuiz-8')}
                                    </button>
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
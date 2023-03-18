import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";

const DetailQuiz = () => {
    const params = useParams()
    const quizId = params.id

    useEffect(() => {
        fetchQuestions()
    }, [quizId])
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId)
        console.log(res);
    }
    return (
        <div className="detail-quiz-container">
            Detail quiz
        </div>
    );
}

export default DetailQuiz;
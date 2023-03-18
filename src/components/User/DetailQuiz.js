import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from 'lodash'

const DetailQuiz = () => {
    const params = useParams()
    // console.log('>>>>>>', params)
    const quizId = params.id

    useEffect(() => {
        fetchQuestions()
    }, [quizId])
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId)
        // console.log("check", res);
        if (res && res.EC === 0) {
            let raw = res.DT
            console.log('...', raw)
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = []
                    let questionDescription, image = null
                    let temp = value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description
                            image = item.image
                        }
                        answers.push(item.answers)
                    })
                    // console.log('value: ', value)
                    // console.log('>>>>>key: ', key)
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            console.log(data)
        }
    }
    return (
        <div className="detail-quiz-container">
            Detail quiz
        </div>
    );
}

export default DetailQuiz;
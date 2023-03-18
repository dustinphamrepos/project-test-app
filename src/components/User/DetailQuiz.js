import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import _ from 'lodash'
import { getDataQuiz } from "../../services/apiService";
import './DetailQuiz.scss'

const DetailQuiz = () => {
    const params = useParams()
    const location = useLocation()
    // console.log(location)

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
            // console.log('...', raw)
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
            // console.log(data)
        }
    }

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <div className="question">
                            Question 1: How are u doing?
                    </div>
                    <div className="answer">
                        <div className="a-child">A. iwuvjwkjvcjksw</div>
                        <div className="b-child">A. iwuvjwkjvcjksw</div>
                        <div className="c-child">A. iwuvjwkjvcjksw</div>
                    </div>
                </div>
                <div className="footer">
                    <button className="btn btn-secondary">Prev</button>
                    <button className="btn btn-primary">Next</button>
                </div>
            </div>
            <div className="right-content">
                Count down
            </div>
        </div>
    );
}

export default DetailQuiz;
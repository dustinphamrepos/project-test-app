import { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
  const { dataQuiz } = props

  const refDiv = useRef([])

  const onTimeUp = () => {
    props.handleFinishQuiz()
  }
  // console.log(dataQuiz)

  const getClassQuestion = (question, index) => {
    // console.log(question, index)
    // check answers
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find(answer => answer.isSelected === true)
      if (isAnswered) {
        return "question selected"
      } else {
        return "question"
      }
    }
  }

  const handleClickQuestion = (question, index) => {
    props.setIndexOfCurrentQuestion(index)
    if (refDiv.current) {
      refDiv.current.forEach(div => {
        if (div && div.className === 'question clicked') {
          div.className = 'question'
        }
      })
    }
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find(answer => answer.isSelected === true)
      if (isAnswered) return;
    }
    refDiv.current[index].className = "question clicked"
  }

  return (
    <>
      <div className="main-timer">
        <CountDown
          onTimeUp={onTimeUp}
        />
      </div>
      <div className="main-question">
        {dataQuiz && dataQuiz.length > 0 &&
          dataQuiz.map((question, index) => {
            return (
              <div
                key={question.questionId}
                className={getClassQuestion(question, index)}
                onClick={() => handleClickQuestion(question, index)}
                ref={element => refDiv.current[index] = element}
              >
                {index + 1}
              </div>
            )
          })}
      </div>
    </>
  );
}

export default RightContent;
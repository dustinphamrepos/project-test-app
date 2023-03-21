import _ from 'lodash'

const Question = (props) => {
    const { index, data, handleCheckbox } = props
    if (_.isEmpty(data)) {
        return (<></>)
    }
    // console.log('>>>>>>>>>>>>>>>',data)
    const handleHandleCheckbox = (e, aId, qId) => {
        // console.log('>>>', e.target.checked)
        // console.log('data >>> ', data, aId, qId)
        handleCheckbox(aId, qId)
    }

    return (
        <>
            {data.image
                ?
                <div className='q-image'>
                    <img src={`data:image/jpeg;base64,${data.image}`} />
                </div>
                :
                <div className='q-image'></div>
            }
            <div className="question">
                Question {index + 1}: {data?.questionDescription}
            </div>
            <div className="answer">
                {data.answers && data.answers.length &&
                    data.answers.map((answer, index) => {
                        return (
                            <div
                                key={`answer-${index}`}
                                className="a-child"
                            >
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={answer.isSelected}
                                        onChange={e => handleHandleCheckbox(e, answer.id, data.questionId)}
                                    />
                                    <label
                                        className="form-check-label"
                                    >
                                        {answer.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    );
}

export default Question;
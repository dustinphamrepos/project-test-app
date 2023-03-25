import { useEffect, useState } from "react";
import { getListHistory } from "../../services/apiService";
import moment from 'moment'

function History(props) {
  const [listHistory, setListHistory] = useState([])

  useEffect(() => {
    fetchListHistory()
  }, [])

  const fetchListHistory = async () => {
    let res = await getListHistory()
    console.log(res)
    if (res && res.EC === 0) {
      let list = res.DT?.data?.map(item => {
        return {
          id: item.id,
          quizName: item.quizHistory.name,
          total_questions: item.total_questions,
          total_correct: item.total_correct,
          date: moment(item.updatedAt).format('DD/MM/YYYY hh:mm:ss A')
        }
      })
      console.log(list)
      if (list.length > 7) {
        list = list.slice(list.length - 7, list.length)
      }
      setListHistory(list)
    }
  }

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">quizName</th>
            <th scope="col">Total question</th>
            <th scope="col">Total correct</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {listHistory && listHistory.length > 0 &&
            listHistory.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.quizName}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>{item.date}</td>
                </tr>
              )
            })
          }
          {listHistory && listHistory.length === 0 &&
            <tr>
              <td colSpan={'4'}>Not found data</td>
            </tr>
          }
        </tbody>
      </table>
    </>
  );
}

export default History;
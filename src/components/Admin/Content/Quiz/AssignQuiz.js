import { useState, useEffect } from 'react'
import Select from 'react-select'
import { getAllQuizForAdmin, getAllUsers } from '../../../../services/apiService'

const AssignQuiz = (props) => {

  const [selectedQuiz, setSelectedQuiz] = useState({})
  const [listQuizzes, setListQuizzes] = useState([])

  const [selectedUser, setSelectedUser] = useState({})
  const [listUsers, setListUsers] = useState([])

  useEffect(() => {
    fetchListQuizzes()
    fetchListUsers()
  }, [])

  const fetchListQuizzes = async () => {
    let res = await getAllQuizForAdmin()
    if (res && res.EC === 0) {
      let newListQuizzes = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`
        }
      })
      setListQuizzes(newListQuizzes)
    }
  }

  const fetchListUsers = async () => {
    let res = await getAllUsers()
    if (res && res.EC === 0) {
      let newListUsers = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`
        }
      })
      setListUsers(newListUsers)
    }
  }

  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-2">Select quiz:</label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuizzes}
        />
      </div>

      <div className="col-6 form-group">
        <label className="mb-2">Select user:</label>
        <Select
          value={selectedUser}
          onChange={setSelectedUser}
          options={listUsers}
        />
      </div>
      <div>
        <button className="btn btn-warning mt-3">Assign</button>
      </div>
    </div>
  );
}

export default AssignQuiz;
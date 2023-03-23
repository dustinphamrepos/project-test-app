import { getOverview } from '../../../../services/apiService';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import './DashBoard.scss'
import { useEffect, useState } from 'react';

const DashBoard = (props) => {
    const [dataOverview, setDataOverview] = useState([])
    const [dataChart, setDataChart] = useState([])

    useEffect(() => {
        fetDataOverview()
    }, [])

    const fetDataOverview = async () => {
        let res = await getOverview()
        if (res && res.EC === 0) {
            setDataOverview(res.DT)
            // process chart data
            let Qz = 0, Qs = 0, As = 0, Us = 0
            Qz = res.DT && res.DT.others && //cach 1
                res.DT.others.countQuiz ?
                res.DT.others.countQuiz : 0
            // Qz = res?.DT?.others?.countQuiz ?? 0 // cach 2
            Qs = res?.DT?.others?.countQuestions ?? 0
            As = res?.DT?.others?.countAnswers ?? 0
            Us = res?.DT?.users?.total ?? 0
            const data = [
                {
                    "name": "Quizzes",
                    "Qz": Qz,
                },
                {
                    "name": "Questions",
                    "Qs": Qs,
                },
                {
                    "name": "Answers",
                    "As": As,
                },
                {
                    "name": "User",
                    "Us": Us,
                }
            ]
            setDataChart(data)
        }
        // console.log(res)
    }
    // console.log('>>>', dataOverview)



    return (
        <div className="dashboard-container">
            <div className="title">
                Analytics dashboard
            </div>
            <div className="content">
                <div className="content-left">
                    <div className="child">
                        <span className="text-1">Total users</span>
                        <span className="text-2">
                            {dataOverview && dataOverview.users &&
                                dataOverview.users.total ?
                                dataOverview.users.total : 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className="text-1">Total quizzes</span>
                        <span className="text-2">
                            {dataOverview && dataOverview.others &&
                                dataOverview.others.countQuiz ?
                                dataOverview.others.countQuiz : 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className="text-1">Total questions</span>
                        <span className="text-2">
                            {dataOverview && dataOverview.others &&
                                dataOverview.others.countQuestions ?
                                dataOverview.others.countQuestions : 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className="text-1">Total answers</span>
                        <span className="text-2">
                            {dataOverview && dataOverview.others &&
                                dataOverview.others.countAnswers ?
                                dataOverview.others.countAnswers : 0}
                        </span>
                    </div>
                </div>
                <div className="content-right">
                    <ResponsiveContainer>
                        <BarChart width="95%" height="100%" data={dataChart}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#D52C1E" />
                            <Bar dataKey="Qs" fill="#1E39D5" />
                            <Bar dataKey="As" fill="#E006EE" />
                            <Bar dataKey="Us" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    )
}
export default DashBoard;
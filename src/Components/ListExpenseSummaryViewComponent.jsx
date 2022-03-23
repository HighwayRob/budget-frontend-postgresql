import React, { Component } from 'react'
import ExpenseSummaryViewService from '../Services/ExpenseSummaryViewService'
// // import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {ProgressBar} from 'react-bootstrap'
// import ProgressBar from './../Services/ProgressBar';

class ListExpenseSummaryViewComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expensesummary: [],
            holder:' ',
            result:0,
            netdiff:0,
            month:0
        }
    }

    componentDidMount= async (event)=>{
        ExpenseSummaryViewService.getExpenseSummaryView().then((res) => {
            this.setState({ expensesummary: res.data});
            this.setState({result: this.state.expensesummary.reduce((total, currentValue) => total = total + currentValue.totalcategoryexpense,0)});
            this.setState({result: this.state.result.toFixed(2)})
            this.setState({netdiff: this.state.expensesummary.reduce((total, currentValue) => total = total + (currentValue.budget - currentValue.totalcategoryexpense),0)});
            this.setState({netdiff: this.state.netdiff.toFixed(2)})
        });
        var today = new Date();
        this.setState({month:today.getMonth()+1})
    }

    render() {
        return (
            <div>
                 <h2 style={{textAlign: 'center'}}>Summarized Expense List - month {this.state.month}</h2>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Category</th>
                                    <th>Budget</th>
                                    <th>Total Expense</th>
                                    <th>Difference</th>
                                    <th>% of Budget</th>
                                    <th>Progress Bar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.expensesummary.map(
                                        expensesummary => 
                                        <tr key = {expensesummary.expenseId}>
                                            <td width='2%'>{this.state.holder}</td>
                                            <td width = '10%'> {expensesummary.categoryname} </td>   
                                            <td width = '10%'> {expensesummary.budget} </td>   
                                            <td width = '10%'> {(expensesummary.totalcategoryexpense).toFixed(2)} </td>   
                                            <td width = '10%' style={{fontsize: 30, fontweight: 'ultrabold', color: expensesummary.budget - expensesummary.totalcategoryexpense >= 0 ? "green" : "red"}}> {(expensesummary.budget - expensesummary.totalcategoryexpense).toFixed(2)} </td>   
                                            <td width = '5%'> {((expensesummary.totalcategoryexpense / expensesummary.budget)*100).toFixed(0)}% </td>   
                                            <td width = '10%'>
                                            {/* <ProgressBar variant="success" now={((expensesummary.totalcategoryexpense / expensesummary.budget)*100).toFixed(0)} /> */}
                                            <ProgressBar style={{marginRight: '15px'}}  variant= {((expensesummary.totalcategoryexpense / expensesummary.budget)*100).toFixed(0) <101 ? "success" : "danger"} now={((expensesummary.totalcategoryexpense / expensesummary.budget)*100).toFixed(0)} />
                                            </td>                                  
                                            </tr>
                                            )
                                }
                            </tbody>
                        </table>
                        <div style={{textAlign: 'center'}}>Total Expenditures: {this.state.result}
                        </div>
                        <div style={{textAlign: 'center'}}>Net Difference {this.state.netdiff}
                        </div>
                        <br></br>
                        <br></br>

                        {/* <ToastContainer position="top-center" autoClose={1000}/> */}
                 </div>
            </div>
        )
    }
}

export default ListExpenseSummaryViewComponent
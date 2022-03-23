import React, { Component } from 'react'
import ExpenseService from '../Services/ExpenseService'
import ExpenseDetailsViewService from '../Services/ExpenseDetailsViewService'
import MonthService from '../Services/MonthService'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

class ListExpenseComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expense: [],
            month:[],
            holder:' ',
            result:0,
            selmonth:0
        }

    }

    componentDidMount= async (event)=>{
        await MonthService.getMonthById(1).then((res) => {
            this.setState({selmonth: res.data.month})
        });

        ExpenseDetailsViewService.getExpenseDetailsViewByMonth(this.state.selmonth).then((res) => {
            this.setState({expense: res.data});
            this.setState({result: this.state.expense.reduce((total, currentValue) => total = total + currentValue.amount,0)});
            this.setState({result: this.state.result.toFixed(2)})
        });

    }

    deleteExpense(expenseId){
        ExpenseService.deleteExpense(expenseId).then( res => {
            ExpenseDetailsViewService.getExpenseDetailsView().then((res) => {
                this.setState({expense: res.data});
                this.setState({result: this.state.expense.reduce((total, currentValue) => total = total + currentValue.amount,0)});
                this.setState({result: this.state.result.toFixed(2)})
            });
            this.props.history.push(`/updatecategorycomponent`);
        });
    }


    render() {
        return (
            <div>
                 <h2 style={{textAlign: 'center'}}>Detailed Expense List - month {this.state.month}</h2>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Category</th>
                                    <th>Month</th>
                                    <th>Week</th>
                                    <th>Vendor</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.expense.map(
                                        expense => 
                                        <tr key = {expense.expenseid}>
                                            <td width='2%'>{this.state.holder}</td>
                                            <td width = '5%'> {expense.categoryname} </td>   
                                            <td width = '3%'> {expense.month} </td>   
                                            <td width = '3%'> {expense.week} </td>   
                                            <td width = '30%'> {expense.vendor} </td>   
                                            <td width = '10%'> {(expense.amount).toFixed(2)} </td>   
                                            <td>
                                                 <button width = '10%' style={{marginLeft: "10px"}} 
                                                    onClick={ e => window.confirm("Are you sure you wish to delete this item?") &&
                                                    this.deleteExpense(expense.expenseid)} className="btn btn-danger">Delete </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <div style={{textAlign: 'center'}}>Total Expenditures: {this.state.result}
                        </div>
                        {/* <ToastContainer position="top-center" autoClose={1000}/> */}
                 </div>
            </div>
        )
    }
}

export default ListExpenseComponent
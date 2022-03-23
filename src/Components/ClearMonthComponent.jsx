import React, { Component } from 'react'
import ExpenseService from '../Services/ExpenseService'
import MonthService from '../Services/MonthService'

class ClearMonthComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expense:[],
            month:[],
            nbrrecs:0
        }
        this.clearExpenseMonth = this.clearExpenseMonth.bind(this);
    }

    componentDidMount= async (event)=>{
        await MonthService.getMonthById(1).then((res) => {
            this.setState({selmonth: res.data.month})
            // this.setState({selmonth: 4})
        });

        await ExpenseService.getExpense().then((res) => {
            this.setState({expense: res.data});
            this.setState({expense: this.state.expense.filter(expense => expense.month === this.state.selmonth)});
            this.setState({nbrrecs: this.state.expense.length})
        });
    }

    clearExpenseMonth (){
        for (let i = 0; i < this.state.nbrrecs; i++) 
        {
            var X=this.state.expense[i].expenseid;
            ExpenseService.deleteExpense(X);
        }
        this.props.history.push(`/updatecategorycomponent`);
    }

    cancel(){
        this.props.history.push(`/updatecategorycomponent`);
    }

    render() {
        return (
            <div>
                <h2>Clearing out Old Months Expense: (month: {this.state.selmonth})</h2>
                <button style={{marginLeft: "10px", fontSize : '30px'}} 
                    onClick={ e => window.confirm("Are you sure you wish to clear out "  + this.state.nbrrecs + " expense records from month " + this.state.selmonth + "?") &&
                    this.clearExpenseMonth(this)} 
                    className="btn btn-danger">Delete Expenses </button>
                <button style = {{marginLeft: '10px', fontSize : '30px'}} 
                    className="btn btn-danger" onClick={this.cancel.bind(this)}> Exit\Cancel</button>
            </div>
        )
    }
}

export default ClearMonthComponent
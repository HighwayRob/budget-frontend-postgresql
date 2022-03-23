import React, { Component } from 'react'
import ExpenseService from '../Services/ExpenseService';
import CategoryService from '../Services/CategoryService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
class CreateExpenseComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isReadOnly:false,
            expenseid: null,
            month:null,
            week: null,
            vendor: null,
            amount:null,
            categoryId:null,
            category:[],
            expense:[],
            weekarray:[
                { weeknbr:  1, weekname: "Week 1" },
                { weeknbr : 2, weekname: "Week 2" },
                { weeknbr : 3, weekname: "Week 3" },
                { weeknbr : 4, weekname: "Week 4" },
                { weeknbr : 5, weekname: "Week 5" }
            ],
            montharray:[
                { monthnbr:  1, monthname: " 1 January" },
                { monthnbr : 2, monthname: " 2 Febuary" },
                { monthnbr : 3, monthname: " 3 March" },
                { monthnbr : 4, monthname: " 4 April" },
                { monthnbr : 5, monthname: " 5 May" },
                { monthnbr:  6, monthname: " 6 June" },
                { monthnbr : 7, monthname: " 7 July" },
                { monthnbr : 8, monthname: " 8 August" },
                { monthnbr : 9, monthname: " 9 September" },
                { monthnbr : 10, monthname: "10 October" },
                { monthnbr : 11, monthname: "11 November" },
                { monthnbr : 12, monthname: "12 December" },
            ]
        }
        
        this.saveOrUpdateExpense = this.saveOrUpdateExpense.bind(this);
        this.changeAmountHandler = this.changeAmountHandler.bind(this);
    }

    componentDidMount()
    {
        CategoryService.getCategory().then((res) => {
            this.setState({ category: res.data});
        });
        this.setState({month : new Date().getMonth() + 1});
    };
    
    saveOrUpdateExpense = async (e)=>{
        e.preventDefault();
        var errMessage = null
        if (this.state.categoryId ===''||this.state.categoryId===null)
        {
            errMessage = "Category cannot be blank"
        }
        if (this.state.month ===''||this.state.month===null)
        {
            errMessage = "Month cannot be blank"
        }
        if (this.state.week ===''||this.state.week===null)
        {
            errMessage = "Week cannot be blank"
        }
        if (this.state.vendor ===''||this.state.vendor===null)
        {
            errMessage = "Vendor cannot be blank"
        }
        if (this.state.amount ===''||this.state.amount===null||!Number(this.state.amount))
        {
            errMessage = "Amount must be numeric"
        }
        if (errMessage !== null)
        {
            toast.info(errMessage)
        }
        else
        {
            let expense = {
                month: this.state.month,
                week: this.state.week,
                vendor: this.state.vendor,
                amount: this.state.amount,
                categoryId: this.state.categoryId
            };
            if (expense.amount > 1000)
            {
                expense.amount = expense.amount/100
            }
 
            if(this.state.expenseid === null){
                await ExpenseService.createExpense(expense);
                toast.info("Record Added");
            }
            this.props.history.push(`/updatecategorycomponent`);
        }
    }
    
    changeVendorHandler= (event) => {
        this.setState({vendor: event.target.value});
    }

    changeAmountHandler= (event) => {
         const re = /^[0-9\b].+$/;
        //const re = /^[+-]?\d*(?:[.,]\d*)?$/;
        if (event.target.value === '' || re.test(event.target.value)) {
           this.setState({amount: event.target.value})
        }
    }
    
    changeCategoryIdHandler= (event) => { 
        this.setState({categoryId: event.target.value});
    }

    changeWeekHandler= (event) => { 
        this.setState({week: event.target.value});
    }

    changeMonthHandler= (event) => { 
        this.setState({month: event.target.value});
    }

    cancel(){
        this.props.history.push(`/updatecategorycomponent`);
    }

    getTitle(){
        if(this.state.expenseid === null){
            return <h3 style = {{fontSize : '30px'}} className="text-center">Add Expense</h3>
        }else{
            return <h3 style = {{fontSize : '30px'}} className="text-center">Update Expense</h3>
        }
    }

    render() {
        return (
            <div>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                    <div className="select-container">
                                            <label style = {{fontSize : '30px'}}> Month: </label>
                                            <select onChange={this.changeMonthHandler}
                                                value={this.state.month} style={{marginLeft: "10px", fontSize : '30px'}}>
                                                <option selected disabled = "true"  > -- Select Month -- </option>
                                                {
                                                    this.state.montharray.sort((a, b) => a.monthname > b.monthname ? 1:-1).map((item,index)=> 
                                                        (<option key={index} value={item.monthnbr}>{item.monthname} </option>))
                                                }
                                            </select>
                                        </div>
                                        <br></br>

                                        {/* <div className = "form-group">
                                            <label  style = {{fontSize : '30px'}}> Month: </label>
                                            <input style = {{padding:0, fontSize : '20px'}} placeholder="month" name="month" 
                                                className="form-control" 
                                                readOnly = {this.state.isReadOnly} 
                                                value={this.state.month} 
                                                onChange={event => this.setState({month: event.target.value.replace(/\D/,'')})}
                                                />
                                        </div>
                                        <br></br> */}

                                        <div className="select-container">
                                            <label style = {{fontSize : '30px'}}> Week: </label>
                                            <select onChange={this.changeWeekHandler}
                                                value={this.state.week} style={{marginLeft: "10px", fontSize : '30px'}}>
                                                <option selected disabled = "true"  > -- Select Week -- </option>
                                                {
                                                    this.state.weekarray.sort((a, b) => a.weekname > b.weekname ? 1:-1).map((item,index)=> 
                                                        (<option key={index} value={item.weeknbr}>{item.weekname} </option>))
                                                }
                                            </select>
                                        </div>
                                        <br></br>

                                        {/* <br></br>
                                        <div className = "form-group">
                                            <label style = {{fontSize : '30px'}}> Week: </label>
                                            <input  style = {{padding:0, fontSize : '20px'}}placeholder="week" name="week" 
                                                className="form-control" 
                                                readOnly = {this.state.isReadOnly} 
                                                value={this.state.week} 
                                                onChange={event => this.setState({week: event.target.value.replace(/\D/,'')})}
                                                />
                                        </div>
                                        <br></br> */}

                                        <div className = "form-group">
                                            <label style = {{fontSize : '30px'}}> Vendor: </label>
                                            <input  style = {{padding:0, fontSize : '20px'}}placeholder="vendor" name="vendor" className="form-control" 
                                                readOnly = {this.state.isReadOnly} 
                                                value={this.state.vendor} 
                                                onChange={this.changeVendorHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label style = {{fontSize : '30px'}}> Amount: </label>
                                            <input  style = {{padding:0, fontSize : '20px'}}
                                                placeholder="amount" 
                                                name="amount" 
                                                className="form-control" 
                                                readOnly = {this.state.isReadOnly} 
                                                value={this.state.amount} 
                                                onChange={this.changeAmountHandler}
                                                />
                                        </div>
                                        <br></br>
                                        <div className="select-container">
                                            <label style = {{fontSize : '30px'}}> Category: </label>
                                            <select onChange={this.changeCategoryIdHandler}
                                                value={this.state.categoryId} style={{marginLeft: "10px", fontSize : '30px'}}>
                                                <option selected disabled = "true"  > -- Select Category -- </option>
                                                {
                                                    this.state.category.sort((a, b) => a.categoryName > b.categoryName ? 1:-1).map((item,index)=> 
                                                        (<option key={index} value={item.categoryid}>{item.categoryName} </option>))
                                                }
                                            </select>
                                        </div>
                                        <br></br>
                                        <button style = {{fontSize : '30px'}} className="btn btn-success" onClick={this.saveOrUpdateExpense}>Save</button>
                                        <button style = {{marginLeft: '10px', fontSize : '30px'}} className="btn btn-danger" onClick={this.cancel.bind(this)}> Exit\Cancel</button>
                                        </form>
                                    </div>
                            </div>
                        </div>

                   </div>
                   <ToastContainer position="top-center" autoClose={2000}/>
            </div>
        )
    }
}

export default CreateExpenseComponent

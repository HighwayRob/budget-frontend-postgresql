import React, { Component } from 'react'
import CategoryViewService from '../Services/CategoryViewService'
import CategoryService from '../Services/CategoryService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpenseService from '../Services/ExpenseService';

class ListCategoryViewComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: [],
            holder:' ',
            result:0
        }
        this.editCategory = this.editCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);

    }

    componentDidMount= async (event)=>{
        CategoryViewService.getCategoryView().then((res) => {
            this.setState({ category: res.data});
            this.setState({result: this.state.category.reduce((total, currentValue) => total = total + currentValue.budget,0)});
        });

    }

    deleteCategory= async (categoryid)=>{
        await ExpenseService.getExpenseByCategoryId(categoryid).then((res) =>{
            if (res.data.length ===0)
            {
                CategoryService.deleteCategory(categoryid).then( res => {
                    CategoryViewService.getCategoryView().then((res) => {
                        this.setState({ category: res.data});
                        this.setState({result: this.state.category.reduce((total, currentValue) => total = total + currentValue.budget,0)});
                    });
                    toast.info("Category Deleted")
                });
            }
            else
            {
                toast.info("Category Cannot be Deleted, Expenses attached")
            }
        });
    }


    editCategory(categoryid){
        this.props.history.push(`/createcategorycomponent/${categoryid}`);
    }
    addCategory(){
        this.props.history.push('/createcategorycomponent/_add');
    }

    render() {
        return (
            <div>
                 <h2 style={{textAlign: 'center'}}>Category List </h2>
                 <br></br>
                 <div> 
                    <button type = "button" className="btn btn-info" onClick={this.addCategory}> Add Category</button>
                </div>
                <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Category</th>
                                    <th> Budget</th>
                                    <th> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.category.map(
                                        category => 
                                        <tr key = {category.categoryid}>
                                            <td width='1%'>{this.state.holder}</td>
                                            <td style={{marginLeft: '10px'}}  width = '20%'> {category.categoryname} </td>   
                                            <td width = '20%'> {category.budget} </td>   
                                            <td>
                                                <button width = '20%' type = "button" className="btn btn-info" onClick={ () => this.editCategory(category.categoryid)}>Update</button>
                                                <button width = '10%' style={{marginLeft: "10px"}} 
                                                    onClick={ e => window.confirm("Are you sure you wish to delete this item?") &&
                                                    this.deleteCategory(category.categoryid)} className="btn btn-danger">Delete </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <div style={{textAlign: 'center'}}>Total Expense Budget:  {this.state.result}
                        </div>
                        <br></br>
                        <ToastContainer position="top-center" autoClose={1000}/>
                 </div>
            </div>
        )
    }
}

export default ListCategoryViewComponent
import React, { Component } from 'react'
import CategoryService from '../Services/CategoryService'
// // import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

class ListCategoryComponent extends Component {
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
        CategoryService.getCategory().then((res) => {
            this.setState({ category: res.data});
            this.setState({totalbudget: this.state.category.reduce((total, currentValue) => total = total + currentValue.budget,0)});

        });

    }

    addCategory(){
        this.props.history.push('/createcategorycomponent/_add');
    }

    editCategory(categoryid){
        this.props.history.push(`/createcategorycomponent/${categoryid}`);
    }
     render() {
        return (
            <div>
                <h2 style={{textAlign: 'center'}}>Category Listxx </h2>
                <br></br>
                <div> 
                    <button type = "button" className="btn btn-info" onClick={this.addCategory}> Add Category</button>
                </div>
                <br></br>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th> Budget</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.category.map(
                                        category => 
                                        <tr key = {category.categoryid}>
                                            <td width='1%'>{this.state.holder}</td>
                                             <td style={{marginLeft: '10px'}}  width = '20%'> {category.categoryName} </td>   
                                             <td width = '20%'> {category.budget} </td>   
                                             <button onClick={ () => this.editCategory(category.categoryid)} className="btn btn-info">Update </button>
                                        </tr>
                                    )
                            } 
                        </tbody>
                    </table>
                <div style={{textAlign: 'center'}}>Total Expense Budget:  {this.state.totalbudget}
                </div>
                <br></br>
                    {/* <ToastContainer position="top-center" autoClose={1000}/> */}
                </div>
            </div>
        )
    }
}

export default ListCategoryComponent
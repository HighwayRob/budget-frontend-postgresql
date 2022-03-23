import React, { Component } from 'react'
import CategoryService from '../Services/CategoryService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
   
class CreateCategoryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isReadOnly:false,
            categoryid: this.props.match.params.categoryid,
            categoryName:null,
            amount:null,
            status:null,
            w1:null,
            w2:null,
            w3:null,
            w4:null,
            w5 :null,
            wtotal:null,
            expnet:null,
            category:[],
        }
        
        this.saveOrUpdateCategory = this.saveOrUpdateCategory.bind(this);
    }

    componentDidMount()
    {
        if(this.state.categoryid === '_add'){
            return
        }
        else
        {
            CategoryService.getCategoryById(this.state.categoryid).then((res) =>{
                let category = res.data;
                this.setState({
                    categoryName: category.categoryName,
                    budget: category.budget,
                    w1 : category.w1,
                    w2 : category.w2,
                    w3 : category.w3,
                    w4 : category.w4,
                    w5 : category.w5,
                    wtotal: category.wtotal,
                    expnet: category.expnet,
                    status: category.status
                });
            });
        }        
    };
    
    saveOrUpdateCategory = async (e)=>{
        e.preventDefault();
        var errMessage = null
        if (this.state.categoryName ===''||this.state.categoryName===null)
        {
            errMessage = "Category Name cannot be blank"
        }
        if (this.state.status ===''||this.state.status===null)
        {
            errMessage = "Status cannot be blank"
        }
        if (this.state.budget ===''||this.state.budget===null||!Number(this.state.budget))
        {
            errMessage = "Amount cannot be blank, must be numeric"
        }
        if (errMessage !== null)
        {
            toast.info(errMessage)
        }
        else
        {
            if (this.state.categoryid === '_add')
            {
                this.setState({categoryid:null})
            }
            let category = {
                categoryName: this.state.categoryName,
                budget: this.state.budget,
                w1: this.state.w1,
                w2: this.state.w2,
                w3: this.state.w3,
                w4: this.state.w4,
                w5: this.state.w5,
                wtotal: this.state.wtotal,
                expnet: this.state.expnet,
                status: this.state.status,
                categoryid: this.state.categoryid
            };
            if(this.state.categoryid === '_add' )
            {
                let category = {
                    categoryName: this.state.categoryName,
                    budget: this.state.budget,
                    w1: this.state.w1,
                    w2: this.state.w2,
                    w3: this.state.w3,
                    w4: this.state.w4,
                    w5: this.state.w5,
                    wtotal: this.state.wtotal,
                    expnet: this.state.expnet,
                    status: this.state.status,
                    categoryid: null
                };
                await CategoryService.createCategory(category);
                toast.info("Record Added");
            }
            else
            {
                await CategoryService.updateCategory(category, this.state.categoryid)
                toast.info("Record Updated");
            }
            this.props.history.push(`/listcategoryviewcomponent`);
        }
    }
    
    changeCategoryNameHandler= (event) => {
        this.setState({categoryName: event.target.value});
    }

    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }


    changeBudgetHandler= (event) => { 
        const re = /^[0-9\b].+$/;
        // const re = /^[+-]?\d*(?:[.,]\d*)?$/;
        if (event.target.value === '' || re.test(event.target.value)) {
           this.setState({budget: event.target.value})
        }
    }

    cancel(){
        this.props.history.push(`/listcategoryviewcomponent`);
    }

    getTitle(){
        if(this.state.categoryid === null){
            return <h3 style = {{fontSize : '30px'}} className="text-center">Add Category</h3>
        }else{
            return <h3 style = {{fontSize : '30px'}} className="text-center">Update Category</h3>
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
                                        <div className = "form-group">
                                            <label  style = {{padding:0,fontSize : '30px'}}> Category: </label>
                                            <input style = {{paddingTop:0, paddingBottom:0,padding:0, fontSize : '30px'}} placeholder="categoryname" name="categoryName" 
                                                className="form-control" 
                                                readOnly = {this.state.isReadOnly} 
                                                value={this.state.categoryName} 
                                                onChange={this.changeCategoryNameHandler}
                                                />
                                        </div>
                                        <br></br>
                                        <div className = "form-group">
                                            <label style = {{padding:0, fontSize : '30px'}}> Budget: </label>
                                            <input  style = {{paddingTop:0, paddingBottom:0,padding:0, fontSize : '30px'}}placeholder="budget" name="budget" 
                                                className="form-control" 
                                                readOnly = {this.state.isReadOnly} 
                                                value={this.state.budget} 
                                                onChange={this.changeBudgetHandler}
                                                />
                                        </div>
                                        <br></br>
                                        <div className = "form-group">
                                            <label style = {{padding:0, fontSize : '30px'}}> Status: </label>
                                            <input  style = {{paddingTop:0, paddingBottom:0,padding:0, fontSize : '30px'}}
                                                placeholder="status" 
                                                name="status" 
                                                className="form-control" 
                                                readOnly = {this.state.isReadOnly} 
                                                value={this.state.status} 
                                                onChange={this.changeStatusHandler}
                                                />
                                        </div>
                                        <br></br>
                                        <button style = {{fontSize : '30px'}} className="btn btn-success" onClick={this.saveOrUpdateCategory}>Save</button>
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

export default CreateCategoryComponent

import React, { Component } from 'react'
import CategoryService from '../Services/CategoryService'
import ExpenseService from '../Services/ExpenseService'

class UpdateCategoryComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            c:[],
            category: [],
            expense:[],
            categoryId:null,
            categoryName:null
        }
    }

    componentDidMount= async (event)=>{
        //loop thru expenses and update category weekly bucket and wtotal and expnet
        ExpenseService.getExpense().then(async(res_1) => {
            if (res_1.data.length > 0) 
            {
                for (let i = 0; i < res_1.data.length; i++) 
                {
                    const res = await CategoryService.getCategoryById(res_1.data[i].categoryId);
                    let category = {
                        categoryid  : res.data.categoryid,
                        categoryName : res.data.categoryName,
                        budget: res.data.budget,
                        w1 : res.data.w1,
                        w2 : res.data.w2,
                        w3 : res.data.w3,
                        w4 : res.data.w4,
                        w5 : res.data.w5,
                        wtotal : res.data.wtotal,
                        expnet: res.data.expnet,
                        status : res.data.status
                    }
                    if (res_1.data[i].week === 1)
                    {
                        category.w1 = category.w1 + res_1.data[i].amount;
                    };
                    if (res_1.data[i].week === 2)
                    {
                        category.w2 = category.w2 + res_1.data[i].amount;
                    };
                    if (res_1.data[i].week === 3)
                    {
                        category.w3 = category.w3 + res_1.data[i].amount;
                    };
                    if (res_1.data[i].week === 4)
                    {
                        category.w4 = category.w4 + res_1.data[i].amount;
                    };
                    if (res_1.data[i].week === 5)
                    {
                        category.w5 = category.w5 + res_1.data[i].amount;
                    };
                    
                    category.wtotal = category.wtotal + res_1.data[i].amount;
                    category.expnet = (category.budget - category.wtotal) * -1;

                    await CategoryService.updateCategory(category, res_1.data[i].categoryId);
                }
            }   
        });
    }

    render() {
        return (
            <div>
                 <h2 style={{textAlign: 'center'}}>Updating Category Totals 2</h2>
                        <br></br>
            </div>
        )
    }
}

export default UpdateCategoryComponent
import React, { Component } from 'react'
import CategoryViewService from '../Services/CategoryViewService'

class ListCategoryWeeklyViewComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: [],
            categoryweekly:[],
            holder:' ',
            totalbudget:0.00,
            weeklybudget:0.00,
            totalexpense:0.00,
            totalnet:0.00,
            tw1:0.00,
            tw2:0.00,
            tw3:0.00,
            tw4:0.00,
            tw5:0.00,
            month:0
        }

    }

    componentDidMount= async (event)=>{
        var today = new Date();
        this.setState({month:today.getMonth()+1})
        this.setState({month:3})

        CategoryViewService.getCategoryView().then((res_1) => {
            this.setState({categoryweekly: res_1.data});
            this.setState({categoryweekly: this.state.categoryweekly.filter(categoryweekly => categoryweekly.status === 'W')});
            this.setState({weeklybudget: this.state.categoryweekly.reduce((xtotal, currentValue) => xtotal = xtotal + currentValue.budget,0)});
            this.setState({totalexpense: this.state.categoryweekly.reduce((total, currentValue) => total = total + currentValue.wtotal,0)});
            this.setState({totalnet: this.state.categoryweekly.reduce((total, currentValue) => total = total + (currentValue.expnet),0)});
            this.setState({tw1: this.state.categoryweekly.reduce((total, currentValue) => total = total + currentValue.w1,0)});
            this.setState({tw2: this.state.categoryweekly.reduce((total, currentValue) => total = total + currentValue.w2,0)});
            this.setState({tw3: this.state.categoryweekly.reduce((total, currentValue) => total = total + currentValue.w3,0)});
            this.setState({tw4: this.state.categoryweekly.reduce((total, currentValue) => total = total + currentValue.w4,0)});
            this.setState({tw5: this.state.categoryweekly.reduce((total, currentValue) => total = total + currentValue.w5,0)});
        });

        CategoryViewService.getCategoryView().then((res) => {
            this.setState({category: res.data});
            this.setState({totalbudget: this.state.category.reduce((total, currentValue) => total = total + currentValue.budget,0)});
            // this.setState({totalexpense: this.state.category.reduce((total, currentValue) => total = total + currentValue.wtotal,0)});
            // this.setState({totalnet: this.state.category.reduce((total, currentValue) => total = total + (currentValue.expnet),0)});
            // this.setState({tw1: this.state.category.reduce((total, currentValue) => total = total + currentValue.w1,0)});
            // this.setState({tw2: this.state.category.reduce((total, currentValue) => total = total + currentValue.w2,0)});
            // this.setState({tw3: this.state.category.reduce((total, currentValue) => total = total + currentValue.w3,0)});
            // this.setState({tw4: this.state.category.reduce((total, currentValue) => total = total + currentValue.w4,0)});
            // this.setState({tw5: this.state.category.reduce((total, currentValue) => total = total + currentValue.w5,0)});
//            this.setState({weeklybudget: this.state.totalbudget/4})
        });

    }

    render() {
        return (
            <div>
                 <h2 style={{textAlign: 'center'}}>Category Weekly List (month:  {this.state.month})</h2>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Category</th>
                                    <th> Budget</th>
                                    <th> Week 1</th>
                                    <th> Week 2</th>
                                    <th> Week 3</th>
                                    <th> Week 4</th>
                                    <th> Week 5</th>
                                    <th> Total Exp</th>
                                    <th> Difference</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.category.map(
                                        category => 
                                        <tr key = {category.categoryid}>
                                            <td width='1%'>{this.state.holder}</td>
                                            <td width = '15%'> {category.categoryname} </td>   
                                            <td width = '10%'> {category.budget} </td>   
                                            {/* <td width = '10%' style={{fontsize: 30, fontweight: 'ultrabold', color:((category.budget/4)-category.w1) < 0 ? "red" : "green"}}> {category.w1 >0 ? category.w1.toFixed(2) : null} </td>    */}
                                            <td width = '10%'> {category.w1 >0 ? category.w1.toFixed(2) : null} </td>   
                                            <td width = '10%'> {category.w2 >0 ? category.w2.toFixed(2) : null} </td>   
                                            <td width = '10%'> {category.w3 >0 ? category.w3.toFixed(2) : null} </td>   
                                            <td width = '10%'> {category.w4 >0 ? category.w4.toFixed(2) : null} </td>   
                                            <td width = '10%'> {category.w5 >0 ? category.w5.toFixed(2) : null} </td>   
                                            <td width = '10%'> {category.wtotal} </td>   
                                            <td width = '10%' style={{fontsize: 30, fontweight: 'ultrabold', color: category.expnet >= 0 ? "red" : "green"}}> {category.expnet} </td>   
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <table>
                            {/* <tfoot>
                                <td width='1%'>{this.state.holder}</td>
                                <td width='15%'>Totals</td>
                                <td width = '10%'>Month: {this.state.totalbudget} per Week: {this.state.weeklybudget} </td>
                                <td width = '10%'>W1: {this.state.tw1.toFixed(2)} </td>
                                <td width = '10%'>W2: {this.state.tw2.toFixed(2)} </td>
                                <td width = '10%'>W3: {this.state.tw3.toFixed(2)} </td>
                                <td width = '10%'>W4: {this.state.tw4.toFixed(2)} </td>
                                <td width = '10%'>W5: {this.state.tw5.toFixed(2)} </td>
                                <td width = '10%'>Total Exp: {this.state.totalexpense.toFixed(2)} </td>
                                <td width = '10%' style={{fontsize: 30, fontweight: 'ultrabold', color: this.state.totalnet <= 0 ? "green" : "red"}}>Net: {this.state.totalnet.toFixed(2)} </td>
                            </tfoot> */}
                        </table>
                        <br></br>
                        <div style={{marginLeft: '10px'}}>Total Budget: {this.state.totalbudget.toFixed(0)}</div>
                        <br></br>
                        <div style={{marginLeft: '10px'}}>Weekly Budget (no Liquor\Fowler\Hair\Nails): {(this.state.weeklybudget/4).toFixed(0)}</div>
                        <div style={{marginLeft: '10px'}}> Week 1: &nbsp;&nbsp;{this.state.tw1.toFixed(0)} &nbsp;&nbsp;&nbsp;&nbsp;({(((this.state.weeklybudget/4)- this.state.tw1)*-1).toFixed(0)})</div>
                        <div style={{marginLeft: '10px'}}> Week 2: &nbsp;&nbsp;{this.state.tw2.toFixed(0)} &nbsp;&nbsp;&nbsp;&nbsp;({(((this.state.weeklybudget/4)- this.state.tw2)*-1).toFixed(0)})</div>
                        <div style={{marginLeft: '10px'}}> Week 3: &nbsp;&nbsp;{this.state.tw3.toFixed(0)} &nbsp;&nbsp;&nbsp;&nbsp;({(((this.state.weeklybudget/4)- this.state.tw3)*-1).toFixed(0)})</div>
                        <div style={{marginLeft: '10px'}}> Week 4: &nbsp;&nbsp;{this.state.tw4.toFixed(0)} &nbsp;&nbsp;&nbsp;&nbsp;({(((this.state.weeklybudget/4)- this.state.tw4)*-1).toFixed(0)})</div>
                        <div style={{marginLeft: '10px'}}> Week 5: &nbsp;&nbsp;{this.state.tw5.toFixed(0)} &nbsp;&nbsp;&nbsp;&nbsp;({(((this.state.weeklybudget/4)- this.state.tw5)*-1).toFixed(0)})</div>
                        <br></br>
                        <div style={{marginLeft: '10px'}}>Total Expense MTD:  {this.state.totalexpense.toFixed(0)}</div>
                        <div style={{marginLeft: '10px'}}>Left to Spend:  {this.state.totalnet.toFixed(0) * -1}
                        </div>
                        <br></br>
                        <br></br>
                        {/* <ToastContainer position="top-center" autoClose={1000}/> */}
                 </div>
            </div>
        )
    }
}

export default ListCategoryWeeklyViewComponent
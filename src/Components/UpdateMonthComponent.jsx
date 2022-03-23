import React, { Component } from 'react'
import MonthService from '../Services/MonthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
   
class UpdateMonthComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isReadOnly:false,
            monthx:[],
            selmonth:0
        }
        
        this.saveOrUpdateMonth = this.saveOrUpdateMonth.bind(this);
    }

    componentDidMount= async (event)=>{
        await MonthService.getMonthById(1).then((res) => {
            this.setState({selmonth: res.data.month})
        });
    };
    
    saveOrUpdateMonth = async (e)=>{
        e.preventDefault();
        var errMessage = null
        if (this.state.selmonth ===''||this.state.selmonth===null||this.state.selmonth < 1 ||this.state.selmonth > 12)
        {
            errMessage = "Month Invalid - must be 1-12"
        }
        if (errMessage !== null)
        {
            toast.info(errMessage)
        }
        else
        {
            let monthx = {
                monthid: 1,
                month: this.state.selmonth,
            };
            var monthid = 1
            await MonthService.updateMonth(monthx, monthid);
            this.props.history.push(`/updatecategorycomponent`);
        }
    }
    
    changeMonthHandler= (event) => {
        const re = /^[0-9\b].+$/;
        // const re = /^[+-]?\d*(?:[.,]\d*)?$/;
        if (event.target.value === '' || re.test(event.target.value)) {
           this.setState({selmonth: event.target.value})
        }
    }

    cancel(){
        this.props.history.push(`/updatecategorycomponent`);
    }

    getTitle(){
            return <h3 style = {{fontSize : '30px'}} className="text-center">Update Month</h3>
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
                                            <label  style = {{fontSize : '30px'}}> Month: </label>
                                            <input style = {{fontSize : '30px'}} placeholder="month" name="month" 
                                                className="form-control" 
                                                readOnly = {this.state.isReadOnly} 
                                                value={this.state.selmonth} 
                                                onChange={event => this.setState({selmonth: event.target.value.replace(/\D/,'')})}
                                                />
                                        </div>
                                        <button style = {{fontSize : '30px'}} className="btn btn-success" onClick={this.saveOrUpdateMonth}>Save</button>
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

export default UpdateMonthComponent

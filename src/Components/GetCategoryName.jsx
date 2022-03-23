import { Component } from 'react';
import CategoryService from '../Services/CategoryService'

class GetCategoryNameComponent extends Component {
    constructor (props){
        super(props)
        this.state = {
            categoryName: '',
            category:[]
        }
    }

    componentDidMount= async (event)=>{
        CategoryService.getCategoryById(parseInt(this.props.datafromparent)).then( (res) =>{
            let category=res.data;
            this.setState({categoryName: category.categoryName});
        });
      
    }
    render() {
        return this.state.categoryName
    }
}
export default GetCategoryNameComponent;
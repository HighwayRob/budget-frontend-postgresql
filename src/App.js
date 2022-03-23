import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Sidebar from './Components/Sidebar';

//import ListCategoryComponent from './Components/ListCategoryComponent';
//import UpdateCategoryComponent2 from './Components/UpdateCategoryComponent2';
//import ListViewComponent from './Components/ListExpenseSummaryViewComponent';

import UpdateCategoryComponent from './Components/UpdateCategoryComponent';
import ListCategoryViewComponent from './Components/ListCategoryViewComponent';
import ListCategoryWeeklyViewComponent from './Components/ListCategoryWeeklyViewComponent';
import ListExpenseComponent from './Components/ListExpenseComponent';
import CreateExpenseComponent from './Components/CreateExpenseComponent';
import UpdateMonthComponent from './Components/UpdateMonthComponent';
import ClearMonthComponent from './Components/ClearMonthComponent';
import CreateCategoryComponent from './Components/CreateCategoryComponent';

function App() {
  return (
    <div>
        <Router>
          <Sidebar />
            <div className="container">
              <Switch> 
                <Route path = "/" exact component = {ListCategoryWeeklyViewComponent}></Route>
                <Route path = "/listcategoryweeklyviewcomponent" component = {ListCategoryWeeklyViewComponent}></Route>
                <Route path = "/updatecategorycomponent" exact component = {UpdateCategoryComponent}></Route>
                <Route path = "/listcategoryviewcomponent" exact component = {ListCategoryViewComponent}></Route>
                <Route path = "/createexpensecomponent" exact component = {CreateExpenseComponent}></Route>
                <Route path = "/listexpensecomponent" exact component = {ListExpenseComponent}></Route>
                <Route path = "/updatemonthcomponent" exact component = {UpdateMonthComponent}></Route>
                <Route path = "/clearmonthcomponent" exact component = {ClearMonthComponent}></Route>
                <Route path = "/createcategorycomponent/:categoryid" exact component = {CreateCategoryComponent}></Route>
              </Switch>
            </div>
        </Router>
    </div>
  );
}
export default App;

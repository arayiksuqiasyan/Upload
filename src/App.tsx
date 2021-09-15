import React, {Suspense} from 'react';
import NavBarList from "./componet/NavBarList";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {BasketPage, HomePage, SubPage, TextPage} from "./pages";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Route path={"/"} component={NavBarList}/>
                <Suspense fallback={<></>}>
                    <Switch>
                        <Route path={"/"} exact component={HomePage}/>
                        <Route path={'/file/:id/'} component={SubPage}/>
                        <Route path={'/text/:id/'} component={TextPage}/>
                        <Route path={'/basket'} component={BasketPage}/>
                    </Switch>
                </Suspense>
            </div>

        </BrowserRouter>
    );
}

export default App;

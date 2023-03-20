import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header} from "./header/Header";

class App extends React.Component<any,any>{
    render(){
        return(
            <>
                <Header></Header>
                <main>
                    {this.props.children}
                </main>
            </>
        )
    }
}

export default App;

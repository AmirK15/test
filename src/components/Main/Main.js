import React, {Component, Suspense} from 'react';
import Table from "../Table/Table";

class Main extends Component {
    render() {
        return (
            <main>
                {/*<Suspense fallback={<div className='suspense'>Загрузка...</div>}>*/}
                {/*Хотелось добавить Suspense для большей оптимизации, но по каким-то причинам он не работает(*/}
                    <Table/>
                {/*</Suspense>*/}
            </main>
        );
    }
}

export default Main;
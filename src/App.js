import React, { useEffect, useState} from 'react';
import Main from "./components/Main/Main";
import { collection, getDocs } from "firebase/firestore";
import {db} from "./firebase";

const App = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const shops = getDocs(collection(db, 'shops'))
            .then((res) => setData(res.docs.map(el => ({...el.data(), id:el.id}))))
    }, [])

    return (
        <Main data={data} setData={setData}/>
    );
};

export default App;
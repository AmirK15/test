import React, {Suspense} from 'react';
import Main from "./components/Main/Main";

const App = () => {
    return (
        <Suspense fallback={'Loading...'}>
            <Main/>
        </Suspense>
    );
};

export default App;
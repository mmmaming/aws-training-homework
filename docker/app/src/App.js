import {useEffect, useState} from 'react';
import './App.css';

function App() {
    const [list, setList] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3004/users').then(async res => {
            const {users} = await res.json();
            console.log(users, '3004');
            setList(users);
        });
    }, []);
    return (
        <div className="App">
            {
                list.map(item => (
                    <div key={item.name}>
                        {item.name}
                    </div>
                ))
            }
        </div>
    );
}

export default App;

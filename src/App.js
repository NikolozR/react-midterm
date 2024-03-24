import './App.css';

import useToken from './service/Authentication/useToken';


function App() {
  const {data} = useToken({
    "email": "john@mail.com",
    "password": "changeme"
  })
  console.log(data);
  return (
    <div className="test">
      {data?.access_token}
    </div>
  );
}

export default App;

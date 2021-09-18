import React, { useState } from 'react';

function App() {

  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])

  return (
    <div>
      {data}
      
    </div>
  );
}

const Block = () => {
  return <div></div>
}

export default App;

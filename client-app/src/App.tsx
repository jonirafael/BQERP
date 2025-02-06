import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header,List } from "semantic-ui-react";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(Response => {
        setItems(Response.data)
      })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='BQ ERP'  /> 
      <List>
        {items.map((item: any) => (
          <List.Item key={item.id}>
            {item.itemName}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;

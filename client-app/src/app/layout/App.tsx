import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Item } from "../models/item";
import NavBar from "./NavBar";
import ItemDashboard from "../../features/Items/dashboard/ItemDashboard";
import {v4 as uuid} from 'uuid';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Item[]>("http://localhost:5000/api/items").then((Response) => {
      setItems(Response.data);
    });
  }, []);

  function handleSelectItem(id: string) {
    setSelectedItem(items.find((x) => x.id === id));
  }

  function handleCancelSelectItem() {
    setSelectedItem(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectItem(id) : handleCancelSelectItem();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(item: Item) {
    item.id
      ? setItems([...items.filter(x => x.id !== item.id), item])
      : setItems([...items, {...item, id: uuid()}]);
    setEditMode(false);
    setSelectedItem(item);
  }

  function handleDeleteItem(id: string) {
    setItems([...items.filter(x => x.id !== id)])
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ItemDashboard
          items={items}
          selectedItem={selectedItem}
          selectItem={handleSelectItem}
          cancelSelectItem={handleCancelSelectItem}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteItem={handleDeleteItem}
        />
      </Container>
    </Fragment>
  );
}

export default App;

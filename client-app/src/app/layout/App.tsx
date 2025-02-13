import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Item } from "../models/item";
import NavBar from "./NavBar";
import ItemDashboard from "../../features/Items/dashboard/ItemDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Items.list().then((response) => {
      setItems(response);
      setLoading(false);
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
    setSubmitting(true);
    if (item.id) {
      agent.Items.update(item).then(() => {
        setItems([...items.filter((x) => x.id !== item.id), item]);
        setSelectedItem(item);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      item.id = uuid();
      agent.Items.create(item).then(()=> {
        setItems([...items,item])
        setSelectedItem(item);
        setEditMode(false);
        setSubmitting(false);        
      })
    }
  }

  function handleDeleteItem(id: string) {
    setSubmitting(true);
    agent.Items.delete(id).then(() => {
      setItems([...items.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponent content="Loading app" />;

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
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;

import { Grid } from "semantic-ui-react";
import { Item } from "../../../app/models/item";
import ItemList from "./ItemList";
import ItemDetails from "../details/ItemDetails";
import ItemForm from "../form/ItemForm";

interface Props {
  items: Item[];
  selectedItem: Item | undefined;
  selectItem: (id: string) => void;
  cancelSelectItem: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (item: Item) => void;
  deleteItem: (id: string) => void;
}

export default function ItemDashboard({
  items,
  selectedItem,
  selectItem,
  cancelSelectItem,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteItem,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ItemList
          items={items}
          selectItem={selectItem}
          deleteItem={deleteItem}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedItem && !editMode && (
          <ItemDetails
            item={selectedItem}
            cancelSelectItem={cancelSelectItem}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ItemForm
            closeForm={closeForm}
            item={selectedItem}
            createOrEdit={createOrEdit}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

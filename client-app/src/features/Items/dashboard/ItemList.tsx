import { SyntheticEvent, useState } from "react";
import { Itemmm } from "../../../app/models/item";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props {
  items: Itemmm[];
  selectItem: (id: string) => void;
  deleteItem: (id: string) => void;
  submitting: boolean;
}

export default function ItemList({
  items,
  selectItem,
  deleteItem,
  submitting,
}: Props) {
  const [target, setTarget] = useState("");

  function handleItemDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteItem(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {items.map((item) => (
          <Item key={item.id}>
            <Item.Content>
              <Item.Header as="a">{item.itemName}</Item.Header>
              <Item.Description>{item.description}</Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectItem(item.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={item.id}
                  loading={submitting && target === item.id}
                  onClick={(e) => handleItemDelete(e, item.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={item.itemCode ?? "no code"} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}

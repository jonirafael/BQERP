import {
    Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Image,
} from "semantic-ui-react";
import { Item } from "../../../app/models/item";

interface Props {
  item: Item;
  cancelSelectItem: () => void;
  openForm: (id: string) => void;
}

export default function ItemDetails({ item, cancelSelectItem, openForm }: Props) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${item.itemName}.jpg`} />
      <CardContent>
        <CardHeader>{item.itemName}</CardHeader>
        <CardMeta>
          <span>{item.itemCode}</span>
        </CardMeta>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <ButtonGroup>
            <Button onClick={() => openForm(item.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectItem} basic color='grey' content='Cancel' />
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}

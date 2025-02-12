import { Button, Form, Segment } from "semantic-ui-react";
import { Item } from "../../../app/models/item";
import { ChangeEvent, useState } from "react";

interface Props {
    item: Item | undefined;
    closeForm: () => void;
    createOrEdit: (item: Item) => void;
}

export default function ItemForm({item: selectedItem, closeForm, createOrEdit}: Props) {

    const initialState = selectedItem ?? {
        id: '',
        itemCode: '',
        itemName: '',
        description: ''
    }

    const [item, setItem] = useState(initialState);

    function handleSubmit() {
        createOrEdit(item);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setItem({...item,[name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off' >
                <Form.Input placeholder='Item Code' value={item.itemCode} name='itemCode' onChange={handleInputChange} />
                <Form.Input placeholder='Item Name' value={item.itemName} name='itemName' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={item.description} name='description' onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}
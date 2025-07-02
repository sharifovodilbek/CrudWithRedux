
import {
    Button,
    TextField,
    Stack,
    Box
} from "@mui/material"
import { useState, useEffect } from "react"
import type { Product } from "../modules/productReducer"

type Props = {
    onSubmit: (product: Omit<Product, "id">, id?: number) => void
    editData: Product | null
}

export default function ProductForm({ onSubmit, editData }: Props) {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        if (editData) {
            setTitle(editData.title)
            setPrice(String(editData.price))
            setDescription(String(editData.description))
        }
    }, [editData])

    const handleSubmit = () => {
        if (!title || !price) return
        onSubmit({ title, price: +price, description }, editData?.id)
        setTitle("")
        setPrice("")
    }

    return (
        <Box mb={5} >
            <Stack direction="row" spacing={2}>
                <TextField
                    label="Product name"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField
                    label="Product price"
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    sx={{ backgroundColor: "#4caf50" }}
                >
                    {editData ? "Update" : "Create"}
                </Button>

            </Stack>
        </Box>
    )
}

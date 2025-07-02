
import { Container, Typography,  Divider } from "@mui/material"
import Grid from "@mui/material/Grid" 

import { useEffect, useReducer, useState } from "react"
import { API } from "../service/axios"
import {
  productReducer,
  initialState,
  type Product
} from "../modules/productReducer"
import ProductForm from "../components/ProductForm"
import ProductCard from "../components/ProductCard"

export default function Home() {
  const [state, dispatch] = useReducer(productReducer, initialState)
  const [editData, setEditData] = useState<Product | null>(null)

  useEffect(() => {
    API.get("/products?limit=8").then(res =>
      dispatch({ type: "SET_PRODUCTS", payload: res.data.products })
    )
  }, [])

  const createOrUpdateProduct = (data: Omit<Product, "id">, id?: number) => {
    if (id) {
      API.put(`/products/${id}`, data).then(() => {
        dispatch({ type: "UPDATE_PRODUCT", payload: { id, ...data } })
        setEditData(null)
      })
    } else {
      const fakeId = Math.floor(Math.random() * 10000)
      const newProduct = { id: fakeId, ...data }
      dispatch({ type: "ADD_PRODUCT", payload: newProduct })
    }
  }

  const deleteProduct = (id: number) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id })
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography  align="center" p={3} variant="h4" gutterBottom>Mahsulotlar ro'yxati</Typography>
      <ProductForm onSubmit={createOrUpdateProduct} editData={editData} />
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={2}>
        {state.products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              product={product}
              onDelete={deleteProduct}
              onEdit={setEditData}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

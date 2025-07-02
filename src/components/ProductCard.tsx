import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography
} from "@mui/material";
import type { Product } from "../modules/productReducer";

type Props = {
    product: Product;
    onDelete: (id: number) => void;
    onEdit: (product: Product) => void;
};

export default function ProductCard({ product, onDelete, onEdit }: Props) {
    return (
        <Card sx={{ mb: 2, backgroundColor: "#4caf50", width: 270, height: 355 }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                    {product.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                    Price: ${product.price}
                </Typography>
                <Typography color="info">
                    Description: {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    sx={{
                        backgroundColor: "#bdbdbd",
                        "&:hover": { backgroundColor: "#9e9e9e" },
                        border: "2px solid",
                    }}
                    size="small"
                    color="info"
                    onClick={() => onEdit(product)}
                >
                    Edit
                </Button>
                <Button
                    sx={{
                        backgroundColor: "#bdbdbd",
                        "&:hover": { backgroundColor: "#9e9e9e" },
                        border: "2px solid",
                    }}
                    size="small"
                    color="error"
                    onClick={() => onDelete(product.id)}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

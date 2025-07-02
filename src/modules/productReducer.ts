export interface Product {
  id: number
  title: string
  price: number
  description:string
  
}

type State = {
  products: Product[]
}

type Action =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: number }
  | { type: "UPDATE_PRODUCT"; payload: Product }

export const initialState: State = {
  products: []
}

export function productReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload }
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] }
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload)
      }
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id ? action.payload : p
        )
      }
    default:
      return state
  }
}

export interface OrderInfo {
    id: string
    name: string
    deadline: number
    customer_id: string
    processes: Proccess[]
}

export interface Proccess {
    id: string
    name: string
    customer_id: string
}
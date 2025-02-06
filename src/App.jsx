import {useState} from "react";


export default function App() {
    const [items, setItems] = useState([]);
    // const [itemsCount,setItemsCount] = useState(0);

    const itemsCount = items.length;
    function handleAddItem(item) {
        setItems((items) => [...items, item]);//sprate operatorü
    }

    const handleRemoveItem = (id) => {
        setItems(items=>items.filter(item=>item.id!==id));
    }

    const handleUpdate = (id)=>{
        setItems(items=>items.map(item=>item.id == id ? {...item,completed: !item.completed}:item));
    }

    const handleClearList = ()=>{
        const onay = window.confirm("Are you sure you want to clear this item?");
        if(onay){
            setItems([]);
        }
    }
    return (
        <>
            <Header/>
            <Form onAddItem={handleAddItem} onClearList={handleClearList}/>
            <List items={items} onDeleteItem={handleRemoveItem} handleUpdate={handleUpdate} />
            <Summary items={items}/>
        </>
    )
}

    function Header() {
        return <h1>🛒 Shooping List</h1>
    }



    function Form({onAddItem,onClearList}) {
        const [title, setTitle] = useState("");
        const [quantity, setQuantity] = useState(2);
        function handleFormSubmit(e)
        {
            e.preventDefault();
            if (title)
            {
                const item = {id:Date.now(),title, quantity,completed:false};
                console.log(item)


                onAddItem(item);
                setTitle("");
                setQuantity(1);
            }
            else {
                alert("Lütfen ürün giriniz")
            }

        }
        return(
            <form className="form" onSubmit={handleFormSubmit}>
                <input  type="text" placeholder={"Ürün Adını giriniz"} value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <select value={quantity} onChange={(e)=>setQuantity(e.target.value)}>
                    {Array.from({length:10},(v,i)=>i+1).map(number=><option key={number} value={number}>{number}</option>)}
                </select>
                <button type={"submit"}>➕ Ekle</button>
                <button type={"button"} onClick={onClearList}>🗑️ Temizle</button>
            </form>
        )
    }

    function List({items,onDeleteItem,handleUpdate}) {
        return(
            <div className="list">
                <ul>
                    {
                        items.map((item,index) => (
                       <Item item={item} key={index} onDeleteItem={onDeleteItem} handleUpdate={handleUpdate}/>
                    ))}


                </ul>
            </div>
        )
    }

    function Item({item,onDeleteItem,handleUpdate}) {
        return(
            <li>
                <input type="checkbox" checked={item.completed} onChange={()=>handleUpdate(item.id)}/>
                <span style={item.completed ? {textDecoration:"line-through"}:{}}>{item.title} {item.quantity}</span>
                <button onClick={()=>onDeleteItem(item.id)}>X</button>
            </li>
        )
    }

    function Summary({items}) {

        return (
            <footer className={"footer"}>Alışveriş sepetinizde {items.length} ürün bulunmaktadır</footer>
        )

    }



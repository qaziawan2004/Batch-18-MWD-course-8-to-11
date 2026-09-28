import { useState } from "react"

const TodoApp = () => {

    const [noteInput, setNoteInput] = useState("")

    const [noteArr, setNoteArr] = useState([])


    const [editIndexNumber, setEditIndexNumber] = useState("")

    const [editInput, setEditInput] = useState("")

    const addNoteHandler = (event) => {
        event.preventDefault()
        // console.log("noteInput",noteInput);
        // console.log("event",event);

        noteArr.push(noteInput)
        setNoteArr([...noteArr])
        setNoteInput(" ")
    }

    const deleteHandler = (index) => {
        console.log("deleteHandler", index);
        noteArr.splice(index, 1)
        setNoteArr([...noteArr])

    }

    const editHandler = (index) => {
        console.log("editHandler", index);
        setEditIndexNumber(index)
        const value = noteArr[index]
        console.log("value", value);
        setEditInput(value)
        setEditIndexNumber(index)

    }


    const saveHandler = (index) => {
        console.log(index);
        noteArr[editIndexNumber] = editInput
        console.log("noteArr after update",index);
        setNoteArr(...noteArr)
        setEditIndexNumber("")
        
    }


    console.log("noteArr", noteArr);
    console.log(editIndexNumber);




    return (

        <>

            <h1>My Notes</h1>
            <div>
                {/* <form action="" onSubmit={(e)=>addNoteHandler(e)}></form> */}
                <form onSubmit={addNoteHandler}>
                    <input type="text" value={noteInput} placeholder="Enter your notes..." onChange={(e) => setNoteInput(e.target.value)} />

                    <button onClick={addNoteHandler}>Add Notes</button>
                    <button type="button">Delete All</button>
                </form>
            </div>

            {/* notes listing*/}


            <div>

                {

                        noteArr && noteArr.map((val, index) => {
                           return (

                            // 1 ===

                    index === editIndexNumber ?
                        <div>
                            <input type="text" placeholder="Edit input" onChange={(e) => setEditInput(e.target.value)} />
                            <button onClick={saveHandler}>Save</button>
                            <button onClick={()=>setEditIndexNumber("")}>Cancel</button>
                        </div> :
                                <div key={index}>
                                    <p>{val}</p>

                                    <button onClick={() => editHandler(index)}>Edit</button>
                                    {/* <button  onClick={(e)=> deleteHandler(index)}>Delete</button> */}
                                    <button onClick={() => deleteHandler(index)}>Delete</button>

                                </div>

                            )
                        })
                }

            </div>
        </>
    )
}
export default TodoApp
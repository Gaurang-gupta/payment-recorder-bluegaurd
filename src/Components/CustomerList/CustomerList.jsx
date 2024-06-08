import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { collection, getDocs } from "firebase/firestore";
import { TableDemo } from '../TableComponent/Tablehelper';

function CustomerList() {
    const [data, setData] = useState([])
    const getDocuments = async() => {
        const querySnapshot = await getDocs(collection(db, "Orders"));
        let temp = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            temp.push({id: doc.id, ...doc.data()})
        });
        console.log("temp data is", temp)
        setData([...temp])
    }
    useEffect(() => {
        getDocuments()
    },[])
    console.log("data in state variable is ", data)

    return (
        <div>
            <h1 className='text-3xl text-center pt-5 pb-8'>Customer List</h1>
            <TableDemo data={data}/>
        </div>
    )
}

export default CustomerList
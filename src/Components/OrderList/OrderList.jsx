import { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { collection, getDocs } from "firebase/firestore";
import { TableDemo } from '../TableComponent/TableHelperOrders';
function OrderList() {
    const [data, setData] = useState([])
    const stringifyService = (temp) => {
        let returnString = ""
        for(let i in temp){
            returnString += "{"
            returnString += "id:" + temp[i].id + " price:" + temp[i].price + " service:" + temp[i].service
            returnString += "}, "
        }
        return returnString
    }
    const getDocuments = async() => {
        const querySnapshot = await getDocs(collection(db, "Orders"));
        let temp = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            temp.push({id: doc.id, ...doc.data()})
        });
        console.log("temp data is", temp)
        let finalTemp = []
        for(let i in temp){
            let obj = {
                addressLine1: temp[i].addressLine1,
                city: temp[i].city,
                contactNumber: temp[i].contactNumber,
                email: temp[i].email,
                firstname: temp[i].firstname,
                id: temp[i].id,
                lastname: temp[i].lastname,
                nextServiceDate: temp[i].nextServiceDate,
                orderDate: temp[i].orderDate,
                postalCode: temp[i].postalCode,
                price: temp[i].price,
                serviceAvailable: stringifyService(temp[i].serviceAvailable),
                state: temp[i].state,
                taxSlab: temp[i].taxSlab,
                taxState: temp[i].taxState,
                total: temp[i].total,
                invoice_number: temp[i].invoice_number
            }
            finalTemp.push(obj)
        }
        setData([...finalTemp])
    }
    useEffect(() => {
        getDocuments()
    },[])
  return (
    <div>
        <h1 className='text-3xl pt-5 pb-8 text-center'>Order List</h1>
        <TableDemo data = {data}/>
    </div>
  )
}

export default OrderList
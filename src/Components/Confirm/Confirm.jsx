import React, { useContext, useEffect, useRef, useState } from 'react'
import { LoginContext } from '../../Contexts/LoginContext';
import { Link } from 'react-router-dom';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { useReactToPrint } from 'react-to-print';
import Invoice from '../Invoice/Invoice';

function Confirm() {
    const {orderData, customerData} = useContext(LoginContext)
    const [invoiceNumber, setInvoiceNumber] = useState(0)
    const navigate = useNavigate()
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const calculatePrice = () => {
        const price = orderData.price
        const tax = orderData.taxSlab
        try {
            const total = Number(price) + (tax * Number(price) / 100)
            return total
        } catch (error) {
            alert("Please fill the price correctly")
        }
    }

    const getCurrentDate = () => {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if(day < 10) {
            let currentDate = `0${day}-${month}-${year}`
            return currentDate
        }
        let currentDate = `${day}-${month}-${year}`;
        return currentDate
    }


    const addData = async () => {
        try {
            const docRef = await addDoc(collection(db, "Orders"), {
              ...orderData,
              ...customerData,
              total: calculatePrice(),
              orderDate: getCurrentDate(),
              invoice_number: invoiceNumber
            });
            alert("Document added successfully and invoice emailed");
            navigate("/")
            handlePrint()
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        try {
            const docRef = await addDoc(collection(db, "Invoice_numbers"), {
                invoice_number: invoiceNumber
            })
            console.log("Invoice number added successfully")
        } catch (e) {
            console.error("Error in invoice number uploading: ", e)
        }
    }

    const generateInvoice = async () => {
        const querySnapshot = await getDocs(collection(db, "Invoice_numbers"));
        let temp = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let tempObject = {id: doc.id, ...doc.data()}
            temp.push(tempObject.invoice_number)
        });
        temp.sort()
        temp.reverse()
        console.log(temp)

        const date = new Date();
        let month = String(date.getMonth() + 1);
        let year = String(date.getFullYear()).substring(2);
        if(month < 10) month = "0" + month
        let number = year + month
        let latest = String(temp[0]).substring(0,4)
        let latestNumber = Number(latest)
        let suffix = 0
        if(Number(number) !== latestNumber){
            suffix = 1
        } else {
            suffix = Number(String(temp[0]).substring(4)) + 1
        }
        let suffixString = String(suffix)
        while(suffixString.length < 4){
            suffixString = "0" + suffixString
        }
        let invoiceNumber = Number(number + suffixString)
        setInvoiceNumber(invoiceNumber)
    }

    useEffect(() => {
        generateInvoice()
    },[])

  return (
    <div>
        <div ref={componentRef}>
            <Invoice invoice={invoiceNumber}/>
        </div>
        <div className='flex justify-around pb-10'>
            <Link to="/orderDetails" className='px-7 py-2 bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-transform text-lg rounded-3xl mt-6 text-white'>Back</Link>
            <button onClick={addData} className='px-7 py-2 bg-green-400 hover:bg-green-500 hover:scale-105 transition-transform text-lg rounded-3xl mt-6'>Confirm</button>
        </div>
    </div>
  )
}

export default Confirm
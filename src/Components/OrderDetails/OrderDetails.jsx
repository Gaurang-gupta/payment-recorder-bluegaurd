import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Contexts/LoginContext';
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';

const services = [
    "Air duct cleaning",
    "Air exchanger cleaning",
    "Heat pump cleaning W/split unit",
    "Dryer vent cleaning",
    "Furnace blower cleaning",
    "Power cleaning with sweeper line method",
    "Central vacuum cleaning with outlet",
    "Sanitizing with spray bottle",
    "Sanitization with fogger",
    "Additional Services"
]

const commentsOption = [
    "Heating and cooling system checked. Systems working properly",
]

function OrderDetails() {
    // for service selection
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [price, setPrice] = useState(0)
    const [prevId, setPrevId] = useState(0)

    // for date data
    const [dateData, setDateData] = useState("")

    // for tax slab
    const [taxState, setTaxState] = useState("")
    const [taxSlab, setTaxSlab] = useState(0)

    // for comments
    const [comments, setComments] = useState("")


    const handleSelectedValueChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const history = useNavigate();
    const { orderData, updateOrderData } = useContext(LoginContext);
    const taxTable = {
        QC: 15,
        NS: 15,
        NB: 15,
        ONC: 13,
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        updateOrderData({
            nextServiceDate: dateData,
            serviceAvailable: selectedServices,
            price: subtotal(),
            taxSlab: taxSlab,
            taxState: taxState,
            comments: comments,
        })
        // Redirect to the next page
        history('/confirm');
    };

    const subtotal = () => {
        let price = 0
        for(let service in selectedServices){
            price += selectedServices[service].price
        }
        return price
    }
    const calculatePrice = () => {
        let price = subtotal() 
        price += (price * Number(taxSlab)) / 100
        return price;
    }

    const handleCategorySelection = (selectedCategory) => {
        setTaxState(selectedCategory)
        if(selectedCategory === "QC" || selectedCategory === "NS" || selectedCategory === "NB") {
            setTaxSlab(taxTable.NS)
        } else {
            setTaxSlab(taxTable.ONC)
        }
        calculatePrice()
    };

    const TDate = (e) => {
        const { name, value } = e.target;
        const userDate = value;
        setDateData(userDate)
    }

    const addData = (e) => {
        const dataObject = {
            id: prevId + 1,
            service: selectedValue,
            price: Number(price)
        }
        setPrevId(() => (prevId + 1))
        setSelectedServices([...selectedServices, dataObject])
        calculatePrice()
    }

    const removeData = (id) => {
        const temp = []
        for(let dataObject in selectedServices){
            if(selectedServices[dataObject].id !== id){
                temp.push(selectedServices[dataObject])
            }
        }
        setSelectedServices([...temp])
        calculatePrice()
    }

    const inputStyle = "py-1 px-3 flex-1 rounded-xl w-full lg:w-[90%]  border border-2 mb-3"
    const divStyle = 'flex sm:justify-between p-2 flex-col items-start mb-2'
    return (
        <div className='xs:w-[90%] sm:w-[90%] mx-auto xs:h-[100vh] lg:w-[90%]'>
            <h1 className='text-3xl text-center py-3'>Order Details</h1>
            <div className='flex justify-between flex-col lg:flex-row'>
                <div className='flex-1'>
                    <div className={divStyle}>
                        <label htmlFor="serviceAvailable" className='flex-1 xs:text-sm sm:text-md xs:mr-2 sm:mr-0'>Services Availed:</label>
                        <select id="serviceAvailable" value={selectedValue} onChange={handleSelectedValueChange} className={inputStyle}>
                            <option value="" disabled>
                                Select an option
                            </option>
                            {
                                services.map((service, index)=>(
                                    <option key={index} value={service}>
                                        {service}
                                    </option>
                                ))
                            }
                        </select>
                        <label htmlFor="price" className='flex-1 xs:text-sm sm:text-md xs:mr-9 sm:mr-0 mt-2'>Price:</label>
                        <input type="number" min={0} id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} className={inputStyle} required/>
                        <button onClick={addData} className='px-7 py-2 bg-green-400 hover:bg-green-500 hover:scale-105 transition-transform text-lg rounded-3xl mt-6'>Add</button>
                    </div>
                    <div className={divStyle}>
                        <label htmlFor="nextServiceDate" className='flex-1 xs:text-sm sm:text-md xs:mr-5 sm:mr-0 xs:mb-1'>Next Service Date:</label>
                        <input type="date" id="nextServiceDate" name="nextServiceDate" value={dateData} onChange={TDate} className={inputStyle} required/>
                    </div>
                    <div className={divStyle}>
                        <label htmlFor="comments" className='flex-1 xs:text-sm sm:text-md xs:mr-5 sm:mr-0 xs:mb-3'>Comments:</label>
                        <select id="commentDown" value={selectedValue} onChange={(e) => setComments(e.target.value)} className={inputStyle}>
                            <option value="" disabled>
                                Select an option
                            </option>
                            {
                                commentsOption.map((service, index)=>(
                                    <option key={index} value={service}>
                                        {service}
                                    </option>
                                ))
                            }
                        </select>

                        <textarea rows="6" id="comments" name="comments" value={comments} onChange={(e) => setComments(e.target.value)} className={inputStyle} required/>
                    </div>
                </div>
                <div className='flex-1'>
                    <h1 className='text-xl text-center mb-1'>Services</h1>
                    {selectedServices.map((service, index) => (
                        <div className='flex justify-between items-center border p-4 mb-1 border-gray-500' key={service.id}>
                            <div className='flex-1 flex justify-between items-center'>
                                <h1>{service.service}</h1>
                                <h1>{service.price}</h1>
                            </div>
                            <div className='ml-2 cursor-pointer' onClick={() => removeData(service.id)}>
                                <RxCross2/>
                            </div>
                        </div>
                    ))}
                    <div className={divStyle}>
                        <label htmlFor="taxCategory">Tax Slab:</label>
                        <div className='grid grid-cols-4 gap-2 xs:text-xs sm:text-lg'>
                            <button type="button" onClick={() => handleCategorySelection('QC')} className='text-white bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-500'>QC</button>
                            <button type="button" onClick={() => handleCategorySelection('NS')} className='text-white bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-500'>NS</button>
                            <button type="button" onClick={() => handleCategorySelection('NB')} className='text-white bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-500'>NB</button>
                            <button type="button" onClick={() => handleCategorySelection('ONC')} className='text-white bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-500'>ONC</button>
                        </div>
                        
                        <h1 className='pt-4 text-lg'>{taxSlab}%</h1>
                    </div>
                    <div>Total Price = {calculatePrice()}</div>
                </div>
            </div>
            
            
            
            
            <div className='flex justify-around xs:pt-[4rem] md:pt-[2rem] xs:pb-4 sm:pb-4 md:pb-4'>
                <Link to={'/'} className='px-7 py-2 bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-transform text-lg rounded-3xl mt-6'>Back</Link>
                <button onClick={handleSubmit} className='px-7 py-2 bg-green-400 hover:bg-green-500 hover:scale-105 transition-transform text-lg rounded-3xl mt-6'>Next</button>
            </div>
        </div>
    )
}

export default OrderDetails
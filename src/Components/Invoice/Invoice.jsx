import React, {useContext} from 'react'
import { LoginContext } from '../../Contexts/LoginContext';

function Invoice({ invoice }) {
    const {orderData, customerData} = useContext(LoginContext)
    // const componentRef = useRef();
    const services = [
        {service: "Furnace Blower Cleaning"},
        {service: "Heating & Air Conditioning System Cleaning"},
        {service: "Dryer Vent Cleaning Basement or First Floor"},
        {service: "Dryer Vent Cleaning Second Floor or Higher"},
        {service: "Power Cleaning with Sweeper Line Method"},
        {service: "Power Cleaning & Wash with Sweeper Line Method"},
        {service: "Regular Air Ventilation Cleaning"},
        {service: "Filters Disposable"},
        {service: "Filters Washable"},
        {service: "Regular sanitization with Spray bottle"},
        {service: "Sanitization with Fogger"},
        {service: "Air Exchanger with its vents"},
        {service: "Heat Pump with Split Units"},
        {service: "Central Vacuum with Outlets"},
        {service: "Crawling Space & Trailer House Duct cleaning"},
        {service: "Combo 1: (Air Duct Cleaning, Blower Cleaning, Air Exchanger)"},
        {service: "Combo 2: (Air Exchanger, Dryer Vent Cleaning)"},
        {service: "Combo 3: (Air Duct Cleaning, Dryer Vent Cleaning)"},
        {service: "Additional Services"}
    ]
    const getCurrentDate = () => {
        const date = new Date();

        let day = date?.getDate();
        let month = date?.getMonth() + 1;
        let year = date?.getFullYear();
        const monthTable = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        if(day < 10) {
            return `0${day}-${monthTable[month-1]}-${year}`
        }
        else{
            let currentDate = `${day}-${monthTable[month-1]}-${year}`;
            return currentDate
        }
    }

    const twoDecimal = (num) => {
        const x = (Math.round(num * 100) / 100).toFixed(2)
        return x
    }

    const checkOrderData = (service) => {
        for(let s in orderData?.serviceAvailable){
            let x = orderData?.serviceAvailable[s]?.service
            if(x === service) {
                return orderData?.serviceAvailable[s]?.price
            }
        }
        return "-"
    }
    
  return (
    <main className='mt-4 mb-[50px] px-1 w-[750px] mx-auto text-sm'>
        <div className='border w-[750px] mx-auto'>
            {/* top */}
            <div className='w-[750px] mx-auto flex justify-between items-center'>
                <div className='w-[800px] h-[90px] items-center flex border-r justify-start'>
                    <img className='w-[700px] h-[80px] object-contain' src="./logo.webp" alt="logo" />
                </div>
                <div className='w-[300px] h-[90px]'>
                    <div className='flex justify-between items-center h-[50px]'>
                        <div className='flex-1 border-r h-[50px] pl-1 items-center flex'>Invoice #</div>
                        <div className='flex-1 pl-1'>{invoice}</div>
                    </div>
                    <div className='flex justify-between items-center border-t h-[40px]'>
                        <div className='flex-1 border-r h-[40px] pl-1 items-center flex'>Date</div>
                        <div className='flex-1 pl-1'>{getCurrentDate()}</div>
                    </div>
                </div>
            </div>
            {/* line */}
            <div className='w-[750px] mx-auto flex justify-around items-center border-t uppercase'>
                Breathe Fresh Clean Air
            </div>
            {/* Heading customer details */}
            <div className='w-[750px] mx-auto border-t font-bold bg-slate-100  pl-1'>
                Customer Details
            </div>
            <div className='w-[750px] mx-auto flex justify-between items-center border-t'>
                <p className='w-[10%] border-r pl-1'>Name</p>
                <p className='w-[90%] pl-1'>{customerData?.firstname} {customerData?.lastname}</p>
            </div>
            <div className='w-[750px] mx-auto flex justify-between items-center border-t'>
                <p className='w-[10%] border-r pl-1'>Street</p>
                <p className='w-[90%] pl-1'>{customerData?.addressLine1}</p>
            </div>
            <div className='w-[750px] mx-auto flex justify-between items-center border-t'>
                <p className='w-[10%] border-r pl-1'>City</p>
                <p className='w-[90%] pl-1'>{customerData?.city}</p>
            </div>
            <div className='w-[750px] mx-auto flex items-center border-t'>
                <p className='w-[10%] border-r pl-1'>Province</p>
                <p className='w-[50%] pl-1'>{customerData?.state}</p>
                <p className='w-[20%] border-r pl-1 border-l'>Postal Code</p>
                <p className='w-[20%] pl-1'>{customerData?.postalCode}</p>
            </div>
            <div className='w-[750px] mx-auto flex items-center border-t'>
                <p className='w-[10%] border-r pl-1'>Email</p>
                <p className='w-[50%] pl-1'>{customerData?.email}</p>
                <p className='w-[20%] border-r pl-1 border-l'>Phone</p>
                <p className='w-[20%] pl-1'>{customerData?.contactNumber}</p>
            </div>
            <div className='w-[750px] mx-auto flex items-center border-t'>
                <p className='w-[60%] border-r text-center font-bold bg-slate-100'>Service Description</p>
                <p className='w-[40%] text-center bg-slate-100 font-bold'>Price</p>
            </div>
            {services?.map(service => (
                <div key={service.id} className='w-[750px] mx-auto flex items-center border-t'>
                    <p className='w-[60%] border-r pl-1'>{service?.service}</p>
                    <p className='w-[40%] text-center'>
                            {checkOrderData(service?.service)}
                    </p>
                </div>
            ))}
            <div className='w-[750px] mx-auto flex justify-between items-center border-t'>
                <p className='w-[60%] border-r text-center'>Subtotal</p>
                <p className='w-[40%] text-right'>
                    <div className='w-[55%]'>
                        {(Math.round(orderData?.price * 100) / 100).toFixed(2)}
                    </div>
                </p>
            </div>
            <div className='w-[750px] mx-auto flex justify-between items-center border-t'>
                <p className='w-[60%] border-r text-center'>Tax</p>
                <p className='w-[40%] text-right'>
                    <div className='w-[55%]'>
                        {(Math.round((orderData?.price * Number(orderData?.taxSlab) / 100) * 100) / 100).toFixed(2)}
                    </div>
                </p>
            </div>
            <div className='w-[750px] mx-auto flex justify-between items-center border-t'>
                <p className='w-[60%] border-r text-center font-bold'>Total</p>
                <p className='w-[40%] text-right'>
                    <div className='w-[55%]'>
                        {twoDecimal(orderData?.price + (orderData?.price * Number(orderData?.taxSlab) / 100))}
                    </div>
                </p>
            </div>
            <div className='w-[750px] mx-auto flex justify-between items-center border-t'>
                <p className='w-[60%] border-r text-center'>Remarks</p>
                {/* <p className='w-[20%] text-center'>{sessionStorage?.getItem("email")}</p> */}
            </div>
            <div className='w-[750px] mx-auto border-t font-bold pl-1'>
                Customer Satisfaction
            </div>
            <div className='w-[750px] mx-auto flex justify-between items-center border-t text-sm'>
                <p className='w-[60%] pl-1 break-words text-wrap'>
                    {/* overflow-hidden whitespace-nowrap text-ellipsis */}
                    {orderData?.comments}
                </p>
                <p className='w-[20%] pl-1 border-l border-r'>Recommended Next service:
                </p>
                <p className='w-[20%] border-r'>
                    {orderData?.nextServiceDate}
                </p>
            </div>
            <div className='w-[750px] mx-auto flex justify-between items-center border-t h-[60px] text-sm'>
                <p className='text-center w-[20%] border-r h-[60px] flex items-center pl-1'>Customer Signature</p>
                <p className='w-[40%] border-r h-[70px]'></p>
                <p className='text-center w-[20%] border-r h-[60px] flex items-center text-wrap'>Company Authorized Signature</p>
                <p className='w-[20%] border-r h-[60px] flex items-center pl-1'>Not required for electronic receipt</p>
            </div>
        </div>
        <div className='w-[750px] mx-auto flex justify-between items-center'>
            <p>BlueGuard.ca</p>
            <p className='font-bold'>Thank you for your business</p>
            <p>Tel: (514) 452-6414</p>
        </div>
    </main>
  )
}

export default Invoice
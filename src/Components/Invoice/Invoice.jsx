import React, {useContext} from 'react'
import { LoginContext } from '../../Contexts/LoginContext';

function Invoice({ invoice }) {
    const {orderData, customerData} = useContext(LoginContext)
    // const componentRef = useRef();
    const services = [
        {service: "Air duct cleaning"},
        {service: "Air exchanger cleaning"},
        {service: "Heat pump cleaning W/split unit"},
        {service: "Dryer vent cleaning"},
        {service: "Furnace blower cleaning"},
        {service: "Power cleaning with sweeper line method"},
        {service: "Central vacuum cleaning with outlet"},
        {service: "Sanitizing with spray bottle"},
        {service: "Sanitization with fogger"},
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
                return Number(orderData?.serviceAvailable[s]?.price) * Number(orderData?.serviceAvailable[s].qty)
            }
        }
        return "-"
    }

    const getOrderQty = (service) => {
        for(let s in orderData?.serviceAvailable){
            let x = orderData?.serviceAvailable[s]?.service
            if(x === service) {
                return Number(orderData?.serviceAvailable[s].qty)
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
                <p className='w-[15%] border-r pl-1 border-l'>Postal Code</p>
                <p className='w-[25%] pl-1'>{customerData?.postalCode}</p>
            </div>
            <div className='w-[750px] mx-auto flex items-center border-t'>
                <p className='w-[10%] border-r pl-1'>Email</p>
                <p className='w-[50%] pl-1'>{customerData?.email}</p>
                <p className='w-[15%] border-r pl-1 border-l'>Phone</p>
                <p className='w-[25%] pl-1'>{customerData?.contactNumber}</p>
            </div>
            <div className='w-[750px] mx-auto flex items-center border-t'>
                <p className='w-[60%] border-r text-center font-bold bg-slate-100'>Service Description</p>
                <p className='w-[15%] text-center bg-slate-100 font-bold border-r'>Qty</p>
                <p className='w-[25%] text-center bg-slate-100 font-bold'>Price</p>
            </div>
            {services?.map(service => (
                <div key={service.id} className='w-[750px] mx-auto flex items-center border-t'>
                    <p className='w-[60%] border-r pl-1'>{service?.service}</p>
                    <p className='w-[15%] text-center border-r'>{getOrderQty(service?.service)}</p>
                    <p className='w-[25%] text-center'>
                        {checkOrderData(service?.service)}
                    </p>
                </div>
            ))}
            <div className='w-[750px] mx-auto flex justify-between items-center border-t'>
                <p className='w-[60%] border-r text-center'>Subtotal</p>
                <p className='w-[15%] border-r'></p>
                <p className='w-[25%] text-right'>
                    <div className='w-[60%]'>
                        {(Math.round(orderData?.price * 100) / 100).toFixed(2)}
                    </div>
                </p>
            </div>
            <div className='w-[750px] mx-auto flex justify-between items-center border-t'>
                <p className='w-[60%] border-r text-center'>Tax ({orderData?.taxCode})</p>
                <p className='w-[15%] border-r'></p>
                <p className='w-[25%] text-right'>
                    <div className='w-[60%]'>
                        {(Math.round((orderData?.price * Number(orderData?.taxSlab) / 100) * 100) / 100).toFixed(2)}
                    </div>
                </p>
            </div>
            <div className='w-[750px] mx-auto flex justify-between items-center border-t'>
                <p className='w-[60%] border-r text-center font-bold'>Total</p>
                <p className='w-[15%] border-r'></p>
                <p className='w-[25%] text-right'>
                    <div className='w-[60%]'>
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
                <input type='text' className='w-[40%] border-r h-[70px]outline-none h-full focus:outline-none' placeholder='Please type you name'/>
                <p className='text-center w-[20%] border-r h-[60px] flex items-center text-wrap'>Company Authorized Signature</p>
                <p className='w-[20%] border-r h-[60px] flex items-center pl-1'>Not required for electronic receipt</p>
            </div>
        </div>
        <div className='w-[750px] mx-auto flex justify-between items-center'>
            <p>BlueGuard.ca</p>
            <p className='font-bold'>Thank you for choosing Bluegaurd</p>
            <p>Tel: 1-844-498-8364</p>
        </div>
    </main>
  )
}

export default Invoice
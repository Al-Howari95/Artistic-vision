import React, { useState } from 'react';
import Swal from 'sweetalert2';


const Payment = () => {
  const apiUrl = 'http://localhost:4000/payments';

  // حالة محلية لتخزين بيانات الدفع
  const [paymentData, setPaymentData] = useState({
    name: '',
    cardNumber: '',
    securityCode: '',
  });

  // حالة محلية لتخزين حالة الصحة لحقول الإدخال
  const [validationErrors, setValidationErrors] = useState({
    cardNumber: '',
    securityCode: '',
  });

  // تحديث حالة محلية عند تغيير أحد حقول الإدخال
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Validation logic
    let error = '';
    if (name === 'cardNumber' && (value.replace(/\s/g, '').length !== 16 || !/^\d+$/.test(value.replace(/\s/g, '')))) {
      error = 'Card number must be a valid credit card number';
    } else if (name === 'securityCode' && value.length !== 3) {
      error = 'Security code must be 3 digits';
    }
  
    setValidationErrors({
      ...validationErrors,
      [name]: error,
    });
  
    // Add space after every 4 digits for cardNumber
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      setPaymentData({
        ...paymentData,
        [name]: formattedValue,
      });
    } else {
      setPaymentData({
        ...paymentData,
        [name]: value,
      });
    }
  };
  

  // إرسال بيانات الدفع إلى JSON-Server
  const makePayment = async () => {
    // Additional validation logic if needed before making the payment
    if (validationErrors.cardNumber || validationErrors.securityCode) {
      alert('Please fix validation errors before making the payment.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        // alert('Payment successful!');
        const result = await Swal.fire({
          icon: 'success',
          title: 'Successfully ',
          text: ` Thank you for choosing the service`,
          showConfirmButton: true,
          timer: 5000, // Set a timer for 5 seconds (adjust as needed)
          confirmButtonText: 'OK',
        });
      } else {
        alert('Payment failed.');
      }
    } catch (error) {
      alert('Error making payment:', error);
    }
  };







  return (
    <div>
      {/* component */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);"
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n/*\nmodule.exports = {\n    plugins: [require('@tailwindcss/forms'),]\n};\n*/\n.form-radio {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  -webkit-print-color-adjust: exact;\n          color-adjust: exact;\n  display: inline-block;\n  vertical-align: middle;\n  background-origin: border-box;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  flex-shrink: 0;\n  border-radius: 100%;\n  border-width: 2px;\n}\n\n.form-radio:checked {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e\");\n  border-color: transparent;\n  background-color: currentColor;\n  background-size: 100% 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n@media not print {\n  .form-radio::-ms-check {\n    border-width: 1px;\n    color: transparent;\n    background: inherit;\n    border-color: inherit;\n    border-radius: inherit;\n  }\n}\n\n.form-radio:focus {\n  outline: none;\n}\n\n.form-select {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3e%3cpath d='M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z'/%3e%3c/svg%3e\");\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  -webkit-print-color-adjust: exact;\n          color-adjust: exact;\n  background-repeat: no-repeat;\n  padding-top: 0.5rem;\n  padding-right: 2.5rem;\n  padding-bottom: 0.5rem;\n  padding-left: 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  background-position: right 0.5rem center;\n  background-size: 1.5em 1.5em;\n}\n\n.form-select::-ms-expand {\n  color: #a0aec0;\n  border: none;\n}\n\n@media not print {\n  .form-select::-ms-expand {\n    display: none;\n  }\n}\n\n@media print and (-ms-high-contrast: active), print and (-ms-high-contrast: none) {\n  .form-select {\n    padding-right: 0.75rem;\n  }\n}\n"
        }}
      />
      <div className="min-w-screen min-h-screen bg-white-200 flex items-center justify-center px-5 pb-10 pt-16">
        <div
          className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
          style={{ maxWidth: 600 }}
        >
          <div className="w-full pt-1 pb-5">
            <div className="bg-blue-400 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
              <i className="mdi mdi-credit-card-outline text-3xl" />
            </div>
          </div>
          <div className="mb-10">
            <h1 className="text-center font-bold text-xl uppercase">
              Secure payment info
            </h1>
          </div>
          <div className="mb-3 flex -mx-2">
            <div className="px-2">
              <label
                htmlFor="type1"
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-indigo-500"
                  name="type"
                  id="type1"
                  defaultChecked=""
                />
                <img
                  src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                  className="h-8 ml-3"
                />
              </label>
            </div>
            <div className="px-2">
              <label
                htmlFor="type2"
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-indigo-500"
                  name="type"
                  id="type2"
                />
                <img
                  src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                  className="h-8 ml-3"
                />
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
            <div>
              <input
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="John Smith"
                type="text"
                name="name"
                value={paymentData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">Card number</label>
            <div>
              <input
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="0000 0000 0000 0000"
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleInputChange}
                />
      <span style={{ color: 'red' }}>{validationErrors.cardNumber}</span>
      <br />
            
            </div>
          </div>

          <div className="mb-10">
            <label className="font-bold text-sm mb-2 ml-1">Security code</label>
            <div>
              <input
                className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="000"
                type="text"
                name="securityCode"
                value={paymentData.securityCode}
                onChange={handleInputChange}
                />
                <br></br>
                <span style={{ color: 'red' }}>{validationErrors.securityCode}</span>
      <br />
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={makePayment}
              className="bn632-hover bn28"
            >
              PAY NOW
              <i className="mdi mdi-lock-outline mr-1" />
            </button>
          </div>
        </div>
      </div>
      {/* BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES */}
      <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div>

        </div>
      </div>
    </div>
  );
};

export default Payment;





// import React, { useState } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// function Pyment() {
//   const [formData, setFormData] = useState({
//     name: '',
//     cardNumber: '',
//     expiry: new Date(), 
//     cvv: '',
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleDateChange = (date) => {
//     setFormData({
//       ...formData,
//       expiry: date,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!/^\d{3}$/.test(formData.cvv)) {
//       alert('CVV must be a 3-digit number');
//       return;
//     }
  
//     if (!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(formData.cardNumber)) {
//       alert('Expiry Date should be in the format xxxx-xxxx-xxxx-xxxx');
//       return;
//     }
  
//     try {
//       const response = await axios.post('http://localhost:4000/payments', formData);
//       console.log('Payment data saved:', response.data);
//       alert('Payment successfully submitted!');
  
//       // Clear form data after successful submission
//       setFormData({
//         name: '',
//         cardNumber: '',
//         expiry: new Date(),
//         cvv: '',
//       });
//     } catch (error) {
//       console.error('Error saving payment:', error);
//       alert('There was an error while processing your payment. Please try again.');
//     }
//   };
  
//   return (
//     <div className="flex justify-center items-center h-screen">
//     <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3" onSubmit={handleSubmit}>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//           Name on Card
//         </label>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="name"
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="write your card name"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
//           Card Number
//         </label>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="cardNumber"
//           type="text"
//           name="cardNumber"
//           value={formData.cardNumber}
//           onChange={handleChange}
//           placeholder="write your card number"
//         />
//       </div>

//       <div className="mb-4 flex">
//           <div className="w-1/2 mr-2">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiry">
//               Expiry Date
//             </label>
//             <DatePicker
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="expiry"
//               selected={formData.expiry}
//               onChange={handleDateChange}
//               showMonthYearPicker
//               dateFormat="MM/yyyy"
//             />
//           </div>
//         <div className="w-1/2 ml-2">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
//             CVV
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="cvv"
//             type="text"
//             name="cvv"
//             value={formData.cvv}
//             onChange={handleChange}
//             maxLength={3} 
//             placeholder="CVV"
//           />
//         </div>
//       </div>

//       <div className="flex items-center justify-between">
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           type="submit"
//         >
//           Submit Payment
//         </button>
//       </div>
//     </form>
//   </div>
// );
// }

// export default Pyment;
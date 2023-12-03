// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BookNow = () => {
//   const [bookingData, setBookingData] = useState([]);
//   const [selectedService, setSelectedService] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:4000/bookings')
//       .then(response => {
//         setBookingData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching booking data:', error);
//       });
//   }, []);

//   const handleDelete = (bookingId, index) => {
//     axios.delete(`http://localhost:4000/bookings/${bookingId}`)
//       .then(response => {
//         const updatedBookingData = [...bookingData];
//         updatedBookingData.splice(index, 1);
//         setBookingData(updatedBookingData);
//       })
//       .catch(error => {
//         console.error('Error deleting booking data:', error);
//       });
//   };

//   const handleServiceChange = (event) => {
//     setSelectedService(event.target.value);
//   };

//   return (
//     <div>
//       <h2>Booking Information</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {bookingData.map((booking, index) => (
//   <div key={index} className="bg-white p-6 rounded-md shadow-md" id='add'>
//             <img src={booking.image} alt={`Image ${index}`} className="mb-4 rounded-md" />
//             <p className="text-xl font-semibold mb-2">Name: {booking.name}</p>
//             <p className="text-base">Price: {booking.price}</p>
//             <button onClick={() => handleDelete(booking.id, index)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* component */}
//       <div id='koko' className="flex items-center justify-center p-12">
//         {/* Author: FormBold Team */}
//         {/* Learn More: https://formbold.com */}
//         <div className="mx-auto w-full max-w-[550px]">
//           <form action="https://formbold.com/s/FORM_ID" method="POST">
//             <div className="-mx-3 flex flex-wrap">
//               {/* Date Input */}
//               <div className="w-full px-3 sm:w-1/2">
//                 <div className="mb-5">
//                   <label
//                     htmlFor="date"
//                     className="mb-3 block text-base font-medium text-[#07074D]"
//                   >
//                     Date
//                   </label>
//                   <input
//                     type="date"
//                     name="date"
//                     id="date"
//                     className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                   />
//                 </div>
//               </div>
//               {/* Time Input */}
//               <div className="w-full px-3 sm:w-1/2">
//                 <div className="mb-5">
//                   <label
//                     htmlFor="time"
//                     className="mb-3 block text-base font-medium text-[#07074D]"
//                   >
//                     Time
//                   </label>
//                   <input
//                     type="time"
//                     name="time"
//                     id="time"
//                     className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                   />
//                 </div>
//               </div>
//               {/* Location Input */}
//               <div className="w-full px-3">
//                 <div className="mb-5">
//                   <label
//                     htmlFor="location"
//                     className="mb-3 block text-base font-medium text-[#07074D]"
//                   >
//                     Location
//                   </label>
//                   <input
//                     type="text"
//                     name="location"
//                     id="location"
//                     className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                   />
//                 </div>
//               </div>
//             </div>      
//             <div>
//               <button id='dffd' className="bn632-hover bn28">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookNow;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const BookNow = () => {
  const [bookingData, setBookingData] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
  });

  useEffect(() => {
    axios.get('http://localhost:4000/bookings')
      .then(response => {
        setBookingData(response.data);
      })
      .catch(error => {
        console.error('Error fetching booking data:', error);
      });
  }, []);

  const handleDelete = (bookingId, index) => {
    axios.delete(`http://localhost:4000/bookings/${bookingId}`)
      .then(response => {
        const updatedBookingData = [...bookingData];
        updatedBookingData.splice(index, 1);
        setBookingData(updatedBookingData);
      })
      .catch(error => {
        console.error('Error deleting booking data:', error);
      });
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    axios.post('http://localhost:4000/submit', formData)
      .then(response => {
        // يمكنك إضافة مزيد من الكود هنا بناءً على استجابة الخادم إذا لزم الأمر
        Swal.fire({
          icon: 'success',
          title: 'Successfully ',
          text: `Thank You`,
          showConfirmButton: true,
          timer: 5000, // Set a timer for 5 seconds (adjust as needed)
          confirmButtonText: 'OK',
        });
      })
      .catch(error => {
        console.error('Error submitting form:', error);
      });
  };

  return (
    <div>
      <h2>Booking Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {bookingData.map((booking, index) => (
    <div key={index} className="bg-white p-6 rounded-md shadow-md" id='add'>
      {/* الكود السابق */}
      <img src={booking.image} alt={`Image ${index}`} className="mb-4 rounded-md" />
      <p className="text-xl font-semibold mb-2">Name: {booking.name}</p>
      <p className="text-base">Price: {booking.price}</p>
      <button onClick={() => handleDelete(booking.id, index)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Delete
      </button>
    </div>
  ))}
</div>

      <div id='koko' className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3">
                <div className="mb-5">
                  <label htmlFor="location" className="mb-3 block text-base font-medium text-[#07074D]">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div>
              <button type="submit" id='dffd' className="bn632-hover bn28">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookNow;

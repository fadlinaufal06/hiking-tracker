import './modal.css'
import { db } from "../firebase";
import {ref, set} from "firebase/database";
import React, {useState, useContext} from 'react'
import { ChipContext } from './ChipContext';

export default function ModalContent({ onClose }) {
    const [name, setName] = useState('')
    const [gender, setGender] = useState('female')
    const [age, setAge] = useState('')
    const [chipId] = useContext(ChipContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Get a reference to the Firebase Realtime Database
        const database = ref(db,'userdata/'+ chipId + '/details');
        
        
        // Create a new user object with the form data
        const newUser = {
            name: name,
            gender: gender,
            age: age,
        };

        // Add the new user to the Realtime Database
        set(database, newUser)
          .then(() => {
            // Clear the form data
            setName('');
            setGender('female');
            setAge('');
            // Close the modal
            onClose();
          })
          .catch((error) => {
            console.error('Error adding user to database: ', error);
          });
      };
    

  return (
    <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="modal fixed top-0 left-0 right-0 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full">
        <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <button onClick={onClose} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="authentication-modal">
                    <svg aria-hidden="true" className="w-5 h-5" fillRule="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">

                    <h3 className="mb-1 text-2xl text-center font-medium text-gray-900">Manage User</h3>
                    <div className="separator h-px bg-gray-300 my-2"></div>
                    <p className='mb-4 text-sm text-center'>Assign this device to user</p>

                    <form className="space-y-10" onSubmit={handleSubmit}>

                        <div>
                            <p class="mb-4 text-sm text-red-600 ">*Specify device user details</p>
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                            <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required></input>
                        </div>

                        <div>
                            <label for="gender" className='pr-4 block text-sm font-medium text-gray-900'>Gender</label>
                            <select id="gender" className='shadow' value={gender} onChange={e => setGender(e.target.value)}>
                                <option value="male">male</option>
                                <option value="female" selected>female</option>
                            </select>
                        </div>

                        <div>
                            <label for="age" className="block mb-2 text-sm font-medium text-gray-900 ">Age</label>
                            <input name="age" type='number' id="age" placeholder="21" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required value={age} onChange={e => setAge(e.target.value)}></input>
                        </div>

                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Set user</button>
                    </form>

                </div>
            </div>
        </div>
    </div> 
  );
}
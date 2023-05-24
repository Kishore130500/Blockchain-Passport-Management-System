/*
DATE: 05/24/2023
LAST MODIFIED BY: @@Kishore
*/

//Component to add a form for collecting details of new member to be added to blockchain
import React, {useState, useEffect} from 'react';
import './Create.css';
import {ethers} from "ethers";
//import {passport} from '../scripts/interaction';

export default function Create() {
  //start here
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAddress = `0xd665b8940f669c03612001cf3fe99e0233db1ad5`;
    const contractABI = `[
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_firstName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_lastName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_gender",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "_age",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_nationality",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "_byear",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_bmonth",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_bday",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_country",
              "type": "string"
            }
          ],
          "name": "createPassport",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_firstName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_lastName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_gender",
              "type": "string"
            }
          ],
          "name": "updatePassport",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "user",
          "outputs": [
            {
              "internalType": "string",
              "name": "firstName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "lastName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "gender",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "age",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "nationality",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "day",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "month",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "year",
                  "type": "uint256"
                }
              ],
              "internalType": "struct Passport.Year",
              "name": "dob",
              "type": "tuple"
            },
            {
              "internalType": "string",
              "name": "country",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "viewPassport",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "firstName",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "lastName",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "gender",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "age",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "nationality",
                  "type": "string"
                },
                {
                  "components": [
                    {
                      "internalType": "uint256",
                      "name": "day",
                      "type": "uint256"
                    },
                    {
                      "internalType": "uint256",
                      "name": "month",
                      "type": "uint256"
                    },
                    {
                      "internalType": "uint256",
                      "name": "year",
                      "type": "uint256"
                    }
                  ],
                  "internalType": "struct Passport.Year",
                  "name": "dob",
                  "type": "tuple"
                },
                {
                  "internalType": "string",
                  "name": "country",
                  "type": "string"
                }
              ],
              "internalType": "struct Passport.Person",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]`
    const passport = new ethers.Contract(contractAddress,contractABI,signer);


  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    nationality: '',
    dob: (0,0,0),
    country: ''
  });

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      await passport.createPassport(
        userData.firstName,
        userData.lastName,
        userData.gender,
        parseInt(userData.age),
        userData.nationality,
        parseInt(userData.dob.slice(6)),        
        parseInt(userData.dob.slice(0, 3)),
        parseInt(userData.dob.slice(3, 5)),
        userData.country
      );
    
      console.log('Passport created successfully!');
      // Reset the form fields
      setUserData({
        firstName: '',
        lastName: '',
        gender: '',
        age: '',
        nationality: '',
        dob: '',
        country: ''
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };
//end here

  return (
    <div className="main-block">
      <form action="/">
        <div className="title">
          <i className="fas fa-pencil-alt" />
          <h2>Register here</h2>
        </div>
        <div className="info">
          <input type="text" name="firstName" value={userData.firstName} onChange={handleInputChange} placeholder="First name" />
          <input type="text" name="lastName" value={userData.lastName} onChange={handleInputChange} placeholder="Last name" />
          <div className="sameRow">
            <input id="age" type="text" name="age" value={userData.age} onChange={handleInputChange} placeholder="Age" />
            <select id="formGender" name="gender" value={userData.gender} onChange={handleInputChange} >
              <option value="" disabled selected>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="sameRow">
          <input type="text" name="nationality" value={userData.nationality} onChange={handleInputChange} placeholder="Nationality" />
          <input type="date" name="dob" value={userData.dob} onChange={handleInputChange} placeholder="DOB" />
          </div>
          <input id="countryField"  type="text" name="country" value={userData.country} onChange={handleInputChange} placeholder="Country" />
        </div>

        <button id="sbmt" onClick= {handleSubmit} type="submit" href="/">
          Submit
        </button>
      </form>
    </div>
  )
}







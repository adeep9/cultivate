"use client"

import { Sidebar } from "./SideBar";
import { Navbar } from "./Navbar";
import { getCookie } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface AccountInfoObject {
  email: string;
  phone: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  postcode: number;
  country: string;
}

export interface AccountData {
  accountInfo: AccountInfoObject;
  exists: boolean;
  accountType: string;
}

export function Dualbar() {
  const userId = getCookie('userId'); //get userId from session
  let userType = getCookie('userType')
  
  const [accountData, setAccountData] = useState<AccountData>({
    accountInfo: {
      email: "",
      phone: "",
      name: "",
      address1: "",
      city: "",
      state: "",
      postcode: 0,
      country: "",
    },
    exists: false,
    accountType: "",
  })
  const [type, setType] = useState("")
  const [userExists, setUserExists] = useState(false)
  const [userData, setUserData] = useState<AccountInfoObject>({
    email: "",
    phone: "",
    name: "",
    address1: "",
    city: "",
    state: "",
    postcode: 0,
    country: "",
  })

  //const userIconChar = userData.name[0].toUpperCase()

  useEffect(() => {
    const getUserData = async () => {
      if (userType) { 
        setType(userType)
        if (userId && userType) {
          const id = Number(userId) //convert cookie string to number
          setUserExists(true)
          //get user data using id and usertype
          const response = await fetch('/api/account', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id,
              type: userType,
            })
          });
          if(response.ok) {
            const data = await response.json();
            setUserData(data)
          }
        }
      }
    };

    getUserData();
  }, []) //on mount


  useEffect(() => {
    //make package
    setAccountData({
      accountInfo: userData,
      exists: userExists,
      accountType: type,
    })
  }, [userData]) //after all the data has been fetched
  

  return (
    <div>
      {/* Sidebar for medium and larger screens */}
      <div className="hidden md:block md:w-1/4 lg:w-1/5">
        <Sidebar accountData={accountData} />
      </div>
      
      {/* Main content area with Navbar for smaller screens */}
      <div className="flex-1">
        <div className="block md:hidden">
          <Navbar accountData={accountData}  />
        </div>
        
      </div>
    </div>
  );
}





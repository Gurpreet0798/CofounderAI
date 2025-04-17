"use client";
import { emailsContext } from "@/context/emailsContext";
import { useContext, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger
} from "../ui/animated-modal";
import { Input } from "./input";
import { Label } from "./label";
import { ProcessLoader } from "./ProcessLoader";


export function AnimatedModalButton() {
  const images = [
    "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];


  const [campaignInfo,setCampaignInfo] = useState({
    founder: "",
    industry: "",
    purpose: "",
    name: "",
    contact: "",
    location: "",
    website: "",
  });
  const { emailsData } = useContext(emailsContext);


  const handleOnClick =async ()=>{
    if(emailsData.length == 0){
      alert("Please upload Emails")
      return
    }
    if(campaignInfo.contact.length != 10 ){
      alert("Please Provide Valid Contact Number")
      return
    }
    if(campaignInfo.contact =="" || campaignInfo.founder =="" || campaignInfo.industry =="" || campaignInfo.location =="" || campaignInfo.name =="" || campaignInfo.purpose =="" || campaignInfo.website ==""){
      alert("Please Fill All Fields")
      return 
    }
    await fetch("/api/send-mail",
      {
        method:"POST",
        body:JSON.stringify({campaignInfo,emails:emailsData})
      }
    )
    alert("AI Emails Sent Successfully!")
  }

  return (
    <div className="py-4 flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black w-full dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="text-center">
           Run Campaign
          </span>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Run Campaign With{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Infinity SAAS
              </span>{" "}
              🚀
            </h4>
            <div className=" justify-center items-center">
        <Label className="my-4">
          Enter about your campaign details
        </Label>
        <Input placeholder="Enter Founder Name" 
        className="w-full my-2"
        required
        onChange={
          (e) => {
            setCampaignInfo({
              ...campaignInfo,
              founder: e.target.value
            })
        }}
        />
        <Input placeholder="Enter Your Industry"
        className="w-full my-2"
        required
        onChange={
          (e) => {
            setCampaignInfo({
              ...campaignInfo,
              industry: e.target.value
            })
        }}
        />
        <div className="flex flex-row">
        <Input placeholder="Enter Purpose"
        className="w-[1/3] my-2 mr-6"
        required
        onChange={
          (e) => {
            setCampaignInfo({
              ...campaignInfo,
              purpose: e.target.value
            })
        }}
        />
        <Input placeholder="Product/Service Name"
        className="w-[1/3] my-2"
        required
        onChange={
          (e) => {
            setCampaignInfo({
              ...campaignInfo,
              name: e.target.value
            })}
        }
        />
         <Input placeholder="Contact Number"
        className="w-[1/3] my-2 ml-2"
        required
        onChange={
          (e) => {
            setCampaignInfo({
              ...campaignInfo,
              contact: e.target.value
            })
          }
        }
        />
        </div>
      
        <div className="flex flex-row">
        <Input placeholder="Location"
        className="w-[1/2] my-2 mr-6"
        required
        onChange={
          (e)=>{
            setCampaignInfo({
            ...campaignInfo,
            location:e.target.value
            }
            )
          }
        }
        />
        <Input placeholder="Website"
        required
        className="w-[1/2] my-2"
        onChange={
          (e)=>{
            setCampaignInfo({
            ...campaignInfo,
            website:e.target.value
            }
            )
          }
        }
        />
       
        </div>
            </div>
            <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
              <div className="flex  items-center justify-center">
                <RocketIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Super Fast AI Agents
                </span>
              </div>
              <div className="flex items-center justify-center">
                <ElevatorIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                 1000+ leads
                </span>
              </div>
            </div>
          </ModalContent>
          <ProcessLoader
          handleOnClick={handleOnClick}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

const RocketIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M21 12l-18 -6l15 6l-6 6l10 4z" />
    </svg>
  );
};

const VacationIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
      <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
      <path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
      <path d="M15 9l-3 5.196" />
      <path d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
    </svg>
  );
};

const ElevatorIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 4m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
      <path d="M10 10l2 -2l2 2" />
      <path d="M10 14l2 2l2 -2" />
    </svg>
  );
};

const FoodIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 20c0 -3.952 -.966 -16 -4.038 -16s-3.962 9.087 -3.962 14.756c0 -5.669 -.896 -14.756 -3.962 -14.756c-3.065 0 -4.038 12.048 -4.038 16" />
    </svg>
  );
};

const MicIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 12.9a5 5 0 1 0 -3.902 -3.9" />
      <path d="M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" />
    </svg>
  );
};

const ParachuteIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M22 12a10 10 0 1 0 -20 0" />
      <path d="M22 12c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3c0 -1.66 -1.57 -3 -3.5 -3s-3.5 1.34 -3.5 3c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3" />
      <path d="M2 12l10 10l-3.5 -10" />
      <path d="M15.5 12l-3.5 10l10 -10" />
    </svg>
  );
};

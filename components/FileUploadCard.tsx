"use client";
import { emailsContext } from "@/context/emailsContext";
import { Workbook } from "exceljs";
import React, { useContext, useState } from "react";
import Papa from "papaparse"; // For CSV parsing
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

const FileUploadCard = () => {
    const [file, setFile] = useState<File | null>(null);
    const [emails, setEmails] = useState<string[]>([]);
    const [emailColumnNumber, setEmailColumnNumber] = useState<number>(1);
  
    const { setEmailsData } = useContext(emailsContext);
  
    const handleFileUpload = async (file: File) => {
      const fileType = file.name.split(".").pop()?.toLowerCase();
  
      if (fileType === "xlsx" || fileType === "xls") {
        // Handle Excel file
        convertExcelToJson(file);
      } else if (fileType === "csv") {
        // Handle CSV file
        convertCSVToJson(file);
      } else if (fileType === "json") {
        // Handle JSON file
        convertJsonToJson(file);
      }
      else if (fileType === "txt") {
        // Handle Text file
        convertTextToJson(file);
      } 
       else {
        alert("Unsupported file format.");
      }
    };
  
    const convertExcelToJson = (file: File) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (!data) return;
  
        const workbook:any = new Workbook();
        await workbook.xlsx.load(Buffer.from(data as ArrayBuffer));
        const worksheet = workbook.getWorksheet(1);
        const extractedEmails: string[] = [];
  
        worksheet.eachRow((row:any, rowNumber:any) => {
          if (rowNumber > 1) {
            const email = row.getCell(emailColumnNumber).value;
            if (email) extractedEmails.push(email.toString());
          }
        });
  
        setEmails(extractedEmails);
        setEmailsData(extractedEmails);
        localStorage.setItem("emails", JSON.stringify(extractedEmails));
      };
      reader.readAsArrayBuffer(file);
    };
  
    const convertCSVToJson = (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target?.result;
        if (!csv) return;
  
        const result = Papa.parse(csv as string, { header: true });
        const extractedEmails: string[] = result.data.map((row: any) => row[`Column${emailColumnNumber}`]); // Adjust to map the correct column
  
        setEmails(extractedEmails);
        setEmailsData(extractedEmails);
        localStorage.setItem("emails", JSON.stringify(extractedEmails));
      };
      reader.readAsText(file);
    };
  
    const convertJsonToJson = (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const jsonData = e.target?.result;
        if (!jsonData) return;
  
        try {
          const parsedData = JSON.parse(jsonData as string);
          const extractedEmails: string[] = parsedData.map((item: any) => item[`Column${emailColumnNumber}`]); // Adjust to map the correct key
  
          setEmails(extractedEmails);
          setEmailsData(extractedEmails);
          localStorage.setItem("emails", JSON.stringify(extractedEmails));
        } catch (error) {
          console.error("Invalid JSON file format", error);
        }
      };
      reader.readAsText(file);
    };

    const convertTextToJson = (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (!text) return;
  
        const extractedEmails: string[] = (text as string).split("\n").map((line) => line.trim()).filter(Boolean);
  
        setEmails(extractedEmails);
        setEmailsData(extractedEmails);
        localStorage.setItem("emails", JSON.stringify(extractedEmails));
      };
      reader.readAsText(file);
    };
  
  return (
    <>
      <Card className="bg-white dark:bg-neutral-800">
        <CardHeader>
          <CardTitle>Upload Emails Sheet</CardTitle>
          <CardDescription>Upload emails excel sheet to your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input
              type="file"
              className="w-full bg-gray-50 dark:bg-neutral-900"
              required
              aria-required
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFile(file);
                }
              }}
            />

            <Input
              type="text"
              className="w-full bg-gray-50 dark:bg-neutral-900"
              placeholder="Enter Email Column Number"
              required
              onChange={(e) => {
                const value = e.target.value;
                setEmailColumnNumber(parseInt(value));
              }}
            />

            <Button
              className="w-full"
              onClick={() => file && handleFileUpload(file)}
            >
              Upload File
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FileUploadCard;

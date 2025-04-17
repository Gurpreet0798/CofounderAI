"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 
import { emailsContext } from "@/context/emailsContext";
import { MoveHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

const EmailsTable = () => {

  const { emailsData } = useContext(emailsContext);

  const deleteEmail = (index: number) => {
    emailsData.splice(index,1);
    localStorage.setItem('emails',JSON.stringify(emailsData))
    window.location.reload()
  }

  return (
    <>
    <div className="w-auto">

      <Card>
        <CardHeader>
          <CardTitle>Your Emails Database</CardTitle>
          <CardDescription>
            View your recent scrapped or uploaded emails.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email - {emailsData.length}</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>


              
              {emailsData.map((email: any | string, index: number) => (
                <>
                <TableRow key={index}>
                  <TableCell>
                    
                      {email}
                  </TableCell>
                  <TableCell>
                    <Link href={`https://${email.split('@')[1]}`}>
                      <span className="text-blue-500 dark:text-blue-400">
                        {email.split('@')[1]}
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoveHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer"
                        onClick={
                          ()=>deleteEmail(index)
                        }
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                </>
              ))}




              

              {
                emailsData.length === 0 && 
                <TableRow>
                  <TableCell colSpan={3}>
                    <div className="flex justify-center items-center space-x-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No emails found
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              }

            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>

    </>
  );
};

export default EmailsTable;

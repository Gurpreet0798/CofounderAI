'use client'

import TypingAnimation from "@/public/typing.gif";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from 'lucide-react';
import Image from 'next/image';
import * as React from "react";

type Message = {/
    id: number
    text: string
    sender: 'user' | 'bot'
}

const initialQuestions = [
    { id: 1, question: "What is the Infinity SAAS?", answer: "Infinity SAAS is all one AI email marketing CRM that streamlines your marketing and outreach." },
    { id: 2, question: "Is free trial available?", answer: "Yes we provide a free trial for all users as a demo but recommend going with pro plan for bigger goals." },
    { id: 3, question: "What are the tasks I can perform with Infinity?", answer: "You can automate your marketing using AI and scrap email context with just a few clicks." },
    { id: 4, question: "Is there any Enterprise Licence available ?", answer: "Yes we provide Enterprise access on demand and recommend it for high scaling teams, contact us today for it." },
    { id: 5, question: "What is AI Emails?", answer: "AI emails lets you automate your marketing by writing personalized user friendly emails." },
    { id: 6, question: "What is the best plan I should go for?", answer: "For agency or individuals we recommend going for premium plan and for big teams we recommend going for Enterprise Plan." },
]

export default function Chatbot() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [messages, setMessages] = React.useState<Message[]>([
        { id: 1, text: "Hi there! How can I assist you today? Select a question below.", sender: 'bot' },
    ])
    const [typing, setTyping] = React.useState(false)
    const [questions, setQuestions] = React.useState(initialQuestions)

    const handleQuestionClick = (questionText: string, answerText: string, questionId: number) => {
        setMessages(prev => [
            ...prev,
            { id: Date.now(), text: questionText, sender: 'user' },
        ])
        setTyping(true)

        setTimeout(() => {
            setTyping(false)
            setMessages(prev => [
                ...prev,
                { id: Date.now() + 1, text: answerText, sender: 'bot' }
            ])
        }, 800)

        // Remove the selected question from the list
        setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionId))
    }

    return (
        <div className="fixed bottom-4 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.75, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.75, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4"
                    >
                        <Card className="w-80 sm:w-96 h-[500px] flex flex-col">
                            <CardHeader className="flex flex-row items-center border-b p-4">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                                <div className="ml-3">
                                    <p className="text-sm font-medium">AI Assistant</p>
                                    <p className="text-xs text-muted-foreground">Here to help</p>
                                </div>
                                <Button size="icon" variant="ghost" className="ml-auto rounded-full" onClick={() => setIsOpen(false)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="flex-grow overflow-y-auto p-4">
                                <AnimatePresence initial={false}>
                                    {messages.map((message) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                                            >
                                                {message.text}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {typing && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex justify-start mb-4 text-sm text-muted-foreground"
                                        >

                                            <Image src={TypingAnimation} alt="typing animation" height={30} width={30} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div className="mt-4 space-y-2 max-h-40 overflow-y">
                                    {questions.map(({ id, question, answer }) => (
                                        <Button
                                            key={id}
                                            variant="outline"
                                            className="w-full h-full text-left text-sm whitespace-normal break-words"
                                            onClick={() => handleQuestionClick(question, answer, id)}
                                        >
                                            {question}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="border-t p-4 text-sm text-muted-foreground">
                                Select a question to see the answer.
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                className="bg-primary text-primary-foreground rounded-full p-4 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <MessageCircle className="h-6 w-6 text-purple-500" />
            </motion.button>
        </div>
    )
}

import EmailsTable from '@/components/EmailsTable'
import FileUploadCard from '@/components/FileUploadCard'
import Dashboard from '@/components/HOC/Dashboard'
import LeadsCard from '@/components/LeadsCard'

const AiMailer = () => {
  return (
    <Dashboard>
      <h1
          className="p-2 sm:p-0 text-2xl font-bold text-black dark:text-white *:
        border-b-2 border-blue-500 dark:border-blue-500 pb-1 mb-2 max-w-max
        "
        >
          AI Mailer
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <FileUploadCard />
        <LeadsCard/>
        </div>


        <EmailsTable />
        
        </Dashboard>
  )
}

export default AiMailer
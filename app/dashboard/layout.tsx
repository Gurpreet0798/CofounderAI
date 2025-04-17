interface DashboardProps {
    children: React.ReactNode
}

const DashboardMain = ({ children }: DashboardProps) => {
    return (
            <div>
                {children}
            </div>
    )
}

export default DashboardMain 
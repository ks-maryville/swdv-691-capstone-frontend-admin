import NavBar from '../../components/Shared/NavBar';
export default function DashboardLayout({
    children,
}: {children: React.ReactNode}){
    return (
        <div>
            <NavBar/>
            {children}
        </div>
    )
};

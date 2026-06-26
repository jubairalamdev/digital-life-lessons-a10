import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";

const PublicLayout = ({children}) => {
    return (
        <div className="w-full">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default PublicLayout;
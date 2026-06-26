import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import React from 'react';

const ProtectedLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default ProtectedLayout;
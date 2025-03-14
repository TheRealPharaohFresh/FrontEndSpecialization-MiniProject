import React from "react";
import ProductManagement from "./ProductManagementPage";

const AdminPage: React.FC = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ProductManagement />
        </div>
    );
};

export default AdminPage;

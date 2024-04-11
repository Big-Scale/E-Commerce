import * as React from 'react';
import PrimarySearchAppBar from '../components/Layout/header';
import ProductManagementCpn from '../components/productManage';

export default function ProductManagementPage() {
    return (
        <div>
            <PrimarySearchAppBar />
            <ProductManagementCpn />
        </div>
    );
}
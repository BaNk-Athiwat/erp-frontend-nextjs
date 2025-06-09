"use client";

import { config } from "@/config/config";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { text } from "stream/consumers";
import Swal from "sweetalert2";

export default function Sidemenu() {

    const [username, setUsername] = useState("");
    const [currentPath, setCurrentPath] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetchData();
        setCurrentPath(localStorage.getItem('currentPath') || '');
        setDefaultSidebar();
    }, [])

    const setDefaultSidebar = () => {
        const sidebar = localStorage.getItem('sidebar');
        const sidebarElement = document.querySelector('.sidebar') as HTMLElement;
        if (sidebar == 'true') {
            sidebarElement.classList.add('hidden');
            
        } else {
            sidebarElement.classList.remove('hidden');
        }
    }

    const fetchData = async() => {
        try {
            const token = localStorage.getItem(config.tokenKey);
            const res = await axios.get(`${config.apiUrl}/api/users/admin-info`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if(res.status === 200) {
                setUsername(res.data.username);
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Can not fetch User Detail.',
                icon: 'error'
            })
        }
    }

    const handleLogout = async() => {
        try {
            const isLogout = await Swal.fire({
                title: 'Logout',
                text: 'Are you sure you want to Logout ?',
                icon: 'question',
                showConfirmButton: true,
                showCancelButton: true
            })

            if (isLogout.isConfirmed) {
                localStorage.removeItem(config.tokenKey);
                router.push('/');
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Can not Logout',
                icon: 'error'
            })
            
        }
    }

    const navigateAandSetCurrentPath = (path: string) => {
        router.push(path);
        setCurrentPath(path);
        localStorage.setItem('currentPath', path);
    }

    const isActive = (path: string) => {
        return currentPath === path ? 'sidebar-nav-link-active' : 'sidebar-nav-link';
    }

    const toggleSidebar = () => {
        const sidebar = document.querySelector('.sidebar') as HTMLElement;
        
        if (sidebar) {
            if (sidebar.classList.contains('hidden')) {
                sidebar.classList.remove('hidden');
                localStorage.setItem('sidebar', 'false');
            } else {
                sidebar.classList.add('hidden');
                localStorage.setItem('sidebar', 'true');
            }
            // sidebar.classList.toggle('hidden');
        }
    }

    return(
        <div className="flex items-start">
            <div className="sidebar">
                <div className="sidebar-container">
                    <div className="sidebar-title">
                        <h1>
                            <i className="fas fa-leaf mr-3"></i>
                            Spring ERP
                        </h1>
                        <div className="text-lg font-normal mt-3 mb-4">
                            <i className="fas fa-user mr-3"></i>
                            { username }
                        </div>
                        <div className="flex gap-3 m-3 justify-center">
                            <Link href={'/erp/user/edit'} className="btn-edit">
                                <i className="fas fa-edit mr-2"></i>
                                Edit
                            </Link>
                            <button className="btn-logout" onClick={ handleLogout }>
                                <i className="fas fa-sign-out mr-2"></i>
                                Logout
                            </button>
                        </div>
                    </div>
                    <nav>
                        <ul className="sidebar-nav-list">
                            <li className="sidebar-nav-item">
                                <div onClick={ () => navigateAandSetCurrentPath('/erp/dashboard') } className={ isActive('/erp/dashboard') }>
                                    <i className="fas fa-home mr-2"></i>
                                    Dashboard
                                </div>
                            </li>
                            <li className="sidebar-nav-item">
                                <div onClick={ () => navigateAandSetCurrentPath('/erp/stock') } className={ isActive('/erp/stock') }>
                                    <i className="fas fa-box-open mr-2"></i>
                                    Stock สินค้า
                                </div>
                            </li>
                            <li className="sidebar-nav-item">
                                <div onClick={ () => navigateAandSetCurrentPath('/erp/production') } className={ isActive('/erp/production') }>
                                    <i className="fas fa-cogs mr-2"></i>
                                    การผลิตสินค้า
                                </div>
                            </li>
                            <li className="sidebar-nav-item">
                                <div onClick={ () => navigateAandSetCurrentPath('/erp/sale') } className={ isActive('/erp/sale') }>
                                    <i className="fas fa-money-bill-trend-up mr-2"></i>
                                    ขาย
                                </div>
                            </li>
                            <li className="sidebar-nav-item">
                                <div onClick={ () => navigateAandSetCurrentPath('/erp/account') } className={ isActive('/erp/account') }>
                                    <i className="fas fa-file-invoice-dollar mr-2"></i>
                                    บัญชี
                                </div>
                            </li>
                            <li className="sidebar-nav-item">
                                <div onClick={ () => navigateAandSetCurrentPath('/erp/report') } className={ isActive('/erp/report') }>
                                    <i className="fas fa-chart-line mr-2"></i>
                                    รายงาน
                                </div>
                            </li>
                            <li className="sidebar-nav-item">
                                <div onClick={ () => navigateAandSetCurrentPath('/erp/user') } className={ isActive('/erp/user') }>
                                    <i className="fas fa-user-alt mr-2"></i>
                                    ผู้ใช้งานระบบ
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <button className="text-white ms-3 cursor-pointer" onClick={ toggleSidebar }>
                <i className="fa fa-bars"></i>
            </button>
        </div>
    )
}
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
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, [])

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

    return(
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
                    <div className="flex gap-1 m-3 justify-center">
                        <Link href={'erp/user/edit'} className="btn-edit">
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
                            <Link href={ 'erp/dashboard' } className="sidebar-nav-link">
                                <i className="fas fa-home mr-2"></i>
                                Dashboard
                            </Link>
                        </li>
                        <li className="sidebar-nav-item">
                            <Link href={ 'erp/stock' } className="sidebar-nav-link">
                                <i className="fas fa-box-open mr-2"></i>
                                Stock สินค้า
                            </Link>
                        </li>
                        <li className="sidebar-nav-item">
                            <Link href={ 'erp/production' } className="sidebar-nav-link">
                                <i className="fas fa-cogs mr-2"></i>
                                การผลิตสินค้า
                            </Link>
                        </li>
                        <li className="sidebar-nav-item">
                            <Link href={ 'erp/sale' } className="sidebar-nav-link">
                                <i className="fas fa-money-bill-trend-up mr-2"></i>
                                ขาย
                            </Link>
                        </li>
                        <li className="sidebar-nav-item">
                            <Link href={ 'erp/account' } className="sidebar-nav-link">
                                <i className="fas fa-file-invoice-dollar mr-2"></i>
                                บัญชี
                            </Link>
                        </li>
                        <li className="sidebar-nav-item">
                            <Link href={ 'erp/report' } className="sidebar-nav-link">
                                <i className="fas fa-chart-line mr-2"></i>
                                รายงาน
                            </Link>
                        </li>
                        <li className="sidebar-nav-item">
                            <Link href={ 'erp/user' } className="sidebar-nav-link">
                                <i className="fas fa-user-alt mr-2"></i>
                                ผู้ใช้งานระบบ
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
'use client';

import { config } from "@/config/config";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function EditProfile() {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()

    useEffect(() => {
        fetchUserData()
    }, [])

    const fetchUserData = async() => {
        try {
            const token = localStorage.getItem(config.tokenKey)
            const res = await axios.get(`${config.apiUrl}/api/users/admin-info`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (res.status === 200) {
                setName(res.data.name)
                setUsername(res.data.username)
                setEmail(res.data.email)
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Can not fetch user data',
                icon: 'error'
            })
        }
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                Swal.fire({
                    title: 'Error',
                    text: 'รหัสผ่านไม่ตรงกัน',
                    icon: 'error'
                })
                return;
            }

            const token = localStorage.getItem(config.tokenKey)
            const url = `${config.apiUrl}/api/users/admin-edit-profile`
            const payload = {
                name,
                username,
                email,
                password
            }
            const headers = {
                'Authorization': `Bearer ${token}`
            }

            const res = await axios.put(url, payload, { headers })

            if (res.status === 200) {
                Swal.fire({
                    title: 'Success',
                    text: 'แก้ไขข้อมูลสำเร็จ',
                    icon: 'success'
                })
            }
        } catch (error) {
            Swal.fire({
                    title: 'Error',
                    text: 'ไม่สามารถแก้ไขข้อมูลได้',
                    icon: 'error'
                })
        }
    }

    return (
        <div>
            <h1 className="login-title">แก้ไขข้อมูลส่วนตัว</h1>
            <div className="login-form">
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-input"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-input"
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-input"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-input"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="form-group flex items-center">
                    <button type="button" className="button" onClick={handleSubmit}>
                        <i className="fas fa-save mr-2"></i>
                        บันทึก
                    </button>
                </div>
            </div>
        </div>
    )
}
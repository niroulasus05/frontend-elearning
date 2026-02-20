import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const AdminLayout = () => {
    const { admin, loading } = useAdmin()
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading admin panel...</p>
            </div>
        )
    }

    if (!admin) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* Sidebar */}
            <aside className="w-64 bg-blue-600 text-white p-6">
                <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

                <nav className="space-y-4">
                    <a href="/admin/home" className="block hover:underline">
                        Dashboard
                    </a>
                    <a href="/admin/courses" className="block hover:underline">
                        Courses
                    </a>
                    <a href="/admin/users" className="block hover:underline">
                        Users
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>

        </div>
    )
}

export default AdminLayout

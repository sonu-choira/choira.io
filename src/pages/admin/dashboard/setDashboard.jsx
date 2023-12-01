import React, { useState } from 'react'
import AdminDashboard from './dashboard';

export default function ShowDashboardPage() {

    const [dashboard, setDashboard] = useState(1)

    const showaddpage = () => {
        setDashboard(2)
    }

    return (
        <>
            {
                dashboard === 1 ?
                    <AdminDashboard />
                    : null
            }
        </>
    )
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import UserTable from "@/Pages/User/UserTable";

export default function Index({users, queryParams = null, success}){

return(
<AuthenticatedLayout
header = {
    <div className="flex justify-between items-center"> 
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            User
        </h2>
        <Link href={route("user.create")}
        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
        >Add new</Link>
    </div>
}
>

<Head title="User"/>
{success && (
<div className="bg-emerald-500 py-2 px-4 text-white rounded">
    {success}
</div>
)}

<div className="py-2">
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6 text-gray-900 dark:text-gray-100">
            <UserTable
                users = {users}
                queryParams = {queryParams}
            />
        </div>
    </div>
</div>


</AuthenticatedLayout>


);

}
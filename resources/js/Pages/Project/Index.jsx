import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";


export default function index({projects}){
    return(
        <AuthenticatedLayout

        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Projects
            </h2>
        }
        >
         
         <Head title="Projects"/>
         
            <div className="py-12">
            <div className="mx-auto max-w-9xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-900">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    
                    <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-700 shadow-md rounded-lg">
                        <thead className="bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        <tr>
                            <th className="border-b px-4 py-3 text-left font-medium">ID</th>
                            <th className="border-b px-4 py-3 text-left font-medium">Image</th>
                            <th className="border-b px-4 py-3 text-left font-medium">Name</th>
                            <th className="border-b px-4 py-3 text-left font-medium">Status</th>
                            <th className="border-b px-4 py-3 text-left font-medium">Create Date</th>
                            <th className="border-b px-4 py-3 text-left font-medium">Due Date</th>
                            <th className="border-b px-4 py-3 text-left font-medium">Created By</th>
                            <th className="border-b px-4 py-3 text-left font-medium">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projects.data.map((project, index) => (
                            <tr 
                            key={project.id} 
                            className={`${
                                index % 2 === 0 
                                ? 'bg-gray-100 dark:bg-gray-800' 
                                : 'bg-gray-50 dark:bg-gray-700'
                            } hover:bg-gray-200 dark:hover:bg-gray-600 transition`}
                            >
                            <td className="px-4 py-3 border-b border-gray-700 dark:text-gray-300">{project.id}</td>
                            <td className="px-4 py-3 border-b border-gray-700">
                                <img 
                                src={project.image_path} 
                                alt="Project" 
                                className="w-8 h-8 object-cover rounded-md border border-gray-500" 
                                />
                            </td>
                            <td className="px-4 py-3 border-b border-gray-700 dark:text-gray-300">{project.name}</td>
                            <td className="px-4 py-3 border-b border-gray-700">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                project.status === 'Completed' 
                                    ? 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200' 
                                    : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200'
                                }`}>
                                {project.status}
                                </span>
                            </td>
                            <td className="px-4 py-3 border-b border-gray-700 dark:text-gray-400">{project.created_at}</td>
                            <td className="px-4 py-3 border-b border-gray-700 dark:text-gray-400">{project.due_date}</td>
                            <td className="px-4 py-3 border-b border-gray-700 dark:text-gray-300">{project.createdBy.name}</td>
                            <td className="px-4 py-3 border-b border-gray-700">
                               <Link
                               href={route("project.edit", project.id)}
                               className="text-blue-600 hover:underline dark:text-blue-400"
                               >
                                Edit
                               </Link>
                               
                                <Link 
                                href={route("project.destroy", project.id)}
                                className="text-red-600 hover:underline ml-2 dark:text-red-400"
                                >Delete</Link>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Pagination links={projects?.meta?.links || []} />
                    </div>
                </div>
                </div>
            </div>
            </div>


            

        </AuthenticatedLayout>
    )
}
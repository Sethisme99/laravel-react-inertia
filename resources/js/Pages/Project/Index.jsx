import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";


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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                        <table class="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">ID</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">Image</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">Name</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">Status</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">Create Date</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">Due Date</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">Created By</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                
                            {projects.data.map(project => (
                                <tr key={project.id}>
                                    <td>{project.name}</td>
                                </tr>
                                ))}


                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
            

        </AuthenticatedLayout>
    )
}
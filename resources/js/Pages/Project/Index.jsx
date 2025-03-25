import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ProjectTable from "./ProjectTable";

export default function index({projects, queryParams = null, success}){

  return(
    <AuthenticatedLayout
    header={
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Projects
        </h2>

        <Link href={route("project.create")}
        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
        Add new
        </Link>
      </div>
    }>


    {/*Tab title props component*/}
      <Head title="Project"/>


    {success &&(
      <div className="bg-emerald-500 py-2 px-4 text-white rounded">
        {success}
      </div>)}


        {/*Main Props Component*/}
        <div className="py-12">
        <div className="mx-auto max-w-10xl sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-900">
            <div className="p-6 text-gray-900 dark:text-gray-100">

              <ProjectTable
                projects={projects}
                queryParams={queryParams}
              />

            </div>
            </div>
        </div>
        </div>
    </AuthenticatedLayout>
)}
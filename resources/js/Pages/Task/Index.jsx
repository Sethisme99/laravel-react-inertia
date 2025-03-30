import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TaskTable from "./TaskTable";


export default function index({tasks, queryParams = null}){

  return(
   //use default layout from breeze and modified it:
  <AuthenticatedLayout
    header={
    <div className="flex justify-between item-center">
     <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Tasks
     </h2>

    <Link href={route("task.create")}
    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
    >
    Add new
    </Link>
    </div>
    }>


  {/*Tab title props component*/}
  <Head title="Task"/>

  {/*Main Props Component*/}
    <div className="py-12">
       <div className="mx-auto max-w-9xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-900">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              {/*TaskTable component*/}
              <TaskTable
                tasks={tasks}
                queryParams={queryParams}
              />

            </div>
          </div>
        </div>
      </div>
</AuthenticatedLayout>)}
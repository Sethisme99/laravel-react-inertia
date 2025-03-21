import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TaskTable from "./TaskTable";


export default function index({tasks, queryParams = null}){


  return(
   //use default layout from breeze and modified it:
  <AuthenticatedLayout
    //header props components
    header={
     <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Tasks
     </h2>
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
        </AuthenticatedLayout>
    )
}
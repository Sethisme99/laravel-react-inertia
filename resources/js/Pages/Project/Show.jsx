import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import TaskTable from "../Task/TaskTable";

export default function Show({project, tasks, queryParams})
{

 return (
        <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Show
            </h2>
        }
        >
            <Head title={`Project"${project.name}"`}/>

        </AuthenticatedLayout>
  );


}
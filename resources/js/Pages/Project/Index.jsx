import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.jsx";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import {ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/16/solid';
import TableHeading from "@/Components/TableHeading";



export default function index({projects, queryParams = null}){

  {/*Fileter function start*/}
  queryParams = queryParams || {}
  const searchFieldChanged = (name, value) =>{
    if(value){
      queryParams[name] = value
    }else{
      delete queryParams[name]
    }
    router.get(route('project.index'), queryParams)
  }

  const onKeyPress = (name, e)=>{
    if(e.key !== 'Enter') return;
    searchFieldChanged(name, e.target.value);
  }

  {/*Sort function*/}

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("project.index"), queryParams);
  };


  return(
        <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Projects
            </h2>
        }
        >

        {/*Tab title props component*/}
         <Head title="Project"/>

            {/*Main Props Component*/}
            <div className="py-12">
            <div className="mx-auto max-w-9xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-900">
                <div className="p-6 text-gray-900 dark:text-gray-100">

                    <div className="overflow-x-auto">
                      {/*Project Table*/}
                    <table className="min-w-full border border-gray-700 shadow-md rounded-lg">

                        {/*Table*/}

                      <thead className="bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-b font-medium">
                          <tr>
                              <TableHeading
                                name="id"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                              >
                                ID
                              </TableHeading>

                              <th className="px-4 py-3 text-left">Image</th>

                              <TableHeading
                                name="name"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                              >
                                Name
                              </TableHeading>

                              <TableHeading
                                name="status"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                              >
                                Status
                              </TableHeading>


                              <TableHeading
                                name="created_at"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                              >
                                Create Date
                              </TableHeading>


                              <TableHeading
                                name="due_date"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                              >
                                Due Date
                              </TableHeading>


                              <th className="px-4 py-3 text-left">Created By</th>
                              <th className="px-4 py-3 text-left">Actions</th>
                          </tr>
                      </thead>



                    {/*Filter*/}
                    <thead className="bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        <tr>
                            <th className="border-b px-4 py-3 text-left font-medium"></th>
                            <th className="border-b px-4 py-3 text-left font-medium"></th>

                            <th className="border-b px-4 py-3 text-left font-medium">
                                <TextInput className="w-full"
                                placeholder = "Project Name:"
                                defaultValue = {queryParams.name}
                                onBlur = {e=>searchFieldChanged('name', e.target.value)}
                                onKeyPress={e => onKeyPress('name', e)} />
                            </th>
                            <th className="border-b px-4 py-3 text-left font-medium">
                                <SelectInput className="w-full"
                                defaultValue = {queryParams.status}
                                onChange = {(e)=>
                                  searchFieldChanged("status", e.target.value)
                                }>
                                  <option value="">Selete Status</option>
                                  <option value="pending">Pending</option>
                                  <option value="in_progress">In Progress</option>
                                  <option value="completed">Completed</option>
                                </SelectInput>
                            </th>
                            <th className="border-b px-4 py-3 text-left font-medium"></th>
                            <th className="border-b px-4 py-3 text-left font-medium"></th>
                            <th className="border-b px-4 py-3 text-left font-medium"></th>
                            <th className="border-b px-4 py-3 text-left font-medium"></th>
                        </tr>
                        </thead>

                        {/*Body TB*/}
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
                                <span className={"px-2 py-1 rounded text-white " +
                                 PROJECT_STATUS_CLASS_MAP[project.status]
                                }>
                                {PROJECT_STATUS_TEXT_MAP[project.status]}
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
                      {/*Pagination*/}
                    <Pagination links={projects?.meta?.links || []} />
                    </div>
                </div>
                </div>
            </div>
            </div>




        </AuthenticatedLayout>
    )
}
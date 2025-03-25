import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Link, router } from "@inertiajs/react";

export default function TaskTable({project, tasks, queryParams = null, hideProjectColumn = false}){

queryParams = queryParams || {}

{/*Fileter function start*/}
const searchFieldChanged = (name, value) => {
  // Preserve existing filters while updating the new one
  const updatedParams = {
      ...queryParams,  // ✅ Keep existing filters
      [name]: value || undefined, // ✅ Update new filter (remove if empty)
  };

  // ✅ If inside a project, stay within the project page
  if (project) {
      router.get(route("project.show", project.id), updatedParams, {
          preserveScroll: true,
          preserveState: true,
      });
  } else {
      router.get(route("task.index"), updatedParams, {
          preserveScroll: true,
          preserveState: true,
      });
  }
};

{/*Key Press function*/}
const onKeyPress = (name, e)=>{
    if(e.key !== 'Enter') return;
    searchFieldChanged(name, e.target.value);
};

{/*Sort function*/}

const sortChanged = (name) => {
    const newSortDirection =
      queryParams.sort_field === name && queryParams.sort_direction === "asc"
        ? "desc"
        : "asc";

    const updatedParams = {
      ...queryParams,
      sort_field: name,
      sort_direction: newSortDirection,
    };

    // If the table is inside a Project Page, keep sorting within that project
    if (project) {
      router.get(route("project.show", project.id), updatedParams, {
        preserveScroll: true,  // ✅ Stops page from jumping to top
        preserveState: true,   // ✅ Prevents unnecessary re-renders
      });
    } else {
      router.get(route("task.index"), updatedParams, {
        preserveScroll: true,  // ✅ Stops page from jumping to top
        preserveState: true,   // ✅ Prevents unnecessary re-renders
      });
}};


return(
<>
<div className="overflow-x-auto">

{/*Task Table*/}

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

 {!hideProjectColumn && (<th className="px-4 py-3 text-left">Project Name</th>)}

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
    placeholder = "Task Name:"
    defaultValue = {queryParams.name}
    onBlur = {e=>searchFieldChanged('name', e.target.value)}
    onKeyPress={e => onKeyPress('name', e)} />
</th>

{!hideProjectColumn && (<th className="border-b px-4 py-3 text-left font-medium"></th>)}

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

{tasks.data.map((task, index) => (
    <tr
    key={task.id}
    className={`${
        index % 2 === 0
        ? 'bg-gray-100 dark:bg-gray-800'
        : 'bg-gray-50 dark:bg-gray-700'
    } hover:bg-gray-200 dark:hover:bg-gray-600 transition`}
    >
    <td className="px-4 py-3 border-b border-gray-700 dark:text-gray-300">{task.id}</td>
    <td className="px-4 py-3 border-b border-gray-700">
        <img
        src={task.image_path}
        alt="Task"
        className="w-8 h-8 object-cover rounded-md border border-gray-500"
    />
</td>

<td className="px-4 py-3 border-b border-gray-700 dark:text-gray-300">{task.name}</td>
{!hideProjectColumn && (<td className="px-4 py-3 border-b border-gray-700 dark:text-gray-300">{task.project.name}</td>)}

<td className="px-4 py-3 border-b border-gray-700">
    <span className={"px-2 py-1 rounded text-white " +
        TASK_STATUS_CLASS_MAP[task.status]
    }>
    {TASK_STATUS_TEXT_MAP[task.status]}
    </span>
</td>
<td className="px-4 py-3 border-b border-gray-700 dark:text-gray-400">{task.created_at}</td>
<td className="px-4 py-3 border-b border-gray-700 dark:text-gray-400">{task.due_date}</td>
<td className="px-4 py-3 border-b border-gray-700 dark:text-gray-300">{task.createdBy.name}</td>
<td className="px-4 py-3 border-b border-gray-700">
    <Link
    href={route("task.edit", task.id)}
    className="text-blue-600 hover:underline dark:text-blue-400"
    >
        Edit
        </Link>

        <Link
        href={route("task.destroy", task.id)}
        className="text-red-600 hover:underline ml-2 dark:text-red-400"
        >Delete</Link>
    </td>
    </tr>
))}
</tbody>
</table>
    {/*Pagination*/}
<Pagination links={tasks?.meta?.links || []} />
</div>
</>)}
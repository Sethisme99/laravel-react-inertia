import Pagination from "@/Components/Pagination";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { Link, router } from "@inertiajs/react";

export default function UserTable({
    users,
    queryParams = null,
}){

//if queryParams is not null then return it as empty obj:
queryParams = queryParams || {};

//Filter Function:
const searchFieldChanged = (name, value) => {
    if(value){
        queryParams[name] = value;
    }else{
        delete queryParams[name];
    }
    router.get(route('user.index'), queryParams);
}

//key press for search field
const onKeyPress = (name, e)=>{
    if(e.key !== 'Enter') return;
    searchFieldChanged(name, e.target.value);
}

//sort:
const sortChanged =(name)=>{
    const newSortDirection = 
        queryParams.sort_field === name &&
        queryParams.sort_direction === "asc"
            ? "desc"
            : "asc";

    const updatedParams = {
        ...queryParams,
        sort_field: name,
        sort_direction: newSortDirection,
    };

    router.get(route("user.index"), updatedParams,{
        preserveScroll: true,
        preserveState: true,
    });
}

//delete function:
const deleteUser = (user) =>{
  if(!window.confirm("Are you sure you want to delete the User?")){
    return;
  }
  console.log("id",user.id);
  router.delete(route("user.destroy", user.id));
};



return(
  <>
  <div className="overflow-x-auto">

    {/*User Table*/}
  <table className="min-w-full border border-gray-700 shadow-md rounded-lg">


    {/*Table with sorting function*/}
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
              Email
            </TableHeading>

            <TableHeading
              name="created_at"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            >
              Create Date
            </TableHeading>

            <th className="px-4 py-3 text-left">Actions</th>
        </tr>
    </thead>



  {/*Filter*/}
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
    <tr className="text-nowrap">
        <th className="px-3 py-3"></th>
        <th className="px-3 py-3"></th>
        <th className="px-3 py-3">
        <TextInput
            className="w-full"
            defaultValue={queryParams.name}
            placeholder="User Name"
            onBlur={(e) =>
            searchFieldChanged("name", e.target.value)
            }
            onKeyPress={(e) => onKeyPress("name", e)}
        />
        </th>
        <th className="px-3 py-3">
        <TextInput
            className="w-full"
            defaultValue={queryParams.email}
            placeholder="User Email"
            onBlur={(e) =>
            searchFieldChanged("email", e.target.value)
            }
            onKeyPress={(e) => onKeyPress("email", e)}
        />
        </th>
        <th className="px-3 py-3"></th>
        <th className="px-3 py-3"></th>
    </tr>
  </thead>

  {/*Body TB*/}
    <tbody>
    {users.data.map((user, index) => (
        <tr
        key={user.id}
        className={`${
            index % 2 === 0
            ? 'bg-gray-100 dark:bg-gray-800'
            : 'bg-gray-50 dark:bg-gray-700'
        } hover:bg-gray-200 dark:hover:bg-gray-600 transition`}
        >
        <td className="px-4 py-3 border-b border-gray-700 dark:text-gray-300">{user.id}</td>
        <td className="px-4 py-3 border-b border-gray-700">
            <img
            src={user.image_path}
            alt="User"
            className="w-8 h-8 object-cover rounded-md border border-gray-500"
            />
        </td>
        <td className="px-4 py-3 border-b border-gray-700 dark:text-gray-300">
            {user.name}
        </td>
        <td className="px-4 py-3 border-b border-gray-700 dark:text-gray-300">
          {user.email}
        </td>
        <td className="px-4 py-3 border-b border-gray-700 dark:text-gray-400">{user.created_at}</td>
        
        <td className="px-4 py-3 border-b border-gray-700">
            <Link
            href={route("user.edit", user.id)}
            className="text-blue-600 hover:underline dark:text-blue-400"
            >
            Edit
            </Link>

            <button
            onClick={(e)=>deleteUser(user)}
            className="text-red-600 hover:underline ml-2 dark:text-red-400"
            >Delete</button>
        </td>
        </tr>
    ))}
    </tbody>
  </table>
  {/*Pagination*/}
  <Pagination links={users?.meta?.links || []} />
  </div>
</>
);}
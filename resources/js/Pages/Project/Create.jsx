import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";

export default function Create(){

  //Inertia.js, the useForm helper
  const {data, setData, post, errors, reset} = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });

  //submit form function:
  const onSubmit = (e) => {
    e.preventDefault();
    post(route("project.store"));
  };


return(
  <AuthenticatedLayout
  header={
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Create new Project
      </h2>
    </div>
  }>

  <Head title="Create"/>


  <div className="py-12">
  <div className="mx-auto max-w-10xl sm:px-6 lg:px-8">
    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-900">
    <div className="p-6 text-gray-900 dark:text-gray-100">

    <form
      onSubmit={onSubmit}
      className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
    >
      {/*Image*/}
      <div className="mt-4">
        <InputLabel
          htmlFor = "project_image_path"
          value = "Project Image"
        />
        <TextInput
          className="mt-1 block w-full"
          id="project_image_path"
          type="file"
          name="image"
          onChange={(e)=> setData("image", e.target.files[0])}
        />
        <InputError message={errors.image} className="mt-2"/>
      </div>

      {/*name*/}
      <div className="mt-4">
        <InputLabel
          htmlFor = "project_name"
          value= "Project Name"
        />
        <TextInput
        className="mt-1 block w-full"
          id = "project_name"
          type = "text"
          name = "name"
          value = {data.name}
          isFocused = {true}
          onChange={(e)=> setData("name", e.target.value)}
        />
        <InputError message={errors.name} className="mt-2"/>
      </div>

      <div className="mt-4">
          <InputLabel
            htmlFor = "project_description"
            value = "Project Description"
          />

          <TextAreaInput
            className = "mt-1 block w-full"
            id = "project_description"
            name = "description"
            value = {data.description}
            onChange={(e)=> setData("description", e.target.value)}
          />
          <InputError message={errors.description} className="mt-2"/>
      </div>

      <div className="mt-4">
        <InputLabel
            htmlFor = "project_due_date"
            value = "Project Deadline"
        />

        <TextInput
          className = "mt-1 block w-40 text-block"
          id = "project_due_date"
          type = "date"
          name = "due_date"
          value = {data.due_date}
          onChange = {(e)=> setData("due_date", e.target.value)}
        />

          <InputError message={errors.due_date} className="mt-2" />
      </div>

      <div className="mt-4">
        <InputLabel
          htmlFor = "project_status"
          value = "Project_Status"
        />

        <SelectInput
          className = "mt-1 block w-full"
          name = "status"
          id = "project_status"
          value = {data.status}
          onChange = {(e)=> setData("status", e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completet</option>
        </SelectInput>

        <InputError message={errors.status} className="mt-2"/>
      </div>

      <div className="mt-4 text-right">
        <Link
          href={route("project.index")}
          className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
        >
          Cancel
        </Link>
        <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
          Submit
        </button>

      </div>
    </form>

    </div>
    </div>
  </div>
  </div>
    </AuthenticatedLayout>
  );
}
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, useForm} from '@inertiajs/react';
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";


export default function ({projects, users}){

const {data, setData, post, errors, reset} = useForm({
  image: "",
  name: "",
  status: "",
  description: "",
  due_date: "",
});

const onSubmit = (e)=>{
  e.preventDefault();
  post(route("task.store"));
};

  return(

    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new Task
          </h2>
        </div>
      }>

      <Head title="Create"/>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg-px-8">
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <form onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
              >
                <div>
                  <InputLabel
                    htmlFor = "task_project_id"
                    value="Project"
                  />

                  <SelectInput
                    className="mt-1 block w-full"
                    name="project_id"
                    id="task_project_id"
                    onChange={(e)=> setData("project_id", e.target.value)}
                  >
                    <option value="">Select Project</option>
                    {projects.data.map((project)=>(
                      <option value={project.id} key={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </SelectInput>
                  <InputError message={errors.project_id} className="mt-2"/>
                </div>

                <div className="mt-4">
                  <InputLabel
                    htmlFor = "task_image_path"
                    value = "Task Image"
                  />

                  <TextInput
                    className="mt-1 block w-full"
                    id="task_image_path"
                    type="file"
                    name="image"
                    onChange={(e)=>setData("image", e.target.files[0])}
                  />
                  <InputError message={errors.image} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel
                      htmlFor="task_name"
                      value="Task Name"
                    />

                    <TextInput
                      className="mt-1 block w-full"
                      id="task_name"
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={(e)=> setData("name", e.target.value)}
                    />

                    <InputError message={errors.name} className="mt-2"/>
                </div>


              </form>

            </div>
        </div>
      </div>


    </AuthenticatedLayout>
  )

}
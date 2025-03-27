import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create(){

    const {data, setData, post, errors, reset} = useForm({
        image: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const onSubmit = (e)=>{
        e.preventDefault();
        post(route("user.store"));
    }


return(
  <AuthenticatedLayout
  header={
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Create new User
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
          htmlFor = "user_image_path"
          value = "User Image"
        />
        <TextInput
          className="mt-1 block w-full"
          id="user_image_path"
          type="file"
          name="image"
          onChange={(e)=> setData("image", e.target.files[0])}
        />
        <InputError message={errors.image} className="mt-2"/>
      </div>

      {/*name*/}
      <div className="mt-4">
        <InputLabel
          htmlFor = "user_name"
          value= "User Name"
        />
        <TextInput
        className="mt-1 block w-full"
          id = "user_name"
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
            htmlFor = "user_email"
            value = "User_Email"
          />

          <TextInput
            className = "mt-1 block w-full"
            id = "user_email"
            type = "text"
            name = "email"
            value = {data.email}
            onChange={(e)=> setData("email", e.target.value)}
          />
          <InputError message={errors.email} className="mt-2"/>
      </div>

      <div className="mt-4">
        <InputLabel
            htmlFor = "user_password"
            value = "Password"
        />

        <TextInput
          className = "mt-1 block w-40 text-block"
          id = "user_password"
          type = "password"
          name = "password"
          value = {data.password}
          onChange = {(e)=> setData("password", e.target.value)}
        />

          <InputError message={errors.password} className="mt-2" />
      </div>

      <div className="mt-4">
        <InputLabel
            htmlFor = "user_password_confirmation"
            value = "Password_Confirmation"
        />

        <TextInput
          className = "mt-1 block w-40 text-block"
          id = "user_password_confirmation"
          type = "password"
          name = "password_confirmation"
          value = {data.password_confirmation}
          onChange = {(e)=> setData("password_confirmation", e.target.value)}
        />

          <InputError message={errors.password_confirmation} className="mt-2" />
      </div>

      <div className="mt-4 text-right">
        <Link
          href={route("user.index")}
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
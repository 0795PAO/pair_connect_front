// import { useForm } from "react-hook-form"
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
// } from "@/components/ui/form"
// import CustomInput from "./components/CustomInput"
// import ModeToggle from "./components/ModeToggle"

// const formSchema = yup.object().shape({
//   username: yup
//     .string()
//     .min(2, "El username tendria que tener minimo dos caracteres")
//     .required("Username esta requerido"),
// })

// const App = () => {
//   const form = useForm({
//     resolver: yupResolver(formSchema),
//   })

//   const onSubmit = (data) => {
//     console.log(data)
//   }

//   return (
//     <>
//       <ModeToggle/>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[90vw] md:w-[50vw] lg:w-[90vw] p-5 border border-primary-foreground">
//           <CustomInput label='Username' placeholder='username' description='Your display name' form={form} />
//           <Button type="submit">Submit</Button>
//         </form>
//       </Form>
//     </>

//   )
// }

// export default App
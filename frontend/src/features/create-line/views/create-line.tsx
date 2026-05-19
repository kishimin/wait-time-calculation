import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { formSchema, type FormSchema } from "../schemas/form";

const CreateLine = () => {
  const {
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  return (
    <>
      <TextField
        {...register("title")}
        label={"タイトル"}
        required
        error={!!errors.title}
        helperText={errors.title?.message}
      />
    </>
  );
};

export default CreateLine;

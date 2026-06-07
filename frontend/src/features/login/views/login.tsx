import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { formSchema } from "../schemas/login-form";
import type { FormSchema } from "../types/login-form";

const Login = () => {
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
        {...register("userName")}
        label={"ユーザー名"}
        required
        error={!!errors.userName}
        helperText={errors.userName?.message}
      />
    </>
  );
};

export default Login;

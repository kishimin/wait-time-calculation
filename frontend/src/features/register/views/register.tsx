import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { formSchema } from "../schemas/form";
import type { FormSchema } from "../types/form";

const Register = () => {
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

      <TextField
        {...register("password")}
        label={"パスワード"}
        type={"password"}
        required
        error={!!errors.password}
        helperText={errors.password?.message}
      />
    </>
  );
};

export default Register;

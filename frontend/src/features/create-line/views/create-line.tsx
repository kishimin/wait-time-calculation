import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CircularProgress,
  FormControl,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { usePostApiLine } from "../../../api/endpoints/line/line";
import { formSchema } from "../schemas/form";
import type { FormSchema } from "../types/form";

const CreateLine = () => {
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const { isPending, mutate } = usePostApiLine({
    mutation: {
      onSuccess: async () => {
        setOpen(true);

        await navigate("/");
      },
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    mutate({ data });
  };

  return (
    <>
      {isPending ? (
        <CircularProgress />
      ) : (
        <>
          <FormControl
            component={"form"}
            onSubmit={(e) => {
              return void handleSubmit(onSubmit)(e);
            }}
            noValidate
          >
            <TextField
              {...register("title")}
              label={"タイトル"}
              required
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              {...register("explanation")}
              label={"説明"}
              error={!!errors.explanation}
              helperText={errors.explanation?.message}
            />

            <Button type={"submit"}>{"作成"}</Button>
          </FormControl>

          <Snackbar message={"作成しました"} open={open} />
        </>
      )}
    </>
  );
};

export default CreateLine;

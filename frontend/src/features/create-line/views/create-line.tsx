import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { usePostApiLine } from "../../../api/endpoints/line/line";
import { formSchema } from "../schemas/form";
import type { FormSchema } from "../types/form";

const CreateLine = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const { isPending, mutate } = usePostApiLine();

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    mutate({ data });
  };

  return (
    <>
      {isPending ? (
        <CircularProgress />
      ) : (
        <FormControl
          component={"form"}
          onSubmit={(e) => {
            return void handleSubmit(onSubmit)(e);
          }}
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
      )}
    </>
  );
};

export default CreateLine;

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { usePostApiLine } from "../../../api/endpoints/line/line";
import { useSnackbar } from "../../../hooks/use-snackbar";
import { PATHS } from "../../../types/paths";
import { formSchema } from "../schemas/line-form";
import type { FormSchema } from "../types/line-form";

const CreateLine = () => {
  const { toggleSnack } = useSnackbar();

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
        toggleSnack({ message: "作成しました" });

        await navigate(PATHS.index);
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
            aria-label={"作成フォーム"}
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
        </>
      )}
    </>
  );
};

export default CreateLine;

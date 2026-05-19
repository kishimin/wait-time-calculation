import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const CreateLine = () => {
  const { register } = useForm();
  return (
    <>
      <TextField label={"タイトル"} required />
    </>
  );
};

export default CreateLine;

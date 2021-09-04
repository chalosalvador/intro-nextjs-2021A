import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import * as yup from "yup";
import Article from "../../api/article";

const schema = yup.object().shape({
  title: yup.string().required("Este campo obligatorio"),
  body: yup.string().required("Este campo obligatorio"),
  category_id: yup.string().required("Este campo obligatorio"),
  image: yup.mixed().required("Este campo obligatorio"),
});
const NewPostPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log("values", values);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("body", values.body);
    formData.append("category_id", values.category_id);
    formData.append("image", values.image[0]);

    const response = await Article.create(formData);

    console.log("response", response);
    // reset();
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6} justifyContent="center">
        <h1>Crear un nuevo post</h1>
        <Paper elevation={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Título"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              <p>{errors.title?.message}</p>
            </div>

            <div>
              <Controller
                name="body"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    maxRows={6}
                    label="Texto del artículo"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              <p>{errors.body?.message}</p>
            </div>

            <div>
              <Controller
                name="category_id"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Category"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              <p>{errors.category_id?.message}</p>
            </div>

            <div>
              <input
                type="file"
                id="image"
                name="image"
                {...register("image")}
              />
              <p>{errors.title?.message}</p>
            </div>

            <Button type="submit" color="primary" variant="contained">
              Crear artículo
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NewPostPage;

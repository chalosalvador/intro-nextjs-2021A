import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../api";
import User from "../api/user";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const [errors, setErrors] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Enviando los datos...");

    try {
      const userData = {
        ...formData,
        role: "ROLE_USER",
      };
      const response = await User.register(userData);
      console.log("response", response);
      setUserInfo(response.data);

      setResult("Usuario registrado correctamente");
    } catch (e) {
      console.log("e", e.response);
      const { response } = e;
      setResult("Ocurrió un error :(");

      if (response) {
        if (response.data.errors) {
          const errors = response.data.errors;
          const errorList = [];
          for (let field in errors) {
            errorList.push(errors[field]);
          }
          setErrors(errorList);
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("name")} placeholder="Nombre" />
        </div>
        <div>
          <input
            type="email"
            {...register("email")}
            placeholder="Correo electrónico"
          />
        </div>
        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Contraseña"
          />
        </div>
        <div>
          <input
            type="password"
            {...register("password_confirmation")}
            placeholder="Confirme su contraseña"
          />
        </div>
        <div>
          <input
            type="text"
            {...register("editorial")}
            placeholder="Editorial"
          />
        </div>
        <div>
          <textarea {...register("short_bio")} placeholder="Biografía corta" />
        </div>

        <p>{result}</p>
        {userInfo && (
          <div>
            <div>Nombre: {userInfo.name}</div>
            <div>Token: {userInfo.token}</div>
          </div>
        )}

        {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <input type="submit" />
      </form>
    </div>
  );
};

export default RegisterPage;

// import React from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, Form } from "antd";

// const LoginForm = ({ onSubmit }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onFormSubmit = (data) => {
//     onSubmit(data);
//   };

//   return (
//     <Form layout="vertical" onFinish={handleSubmit(onFormSubmit)}>
//       <Form.Item label="Email">
//         <Input
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: "",
//               message: "Entered value does not match email format",
//             },
//           })}
//         />
//         {errors.email && <span>{errors.email.message}</span>}
//       </Form.Item>

//       <Form.Item label="Password">
//         <Input.Password
//           {...register("password", { required: "Password is required" })}
//         />
//         {errors.password && <span>{errors.password.message}</span>}
//       </Form.Item>

//       <Button type="primary" htmlType="submit">
//         Login
//       </Button>
//     </Form>
//   );
// };

// export default LoginForm;
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Form } from "antd";

const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onFormSubmit)}>
      <Form.Item label="Email">
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]/,
              message: "Entered value does not match email format",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </Form.Item>

      <Form.Item label="Password">
        <Input.Password
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;

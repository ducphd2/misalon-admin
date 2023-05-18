import React, { lazy } from "react";
import { StyleAdd } from "./styles";
import Input from "../../../components/Input/Input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const Button = lazy(() => import("../../../components/Button"));

const initialValues = {
  email: "",
  fullName: "",
  address: "",
  phoneNumber: "",
};
const CreateUserSchema = z.object({
  email: z.string({
    required_error: "Email is valid",
  }),
  fullName: z.string({
    required_error: "fullName is valid",
  }),
  address: z.string({
    required_error: "address is valid",
  }),
  phoneNumber: z.string({
    required_error: "phoneNumber is valid",
  }),
});
export const ModalAddUser = () => {
  const {
    control,
    reset,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(CreateUserSchema),
  });
  const onSubmit = (values: any) => {
    console.log("first");
    console.log(values);
  };
  return (
    <StyleAdd.Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={"email"}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div style={{ marginTop: "20px" }}>
              <Input label="Email" placeholder="Your email" />
              {error && <p style={{ color: "red" }}>{error.message}</p>}
            </div>
          )}
        />
        <Controller
          name={"fullName"}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div style={{ marginTop: "20px" }}>
              <Input label="User Name" placeholder="Your user name" />
              {error && <p style={{ color: "red" }}>{error.message}</p>}
            </div>
          )}
        />
        <Controller
          name={"phoneNumber"}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div style={{ marginTop: "20px" }}>
              <Input label="Phone Number" placeholder="Your phone number" />
              {error && <p style={{ color: "red" }}>{error.message}</p>}
            </div>
          )}
        />
        <Controller
          name={"address"}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div style={{ marginTop: "20px" }}>
              <Input label="Address" placeholder="Your email" />
              {error && <p style={{ color: "red" }}>{error.message}</p>}
            </div>
          )}
        />
        <Controller
          name={"email"}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Button
              label="Submit"
              type="submit"
              // classType={cx("btn-submit")}
            />
          )}
        />
      </form>
    </StyleAdd.Wrapper>
  );
};

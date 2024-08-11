import { useState } from "react";
import { useForm } from "react-hook-form";

type Form = {
  Name: string;
  Email: string;
  Message: string;
};
const ContactForm = () => {
  const form = useForm<Form>();
  const { register, handleSubmit, formState } = form;

  const { errors } = formState;
  const [successful, setSuccessful] = useState(false);

  const onSubmit = (data: Form) => {
    // Testing
    console.log(data);
    setSuccessful(true);
  };
  return (
    <div className="general">
      <h1 style={{ color: "green" }}>Contact Form </h1>

      <h2 className="description">
        Got a question? We would love to hear from you. Send us a Message and we
        will respond as soon as possible.
      </h2>

      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">
          Full Name &nbsp; <span style={{ color: "red" }}> *</span>
        </label>

        <input
          type="text"
          id="username"
          placeholder="Name"
          {...register("Name", {
            required: {
              value: true,
              message: "! Name is required",
            },
          })}
          onChange={() => setSuccessful(false)}
        />

        <p>{errors.Name?.message}</p>

        <label htmlFor="email">
          Email &nbsp; <span style={{ color: "red" }}> *</span>
        </label>

        <input
          type="email"
          id="email"
          placeholder="Email"
          {...register("Email", {
            required: {
              value: true,
              message: "! Email is required",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid Email",
            },
          })}
          onChange={() => setSuccessful(false)}
        />

        <p>{errors.Email?.message}</p>

        <label htmlFor="Message">
          Message &nbsp; <span style={{ color: "red" }}> *</span>
        </label>

        <textarea
          id="Message"
          placeholder="Write your messsage here ..."
          {...register("Message", {
            required: {
              value: true,
              message: "! Message is required",
            },
          })}
          onChange={() => setSuccessful(false)}
        />

        <p>{errors.Message?.message}</p>

        <button className="button">Submit</button>
        {successful ? (
          <p
            style={{
              color: "blue",
              textAlign: "center",
              marginTop: 5,
              position: "relative",
              left: -40,
            }}
          >
            Successful submission ✅
          </p>
        ) : null}
      </form>
    </div>
  );
};

export default ContactForm;

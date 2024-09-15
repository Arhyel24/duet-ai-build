import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface Values {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

const SignIn: React.FC = () => (
  <div>
    <h1>Any place in your app!</h1>
    <Formik<Values>
      initialValues={{ email: "", password: "" }}
      validate={(values: Values) => {
        const errors: Errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(
        values: Values,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
      ) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }: { isSubmitting: boolean }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default SignIn;

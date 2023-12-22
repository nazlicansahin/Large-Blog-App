import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const CommentForm = () => {
  const initialValues = {
    email: '',
    comment: ''
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.comment) {
      errors.comment = 'Required';
    }
    return errors;
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log('Submitted:', values);
    resetForm();
  };

  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Leave a Comment</h2>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
    

            <div>
              <label htmlFor="email" className="block font-medium mb-1">Email:</label>
              <Field type="email" id="email" name="email" className="border rounded-md p-2 w-full" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="comment" className="block font-medium mb-1">Comment:</label>
              <Field as="textarea" id="comment" name="comment" className="border rounded-md p-2 w-full h-32" />
              <ErrorMessage name="comment" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={handleLike}
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition duration-300 hover:bg-gray-300 mr-4"
        >
          Like
        </button>
        <span className="text-gray-600">Likes: {likes}</span>
      </div>
    </div>
  );
};

export default CommentForm;

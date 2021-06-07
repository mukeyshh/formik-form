import React from 'react'
import { useFormik } from 'formik'


const initialValues = {
  email: 'a@a.com',
  phn: '',
  password: ''
}

const onSubmit = values => {
  console.log('form data', values)
}

const validate = values => {
  //value.email value.phn value.password
  //errors.email.....
  //error.email="this field is required"
  let errors = {}

  if (!values.email) {
    errors.email = 'Required'
  }

  if (!values.phn) {
    errors.phn = 'Required'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email format'
  }
  return errors;
}



const Register = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })
  return (
    <div>
      <form className="col-sm-6 offset-sm-3 d-flex flex-column"
        onSubmit={formik.handleSubmit}
      >
        <div className="">
          <label className="fw-bolder d-flex" htmlFor='email'>Email</label>
          <input className="d-block px-2 py-1 fs-6 border border-secondary rounded"
            type='email'
            id='email'
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            //  {...formik.getFieldProps('name')}
          />
          {formik.touched.email && formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
        </div>

        <div className="">
          <label className="fw-bolder d-flex" htmlFor='phone-number'>Phone-number</label>
          <input className="d-block px-2 py-1 fs-6 border border-secondary rounded"
            type='number'
            id='phn'
            name='phn'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

            value={formik.values.phn
            }
          />
          {formik.touched.phn && formik.errors.phn ? <div className="text-danger">{formik.errors.phn}</div> : null}
        </div>

        <div className="">
          <label className="fw-bolder d-flex" htmlFor='password'>Password</label>
          <input className="d-block px-2 py-1 fs-6 border border-secondary rounded"
            type='password'
            id='password'
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
        </div>

        <button className="mt-5 col-sm-3 offset-sm-1 btn btn-secondary btn-sm-sm" type="submit">Register</button>
      </form>

    </div>
  )
}

export default Register

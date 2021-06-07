import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import Error from './Error'

const initialValues={
  email: 'a@a.com',
  phn: '',
  comments:'',
  password: '',
  address: '',
  social: {
    facebook: '',
    twitter:''
  },
  numbers:['']
  
}

const savedValues={
  email: 'a@a.com',
  phn: '',
  comments:'',
  password: '',
  address: '',
  social: {
    facebook: '',
    twitter:''
  },
  numbers:['']
  
}

const onSubmit = (values, onSubmitProps) => {
  console.log('form data', values)
  console.log('onSubmitProps', onSubmitProps)
  onSubmitProps.setSubmitting(false)

  onSubmitProps.resetForm()
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Required'),
  phn: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
   address: Yup.string().required('Required')
})


//fieldlevel validation
const validateComments = value => {
  let error
  if (!value) {
    error="Required"
  }
  return error
}


const Register = () => {
  const [formValues, setFormValues] = useState(null)
  return (
    <Formik
      initialValues={formValues||initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      // validateOnChange={false}
      // validateOnBlur={false}
      // validateOnMount
      enableReinitialize   
    >

      {formik => {
        console.log('Fromik props', formik)
        return (
          <Form className="col-sm-6 offset-sm-3 d-flex flex-column"
          >
           <div className="">
          <label className="fw-bolder d-flex" htmlFor='email'>Email</label>
          <Field className="d-block px-2 py-1 fs-6 border border-secondary rounded"
            type='email'
            id='email'
            name='email'
            
          />
          <ErrorMessage name="email" >
            {
              (errorMsg)=><div className="error">{errorMsg}</div>
            }
        </ErrorMessage>
            </div>

              <div className="">
          <label className="fw-bolder d-flex" htmlFor='phone-number'>Phone-number</label>
          <Field className="d-block px-2 py-1 fs-6 border border-secondary rounded"
            type='number'
            id='phn'
            name='phn'
           
          />
          <ErrorMessage name="phn" />
            </div>
            
            <div className="">
          <label className="fw-bolder d-flex" htmlFor='phone-number'>Comments</label>
          <Field as ="textarea" className="d-block px-2 py-1 fs-6 border border-secondary rounded"
            id='comments'
            name='comments'
            validate={validateComments}
          />
          <ErrorMessage name="comments" component={Error} />
        </div>

            <div className="">
          <label className="fw-bolder d-flex" htmlFor='password'>Password</label>
          <Field className="d-block px-2 py-1 fs-6 border border-secondary rounded"
            type='password'
            id='password'
            name='password'
           
          />
          <ErrorMessage name="password"  component={Error}/>
        </div>

          <div className="">
          <label className="fw-bolder d-flex" htmlFor='address'>Address</label>
          <Field className="d-block px-2 py-1 fs-6 border border-secondary rounded" name="address">
            {
              (props) => {
                const {field,form,meta}=props
                console.log("render props",props)
                return <div>
                  <input type="text" id="address" {...field} />
                  {meta.touched && meta.error?<div>{meta.error}</div>:null}
                  </div>
              }
            }
          </Field>
            </div>
            
             <div>
          <label className="fw-bolder d-flex" htmlFor='facebook'>Facebook</label>
          <Field className="d-block px-2 py-1 fs-6 border border-secondary rounded" type="text" id="facebook" name="social.facebook" />
        </div>


        <div>
          <label className="fw-bolder d-flex" htmlFor='twitter'>Twitter</label>
          <Field className="d-block px-2 py-1 fs-6 border border-secondary rounded" type="text" id="twitter" name="social.twitter" />
        </div>
        
         
        <div>
          <label className="fw-bolder d-flex" htmlFor="numbers">Numbers</label>
          <FieldArray className="d-block px-2 py-1 fs-6 border border-secondary rounded" name="numbers">
            {
              (fieldArrayProps) => {
                console.log("fieldArrayProps",fieldArrayProps)
                const { push, remove, form } = fieldArrayProps
                const { values } = form
                const{numbers}=values
                return (<div>{
                  numbers.map((number, index) => (
                    <div key={index}>
                      <Field name={`numbers[${index}]`} />
                      {index>0 &&(
                      <button type="button" onClick={()=>remove(index)}>-</button>
                        )}
                      <button type="button" onClick={()=>push('')}>+</button>
                         </div>
                  ))    
                }</div>
                )
              }
            }
          </FieldArray>
            </div>
            <div className="d-flex mt-3 ">
            {/* <button className=" col-sm-2 offset-sm-1 btn btn-secondary " type="button" onClick={()=>formik.validateField('comments')}>Validate comments</button>

              <button className="col-sm-2 offset-sm-1 btn btn-secondary " type="button" onClick={() => formik.validateForm()}>Validate all</button>
              
              <button className=" col-sm-2 offset-sm-1 btn btn-secondary " type="button" onClick={() => formik.setTouched({
                email: true,
                password: true,
                phn: true,
                address:true                
              })}>Visit fields</button>

            <button className="col-sm-2 offset-sm-1 btn btn-secondary " type="button"onClick={()=>formik.setFieldTouched('comments')}>visit comments</button>
             */}
              
              <button className="col-sm-2 offset-sm-1 btn btn-secondary " type="button" onClick={() => setFormValues(savedValues)}>load saved data</button>
              
              <button type="reset">reset</button>

              <button className="col-sm-2 offset-sm-1 btn btn-secondary " type="submit" disabled={formik.isSubmitting}>Register</button>
              </div>
      </Form>
        )
      }}
    
    </Formik>
  )
}

export default Register

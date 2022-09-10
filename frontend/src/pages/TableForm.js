import React from "react";
import PropTypes from "prop-types";

import { Formik, Form, useField } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import _ from "lodash";
import { createYupSchema } from "../helpers/yupSchemaCreator";
import TextField from "@mui/material/TextField";
import connectRest from "../redux/restComponentConnect";

const SumTextField = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);

  console.log("field", field);
  console.log("meta", meta);
  console.log("props", props);
  return (
    <div style={{ paddingBottom: 8 }}>
      <TextField
        fullWidth
        {...field}
        {...props}
        id={props.field}
        label={label}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        className="FormTextField"
      />
    </div>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TableForm = (props) => {
  const { open, handleOpen, handleClose, fieldConfig, row } = props;

  const initialValues = {};
  fieldConfig.forEach((item) => {
    initialValues[item.field] = item.value || "";
  });

  const yepSchema = fieldConfig.reduce(createYupSchema, {});
  const validateSchema = yup.object().shape(yepSchema);

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Formik
              initialValues={{ ...initialValues, ...row }}
              validationSchema={validateSchema}
              onSubmit={(values, { setSubmitting }) => {
                // setTimeout(() => {
                //   alert(JSON.stringify(values, null, 2));
                //   setSubmitting(false);
                // }, 400);
                if(Object.keys(row).length == 0){ // Add new operation
                  props[`${props.tableName}Actions`].add({...values}).then(res => console.log(res))
                }else{ //Update operation
                  delete values._links
                  props[`${props.tableName}Actions`].update({...values}, `${values.id}`).then(res => console.log(res))
                }
              }}
            >
              <Form>
                {_.map(fieldConfig, (d) => {
                  if (d.type == "string" || d.type == "number") {
                    return (
                      <SumTextField
                        label={d.label}
                        name={d.field}
                        type="text"
                        placeholder={d.placeholder}
                        key={d.field}
                      />
                    );
                  }
                })}
                <button
                  class="btn waves-effect waves-light"
                  type="submit"
                  style={{width: "100%"}}
                >
                  Save
                  <i class="material-icons right">save</i>
                </button>
              </Form>
            </Formik>
          </Box>
        </Modal>
      </div>
    </>
  );
};

TableForm.propTypes = {
  open: false,
  handleOpen: () => {},
  handleClose: () => {},
  fieldConfig: [],
};

const withRestConnect = (props) => (WrappedComponent) => {
  const RestComponent = connectRest(
    props.tableName,
    {},
    "id"
  )(WrappedComponent);
  return <RestComponent {...props} />;
};

const RestTableForm = (props) => withRestConnect({ ...props })(TableForm);

export default RestTableForm;

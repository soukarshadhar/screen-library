import React, { useState } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { object, string } from "yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { SIGN_IN_LABEL, SIGN_UP_LABEL } from "../../utils/constants";
import { toggleDialog, selectDialogIsOpen } from "../../store/dialogSlice";
import {
  selectDialogIsSignUpForm,
  toggleForm,
  resetForm,
} from "../../store/formSlice";
import FormInput from "../FormInput";
import FormButton from "../FormButton";
import "../../styles/user-form.scss";

const UserForm = () => {
  const dispatch = useDispatch();
  const [formError, setFormError] = useState("");
  const canShowDialog = useSelector(selectDialogIsOpen);
  const isSignUpForm = useSelector(selectDialogIsSignUpForm);

  const buildValidationSchema = () => {
    const schema: any = {
      email: string().email("Please enter a valid email").required("Required"),
      password: string()
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@$%&*]).{8,}$/g,
          "Must contain atleast 1 uppercase, 1 lowercase, 1 number, 1 special character from # @ $ % & *, min 8 character"
        )
        .required("Required"),
    };

    if (isSignUpForm) schema["userName"] = string().required();

    return object().shape(schema);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      userName: "",
    },
    onSubmit: () => {
      isSignUpForm ? createUser() : loginInUser();
    },
    validationSchema: buildValidationSchema(),
  });

  const handleOnToggleForm = () => {
    dispatch(toggleForm());
  };

  const createUser = async () => {
    try {
      const docRef = doc(db, "users", formik.values.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFormError("Email ID already exist");
        return;
      }

      const { user } = await createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      );
      await updateProfile(user, {
        displayName: formik.values.userName,
      });
      await setDoc(doc(db, "users", user.email), {
        uid: user.uid,
      });

      formik.resetForm();
      dispatch(resetForm());
      dispatch(toggleDialog());
    } catch (err) {
      console.log(err);
    }
  };

  const loginInUser = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      );

      formik.resetForm();
      dispatch(resetForm());
      dispatch(toggleDialog());
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnDialogClose = () => {
    formik.resetForm();
    dispatch(resetForm());
    dispatch(toggleDialog());
  };

  return canShowDialog ? (
    <div className="dialog-container">
      <dialog open={true}>
        <FontAwesomeIcon
          className="close-icon"
          icon={faXmark}
          onClick={handleOnDialogClose}
        />
        <h1>{isSignUpForm ? SIGN_UP_LABEL : SIGN_IN_LABEL}</h1>
        <form onSubmit={formik.handleSubmit}>
          {isSignUpForm && (
            <>
              <FormInput
                name="userName"
                placeholder="Name"
                className="mb-1"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.userName && formik.touched.userName && (
                <div className="mb-1">{formik.errors.userName}</div>
              )}
            </>
          )}
          <FormInput
            name="email"
            placeholder="Email"
            className="mb-1"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="mb-1">{formik.errors.email}</div>
          )}
          <FormInput
            name="password"
            placeholder="Password"
            className="mb-1"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="mb-1">{formik.errors.password}</div>
          )}
          <FormButton
            type="submit"
            label={isSignUpForm ? SIGN_UP_LABEL : SIGN_IN_LABEL}
          />
        </form>
        {!isSignUpForm && (
          <div
            className="form-secondary-action"
            onClick={handleOnToggleForm}
          >{`New User? ${SIGN_UP_LABEL}`}</div>
        )}
        {isSignUpForm && (
          <div className="form-secondary-action" onClick={handleOnToggleForm}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Sign In
          </div>
        )}
      </dialog>
    </div>
  ) : null;
};

export default UserForm;

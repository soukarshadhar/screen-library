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
import { setUser } from "../../store/userSlice";
import FormInput from "../FormInput";
import FormButton from "../FormButton";
import "../../styles/user-form.scss";

const UserForm = () => {
  const dispatch = useDispatch();
  const [formError, setFormError] = useState<string>("");
  const canShowDialog = useSelector(selectDialogIsOpen);
  const isSignUpForm = useSelector(selectDialogIsSignUpForm);

  const buildValidationSchema = () => {
    const schema: any = {
      email: string().email("Please enter a valid email").required("Required"),
      password: string()
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@$%&*]).{8,}$/g,
          "Must contain atleast 1 uppercase, 1 lowercase, 1 number, 1 special character from # @ $ % & *, min 8 characters"
        )
        .required("Required"),
    };

    if (isSignUpForm) schema["userName"] = string().required("Required");

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
    formik.resetForm();
    dispatch(toggleForm());
  };

  const createUser = async () => {
    try {
      const docRef = doc(db, "users", formik.values.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        formik.setFieldError("email", "User with this email already exist");
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

      const { displayName, email, uid } = user;

      formik.resetForm();
      dispatch(
        setUser({
          displayName,
          email,
          uid,
        })
      );
      dispatch(resetForm());
      dispatch(toggleDialog());
    } catch (err) {
      setFormError((err as any).message);
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
      setFormError((err as any).message);
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
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.userName && formik.touched.userName && (
                <div className="error-message">{formik.errors.userName}</div>
              )}
            </>
          )}
          <FormInput
            name="email"
            placeholder="Email"
            className={isSignUpForm ? "row-gap" : ""}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
          <FormInput
            name="password"
            placeholder="Password"
            className="row-gap"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
          <FormButton
            type="submit"
            className="row-gap"
            label={isSignUpForm ? SIGN_UP_LABEL : SIGN_IN_LABEL}
          />
          {formError && <div className="error-message">{formError}</div>}
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

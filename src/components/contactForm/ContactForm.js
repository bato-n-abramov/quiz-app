import { useState, useRef, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ReactComponent as Close } from "../../images/close.svg";
import contactDecor from "../../images/contactDecor.png";
import popupDecor from "../../images/popupDecor.png";
import emailjs from "@emailjs/browser";
import classNames from "classnames";

import { hover_buttons_audio, click_audio } from "../../utils/audios";

import "./styles.scss";

const ContactForm = ({
  visibleForm,
  setVisibleForm,
  visiblePopup,
  setVisiblePopup,
  onFormSubmit,
}) => {
  const initialValues = {
    name: "",
    email: "",
    work: "",
    privacyPolicy: false,
  };

  const [hideForm, setHideForm] = useState(false);

  const hoverAudioRef = useRef(null);
  const clickAudioRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const playHoverAudio = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      hoverAudioRef.current.currentTime = 0; 
      hoverAudioRef.current.play();
    }, 100); 
  };

  const playClickAudio = () => {
    clickAudioRef.current.play();
  };

  const stopHoverAudio = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverAudioRef.current.pause();
    hoverAudioRef.current.currentTime = 0;
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    privacyPolicy: Yup.boolean().oneOf(
      [true],
      "Privacy policy must be accepted"
    ),
  });

  const onSubmit = (values, { resetForm }) => {
    const templateParams = {
      to_email: values.email,
      from_name: values.name,
    };
    emailjs
      .send(
        "service_5tzsrbg",
        "template_93igw7d",
        templateParams,
        "q_wBsfwkp0-2Em0Ov"
      )
      .then(
        (result) => {
          setHideForm(true);
          setVisiblePopup(values.email);
          setTimeout(() => {
            onFormSubmit();
            setVisiblePopup("");
            setVisibleForm(false);
          }, 3500);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleCloseClick = () => {
    setVisibleForm(false);
  };

  return visibleForm ? (
    <div className="ContactForm">
      <div className="ContactForm__overlay"></div>
      {visiblePopup && (
        <div className="ContactForm__popup-wrapper">
          <div className="ContactForm__popup-inner">
            <div className="ContactForm__popup-img">
              <img src={popupDecor} alt="decoration" />
            </div>
            <div className="ContactForm__popup">
              <h2 className="ContactForm__popup-title">woohoo!</h2>
              <p className="ContactForm__popup-mail">sent to {visiblePopup}</p>
            </div>
            <div className="ContactForm__popup-img-mob">
              <img src={popupDecor} alt="decoration" />
            </div>
          </div>
        </div>
      )}
      {!hideForm && (
        <div className="ContactForm__form-wrapper">
          <div className="ContactForm__form-header">
            <div>attention!</div>
            <div className="ContactForm__form-close" onClick={handleCloseClick}>
              <Close />
            </div>
          </div>
          <div className="ContactForm__form-body">
            <h2 className="ContactForm__form-title">
              you’re <strong>3 inputs</strong> and <strong>20 tips</strong> away
              from skyrocketing your brand
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize={true}
            >
              {({ values }) => (
                <Form id="contact-form">
                  <div className="input-wrapper w-50">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="off"
                      className={classNames("input-field", {
                        filled: values.name !== "",
                      })}
                    />
                    <label className="label" htmlFor="name">
                      Name:
                    </label>
                    <ErrorMessage name="name" component="div" />
                  </div>

                  <div className="input-wrapper w-50">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="off"
                      className={classNames("input-field", {
                        filled: values.email !== "",
                      })}
                    />
                    <label className="label" htmlFor="email">
                      Email:
                    </label>
                    <ErrorMessage name="email" component="div" />
                  </div>

                  <div className="input-wrapper w-100">
                    <Field
                      type="text"
                      id="work"
                      name="work"
                      autoComplete="off"
                      className={classNames("input-field", {
                        filled: values.work !== "",
                      })}
                    />
                    <label className="label" htmlFor="work">
                      your work position:
                    </label>
                  </div>

                  <div className="checkbox-wrapper">
                    <label>
                      <Field type="checkbox" name="privacyPolicy" />
                      <span>
                        I agree with
                        <a href="/quiz-app">Terms of Use</a> and
                        <a href="/quiz-app">Privacy Policy.</a>
                      </span>
                    </label>
                    <ErrorMessage name="privacyPolicy" component="div" />
                  </div>

                  <button
                    type="submit"
                    className="ContactForm__form-submit btn-green"
                    onClick={playClickAudio}
                    onMouseEnter={playHoverAudio}
                    onMouseLeave={stopHoverAudio}
                  >
                    yass! <br /> drop it
                  </button>
                </Form>
              )}
            </Formik>
            <div className="ContactForm__img">
              <img src={contactDecor} alt="decoration" />
            </div>
          </div>
        </div>
      )}
      <audio ref={hoverAudioRef} src={hover_buttons_audio} />
      <audio ref={clickAudioRef} src={click_audio} />
    </div>
  ) : null;
};

export default ContactForm;

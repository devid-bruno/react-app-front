import * as Yup from "yup"

import { forms } from '../../consts/errors';

export const formValidation = Yup.object().shape({
    email: Yup
      .string()
      .required(forms.REQUIRED)
      .email(forms.INVALID_EMAIL),
    password: Yup
      .string()
      .required(forms.REQUIRED)
      .min(4, forms.INVALID_PASSWORD),
  })
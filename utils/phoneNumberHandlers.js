const COUNTRY_CODE = "234"

export const verifyPhoneNumber = (phone) => {
  return /^([0]{1}|\+?234)([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g.test(phone)
};

export const sanitizePhoneNumber = (phone) => {
  if (!verifyPhoneNumber(phone)) {
    return { status: false, message: "Phone number is invalid", phone: "" }
  }
  if (phone.startsWith("0") || phone.startsWith("+")) {
    phone = phone.substring(1);
  }
  if (phone.startsWith(COUNTRY_CODE)) {
    return {
      status: true,
      message: "Phone number is valid",
      phone: "+" + phone,
    };
  }
  return {
    status: true,
    message: "Phone number is valid",
    phone: `+${COUNTRY_CODE}${phone}`,
  }
}
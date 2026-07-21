function getRollNumber(idTokenClaims) {
  if (!idTokenClaims) return "";
  let emailId = idTokenClaims.email || idTokenClaims.preferred_username;
  if (!emailId) return "";
  const mailParts = emailId.split("@")[0].split("_");
  const rollNumber =
    mailParts[0].startsWith("2")
      ? mailParts[0]
      : mailParts[1];
  if (rollNumber == null) {
    return "Error encountered, please report this to any of the Technical Secretaries along with your Outlook ID and roll number";
  } else {
    return rollNumber;
  }
}

function getName(idTokenClaims) {
  return idTokenClaims?.name;
}

export { getRollNumber, getName };
/* vi: set et sw=2: */

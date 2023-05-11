export const EmailIcon = () => (
  <svg
    version="1.1"
    id="Icons"
    xmlns="http://www.w3.org/2000/svg"
    width="24px"
    height="24px"
    viewBox="0 0 32 32"
  >
    <path
      className="st0"
      d="M25,27H7c-2.2,0-4-1.8-4-4V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4v14C29,25.2,27.2,27,25,27z"
      stroke="#F96D8C"
      fill="none"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
    <polyline
      className="st0"
      points="3,10 16,18 29,10 "
      fill="none"
      stroke="#F96D8C"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
  </svg>
);

export const PasswordIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    transform={`rotate( ${props.rotate ? "0" : "45"} )`}
    // @ts-ignore
    transition="all .4s ease-in-out"
  >
    <path
      fill="#F96D8C"
      //transform={`rotate(${rotate ? "0deg" : "45deg"})`}
      d="M20,15 L20,13 L21,13 C21.5522847,13 22,12.5522847 22,12 C22,11.4477153 21.5522847,11 21,11 L11.9514124,11 L11.7157487,10.3332461 C11.0154711,8.35197855 9.13614903,7 7,7 C4.23857625,7 2,9.23857625 2,12 C2,14.7614237 4.23857625,17 7,17 C9.13614903,17 11.0154711,15.6480214 11.7157487,13.6667539 L11.9514124,13 L18,13 L18,15 L20,15 Z M22,17 L16,17 L16,15 L13.326396,15 C12.1852426,17.4064194 9.74415335,19 7,19 C3.13400675,19 0,15.8659932 0,12 C0,8.13400675 3.13400675,5 7,5 C9.74415335,5 12.1852426,6.59358057 13.326396,9 L21,9 C22.6568542,9 24,10.3431458 24,12 C24,13.3062188 23.1651924,14.4174579 22,14.8292943 L22,17 Z M7,14 C8.1045695,14 9,13.1045695 9,12 C9,10.8954305 8.1045695,10 7,10 C5.8954305,10 5,10.8954305 5,12 C5,13.1045695 5.8954305,14 7,14 Z"
    />
  </svg>
);

export const PersonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <rect
      width="24"
      height="24"
      fill="rgba(0,0,0,0)"
    />
    <path
      d="M12,11A4,4,0,1,0,8,7,4,4,0,0,0,12,11Z"
      fill="#F96D8C"
    />
    <path
      d="M18,21a1,1,0,0,0,1-1A7,7,0,0,0,5,20a1,1,0,0,0,1,1Z"
      fill="#F96D8C"
    />
  </svg>
);

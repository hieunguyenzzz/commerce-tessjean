const Bag = ({ ...props }) => {
  return (
    <svg
      height="1em"
      fill="none"
      width="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.5 9C14.0899 9 17 7.65685 17 6C17 4.34315 14.0899 3 10.5 3C6.91015 3 4 4.34315 4 6C4 7.65685 6.91015 9 10.5 9Z"
        stroke="black"
        stroke-miterlimit="10"
      />
      <path
        d="M22 9.33145V16H10.2812C6.81413 16 4 14.5093 4 12.6685V6C4 7.84077 6.81413 9.33145 10.2812 9.33145H22Z"
        stroke="black"
        stroke-miterlimit="10"
      />
      <path
        d="M17 6V9H10C13.8638 9 17 7.65763 17 6Z"
        stroke="black"
        stroke-miterlimit="10"
      />
      <path d="M8 16V11" stroke="black" stroke-miterlimit="10" />
      <path d="M11 16V13" stroke="black" stroke-miterlimit="10" />
      <path d="M14 16V11" stroke="black" stroke-miterlimit="10" />
      <path d="M17 16V13" stroke="black" stroke-miterlimit="10" />
      <path d="M20 16V11" stroke="black" stroke-miterlimit="10" />
    </svg>
  )
}

export default Bag

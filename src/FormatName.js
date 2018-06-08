function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function FormatName(props) {
  return `${capitalize(props.first)} ${capitalize(props.last)}`;
}

export default FormatName;

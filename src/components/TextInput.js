export default function TextInput(props) {
  let { className } = props;
  return <input {...props} className={className} />;
}

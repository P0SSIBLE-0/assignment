type ButtonProps = {
  text: string
  isDisabled: boolean
  type: "submit" | "reset" | "button" | undefined
  onClick?: () => void
}
export default function Button({text, isDisabled, onClick, type}: ButtonProps) {
  return (
      <button type={type} className="btn" onClick={onClick} disabled={isDisabled} >{text}</button>
  )
}

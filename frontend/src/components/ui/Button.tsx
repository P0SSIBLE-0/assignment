type ButtonProps = {
  text: string
  isDisabled: boolean
  type: "submit" | "reset" | "button" | undefined
  onClick?: () => void
}
export default function Button({text, isDisabled, onClick, type, ...rest}: ButtonProps) {
  return (
      <button 
      type={type} 
      className="btn" 
      {...rest}
      disabled={isDisabled} >{text}</button>
  )
}

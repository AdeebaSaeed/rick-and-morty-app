import { ButtonProps } from './Button.types'

import './Button.css'

function Button({ className, children, ...rest }: ButtonProps) {
	return (
		<button {...rest} className={`button ${className}`}>
			{children}
		</button>
	)
}

export default Button

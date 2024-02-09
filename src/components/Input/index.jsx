import { Input } from '@nextui-org/react';   // Importamos el componente

export const TextInput = ({ type, name, label, register, errors }) => {
    let validationRules = {};
    if (type === 'number') {
        validationRules = {
            required: true,
            min: 0,  // Mínimo valor permitido
            max: 2024  // Máximo valor permitido
        };
    } else {
        validationRules = { required: true };
    }

    return (
            <Input
                type= { type }
                label= { label }
                { ...register(name, validationRules) }
                color={ errors[name] ? 'danger' : 'primary' }
                errorMessage={ errors[name] && (
                    errors[name].type === "required" ? (<span>This field is required</span>) 
                    : errors[name].type === "pattern" ? (<span>Invalid Email</span>) 
                    : errors[name].type === "min" ? (<span>Year must be greater than or equal to 0</span>)
                    : errors[name].type === "max" ? (<span>Year must be less than or equal to 2024</span>)
                    : null
                )}
                
            />
    );
};